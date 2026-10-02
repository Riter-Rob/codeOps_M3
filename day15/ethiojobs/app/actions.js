"use server";

import { revalidatePath } from "next/cache";
import { addApplication } from "../lib/applications";
import { addJob } from "../lib/jobs";

export async function applyJob(prevState, formData) {
  const data = {
    jobId: formData.get("jobId") || "",
    jobTitle: formData.get("jobTitle") || "",
    name: (formData.get("name") || "").trim(),
    email: (formData.get("email") || "").trim(),
    phone: (formData.get("phone") || "").trim(),
    notes: (formData.get("notes") || "").trim()
  };

  const fieldErrors = {};

  if (!data.name || data.name.length < 2) {
    fieldErrors.name = "Full name must be at least 2 characters.";
  }

  if (!data.email || !data.email.includes("@")) {
    fieldErrors.email = "Please provide a valid email address.";
  }

  if (!data.phone || (!data.phone.startsWith("09") && !data.phone.startsWith("07") && !data.phone.startsWith("+251"))) {
    fieldErrors.phone = "Phone number must be a valid Ethiopian number (e.g. 09XXXXXXXX).";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      fieldErrors,
      data
    };
  }

  const application = await addApplication(data);

  revalidatePath("/applications");
  revalidatePath(`/jobs/${data.jobId}`);

  return {
    success: true,
    application,
    fieldErrors: {}
  };
}

export async function postJob(prevState, formData) {
  const data = {
    title: (formData.get("title") || "").trim(),
    company: (formData.get("company") || "").trim(),
    location: (formData.get("location") || "Addis Ababa").trim(),
    type: (formData.get("type") || "Full-time").trim(),
    category: (formData.get("category") || "Engineering").trim(),
    salary: (formData.get("salary") || "").trim(),
    description: (formData.get("description") || "").trim(),
    requirements: (formData.get("requirements") || "")
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean)
  };

  const fieldErrors = {};

  if (!data.title) fieldErrors.title = "Job title is required.";
  if (!data.company) fieldErrors.company = "Company name is required.";
  if (!data.salary) fieldErrors.salary = "Salary range is required.";
  if (!data.description || data.description.length < 10) {
    fieldErrors.description = "Description must be at least 10 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      fieldErrors,
      data
    };
  }

  const job = await addJob(data);

  revalidatePath("/jobs");
  revalidatePath("/");

  return {
    success: true,
    job,
    fieldErrors: {}
  };
}
