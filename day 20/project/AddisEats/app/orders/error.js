"use client";

import Link from "next/link";

export default function OrdersError({ error, reset }) {
  return (
    <section
      role="alert"
      aria-labelledby="orders-error-heading"
      style={{
        padding: "3rem 2rem",
        maxWidth: "600px",
        margin: "2rem auto",
        backgroundColor: "#ffffff",
        border: "1px solid #fecdd3",
        borderRadius: "26px",
        textAlign: "center",
        boxShadow: "0 4px 16px rgba(213, 37, 24, 0.08)"
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          backgroundColor: "#fee2e2",
          color: "#d52518",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.6rem",
          fontWeight: "800",
          marginBottom: "1rem"
        }}
      >
        !
      </div>

      <h2
        id="orders-error-heading"
        style={{
          fontSize: "1.35rem",
          fontWeight: "800",
          color: "#d52518",
          marginBottom: "0.5rem"
        }}
      >
        Failed to Load Dashboard Data
      </h2>

      <p
        style={{
          color: "#6b7280",
          fontSize: "0.9375rem",
          marginBottom: "1.5rem",
          lineHeight: "1.5"
        }}
      >
        {error?.message || "An unexpected error occurred while compiling neighbourhood and daily analytics."}
      </p>

      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => (typeof reset === "function" ? reset() : (window.location.href = "/orders?state=populated"))}
          className="btn btn-primary"
          style={{
            borderRadius: "9999px",
            padding: "0.6rem 1.4rem",
            fontWeight: "700"
          }}
        >
          Try Again
        </button>

        <Link
          href="/orders?state=populated"
          className="btn btn-secondary"
          style={{
            borderRadius: "9999px",
            textDecoration: "none",
            fontWeight: "600",
            padding: "0.6rem 1.4rem"
          }}
        >
          Return to Populated View
        </Link>
      </div>
    </section>
  );
}
