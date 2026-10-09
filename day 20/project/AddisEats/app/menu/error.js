"use client";

export default function Error({ error, reset }) {
  return (
    <div style={{ maxWidth: "480px", margin: "2rem auto", background: "#ffffff", border: "1px solid #e5dcc3", borderRadius: "6px", padding: "1.5rem" }}>
      <h2 style={{ color: "#d52518", marginTop: 0 }}>Something went wrong!</h2>
      <p style={{ color: "#4b5563", marginBottom: "1rem" }}>{error?.message || "Could not load menu items."}</p>

      <button type="button" onClick={() => reset()} className="btn btn-primary btn-sm">
        Try again
      </button>
    </div>
  );
}