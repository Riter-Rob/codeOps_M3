"use client";

export default function Error({ error, reset }) {
  return (
    <div className="error-box">
      <h2>Something went wrong.</h2>
      <p style={{ margin: "0.5rem 0" }}>We could not load the menu.</p>
      <button onClick={() => reset()} className="btn">
        Try Again
      </button>
    </div>
  );
}
