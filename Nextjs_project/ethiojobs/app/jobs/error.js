"use client";

export default function JobsError({ error, reset }) {
  return (
    <div className="error-box">
      <h2>Something went wrong</h2>
      <p>{error?.message || "Failed to load jobs."}</p>
      <button onClick={() => reset()} className="btn btn-danger">
        Try again
      </button>
    </div>
  );
}
