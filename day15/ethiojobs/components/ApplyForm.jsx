"use client";

import { useActionState } from "react";
import { applyJob } from "../app/actions";

export default function ApplyForm({ jobId, jobTitle }) {
  const [state, formAction, isPending] = useActionState(applyJob, {
    success: false,
    fieldErrors: {}
  });

  if (state?.success) {
    return (
      <div className="success-box">
        <h3>Application submitted</h3>
        <p>
          {state.application.name}, your application for {jobTitle} has been received.
        </p>
      </div>
    );
  }

  return (
    <div className="apply-form-wrap">
      <h3>Apply for this position</h3>

      <form action={formAction}>
        <input type="hidden" name="jobId" value={jobId} />
        <input type="hidden" name="jobTitle" value={jobTitle} />

        <div className="form-group">
          <label htmlFor="apply-name" className="form-label">Full name</label>
          <input
            id="apply-name"
            name="name"
            className="form-input"
            placeholder="Abebe Bikila"
            defaultValue={state?.data?.name || ""}
          />
          {state?.fieldErrors?.name && (
            <span className="form-error">{state.fieldErrors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="apply-email" className="form-label">Email address</label>
          <input
            id="apply-email"
            name="email"
            type="email"
            className="form-input"
            placeholder="abebe@example.com"
            defaultValue={state?.data?.email || ""}
          />
          {state?.fieldErrors?.email && (
            <span className="form-error">{state.fieldErrors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="apply-phone" className="form-label">Phone number</label>
          <input
            id="apply-phone"
            name="phone"
            className="form-input"
            placeholder="09XXXXXXXX"
            defaultValue={state?.data?.phone || ""}
          />
          {state?.fieldErrors?.phone && (
            <span className="form-error">{state.fieldErrors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="apply-notes" className="form-label">
            Brief note (optional)
          </label>
          <textarea
            id="apply-notes"
            name="notes"
            rows={3}
            className="form-textarea"
            placeholder="Why are you a good fit for this role?"
            defaultValue={state?.data?.notes || ""}
          />
        </div>

        <button type="submit" disabled={isPending} className="btn btn-primary">
          {isPending ? "Submitting..." : "Submit application"}
        </button>
      </form>
    </div>
  );
}
