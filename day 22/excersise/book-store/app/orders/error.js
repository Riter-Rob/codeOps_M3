"use client";

import Link from "next/link";

export default function OrdersError({ error, reset }) {
  return (
    <section
      role="alert"
      aria-labelledby="orders-error-title"
      style={{
        padding: "2.5rem 2rem",
        maxWidth: "600px",
        margin: "2rem auto",
        backgroundColor: "#fff1f2",
        border: "1px solid #fecdd3",
        borderRadius: "8px",
        textAlign: "center"
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: "#ffe4e6",
          color: "#e11d48",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontWeight: "700",
          marginBottom: "1rem"
        }}
      >
        !
      </div>

      <h2
        id="orders-error-title"
        style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "#9f1239",
          marginBottom: "0.5rem"
        }}
      >
        Failed to Load Order Reports
      </h2>

      <p
        style={{
          color: "#881337",
          fontSize: "0.9375rem",
          marginBottom: "1.5rem",
          lineHeight: "1.5"
        }}
      >
        {error?.message || "An unexpected error occurred while querying order analytics and fulfillment records."}
      </p>

      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => (typeof reset === "function" ? reset() : (window.location.href = "/orders?state=populated"))}
          style={{
            backgroundColor: "#e11d48",
            color: "#ffffff",
            padding: "0.6rem 1.25rem",
            borderRadius: "6px",
            border: "none",
            fontWeight: "500",
            cursor: "pointer",
            fontSize: "0.875rem"
          }}
        >
          Try Again
        </button>

        <Link
          href="/orders?state=populated"
          style={{
            display: "inline-block",
            backgroundColor: "#ffffff",
            color: "#9f1239",
            border: "1px solid #fecdd3",
            padding: "0.6rem 1.25rem",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "0.875rem"
          }}
        >
          Return to Populated View
        </Link>
      </div>
    </section>
  );
}
