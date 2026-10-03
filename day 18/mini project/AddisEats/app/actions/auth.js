"use server";

import { redirect } from "next/navigation";
import { setSessionCookie, clearSessionCookie } from "../../lib/auth";

export async function signIn(prevState, formData) {
  const username = (formData.get("username") || "").trim();
  const role = formData.get("role") || "customer";
  const rawNext = formData.get("next");

  if (!username) {
    return { error: "Username is required" };
  }

  let id = "usr_" + username.toLowerCase().replace(/\s+/g, "_");
  if (role === "staff") {
    id = "staff_" + username.toLowerCase().replace(/\s+/g, "_");
  }

  await setSessionCookie({
    id,
    name: username,
    role
  });

  let destination = "/";
  if (typeof rawNext === "string" && rawNext.startsWith("/") && !rawNext.startsWith("//")) {
    destination = rawNext;
  }

  redirect(destination);
}

export async function signOut() {
  await clearSessionCookie();
  redirect("/sign-in");
}
