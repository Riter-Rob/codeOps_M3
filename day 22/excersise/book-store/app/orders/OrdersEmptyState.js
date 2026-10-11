import Link from "next/link";

export default function OrdersEmptyState({ isForced = false }) {
  return (
    <section
      aria-labelledby="empty-orders-heading"
      style={{
        padding: "3.5rem 2rem",
        textAlign: "center",
        backgroundColor: "#ffffff",
        border: "1px dashed #cbd5e1",
        borderRadius: "8px",
        margin: "1.5rem 0"
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#f1f5f9",
          color: "#64748b",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          marginBottom: "1rem"
        }}
      >
        0
      </div>

      <h2
        id="empty-orders-heading"
        style={{
          fontSize: "1.375rem",
          fontWeight: "600",
          color: "#0f172a",
          marginBottom: "0.5rem"
        }}
      >
        No Orders Recorded Yet
      </h2>

      <p
        style={{
          maxWidth: "460px",
          margin: "0 auto 1.5rem auto",
          color: "#475569",
          lineHeight: "1.5"
        }}
      >
        There are currently no active or historical orders for this profile.
        Once an order is confirmed, revenue trends and fulfillment tables will be aggregated here.
      </p>

      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link
          href="/menu"
          style={{
            display: "inline-block",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "0.6rem 1.25rem",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "0.9375rem"
          }}
        >
          Browse Menu
        </Link>

        {isForced && (
          <Link
            href="/orders?state=populated"
            style={{
              display: "inline-block",
              backgroundColor: "#f8fafc",
              color: "#334155",
              border: "1px solid #cbd5e1",
              padding: "0.6rem 1.25rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "0.9375rem"
            }}
          >
            Switch to Populated State
          </Link>
        )}
      </div>
    </section>
  );
}
