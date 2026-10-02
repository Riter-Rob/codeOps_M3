"use client";

import { useActionState } from "react";
import Link from "next/link";
import { postJob } from "../actions";

export default function PostJobPage() {
  const [state, formAction, isPending] = useActionState(postJob, {
    success: false,
    fieldErrors: {}
  });

  if (state?.success) {
    return (
      <div style={{ paddingTop: "2rem" }}>
        <div className="success-box" style={{ maxWidth: "540px" }}>
          <h3>Vacancy published</h3>
          <p>
            {state.job.title} at {state.job.company} is now live on the board.
          </p>
        </div>
        <div className="hero-actions" style={{ marginTop: "1.25rem" }}>
          <Link href={`/jobs/${state.job.id}`} className="btn btn-primary">
            View listing
          </Link>
          <Link href="/jobs" className="btn btn-ghost">
            All jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="post-job-shell">
      <div>
        <h1 style={{ marginBottom: "1.5rem" }}>Post a vacancy</h1>

        <form action={formAction}>
          <div className="form-group">
            <label htmlFor="pj-title" className="form-label">Job title *</label>
            <input
              id="pj-title"
              name="title"
              className="form-input"
              placeholder="Senior Frontend Developer"
              defaultValue={state?.data?.title || ""}
            />
            {state?.fieldErrors?.title && (
              <span className="form-error">{state.fieldErrors.title}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pj-company" className="form-label">Company *</label>
              <input
                id="pj-company"
                name="company"
                className="form-input"
                placeholder="Your company name"
                defaultValue={state?.data?.company || ""}
              />
              {state?.fieldErrors?.company && (
                <span className="form-error">{state.fieldErrors.company}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="pj-location" className="form-label">Location</label>
              <select
                id="pj-location"
                name="location"
                className="form-select"
                defaultValue={state?.data?.location || "Addis Ababa"}
              >
                <option>Addis Ababa</option>
                <option>Remote</option>
                <option>Hawassa</option>
                <option>Dire Dawa</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pj-category" className="form-label">Category</label>
              <select
                id="pj-category"
                name="category"
                className="form-select"
                defaultValue={state?.data?.category || "Engineering"}
              >
                <option>Engineering</option>
                <option>Design</option>
                <option>Data</option>
                <option>Marketing</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pj-type" className="form-label">Employment type</label>
              <select
                id="pj-type"
                name="type"
                className="form-select"
                defaultValue={state?.data?.type || "Full-time"}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pj-salary" className="form-label">Salary range *</label>
            <input
              id="pj-salary"
              name="salary"
              className="form-input"
              placeholder="30,000 – 45,000 ETB"
              defaultValue={state?.data?.salary || ""}
            />
            {state?.fieldErrors?.salary && (
              <span className="form-error">{state.fieldErrors.salary}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="pj-description" className="form-label">Description *</label>
            <textarea
              id="pj-description"
              name="description"
              rows={5}
              className="form-textarea"
              placeholder="Day-to-day responsibilities, team context, and goals..."
              defaultValue={state?.data?.description || ""}
            />
            {state?.fieldErrors?.description && (
              <span className="form-error">{state.fieldErrors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="pj-requirements" className="form-label">
              Requirements (comma-separated)
            </label>
            <input
              id="pj-requirements"
              name="requirements"
              className="form-input"
              placeholder="React, Next.js, Node.js, Git"
            />
          </div>

          <button type="submit" disabled={isPending} className="btn btn-primary">
            {isPending ? "Publishing..." : "Publish vacancy"}
          </button>
        </form>
      </div>

      <aside className="post-job-aside">
        <h3>Tips</h3>
        <p>Clear, specific job titles attract more qualified candidates than generic ones.</p>
        <p style={{ marginTop: "0.75rem" }}>Include a salary range — listings without one receive fewer applications.</p>
        <p style={{ marginTop: "0.75rem" }}>Describe the team and working style in addition to requirements.</p>
      </aside>
    </div>
  );
}
