import Link from "next/link";

export default function OrdersEmptyState({ isForced = false }) {
  return (
    <section
      aria-labelledby="empty-orders-heading"
      style={{
        padding: "3.5rem 2rem",
        textAlign: "center",
        backgroundColor: "#ffffff",
        border: "2px dashed #e5dcc3",
        borderRadius: "26px",
        margin: "1.5rem 0",
        boxShadow: "0 2px 8px rgba(24, 84, 42, 0.04)"
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#fcf9f0",
          color: "#18542a",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontWeight: "700",
          marginBottom: "1rem"
        }}
      >
        0
      </div>

      <h2
        id="empty-orders-heading"
        style={{
          fontSize: "1.35rem",
          fontWeight: "800",
          color: "#18542a",
          marginBottom: "0.5rem"
        }}
      >
        No Orders Recorded Yet
      </h2>

      <p
        style={{
          maxWidth: "460px",
          margin: "0 auto 1.5rem auto",
          color: "#6b7280",
          lineHeight: "1.5"
        }}
      >
        Welcome to Addis Eats! You have not placed any orders yet. Once your first order is placed through checkout, your neighbourhood metrics, order frequency charts, and item receipts will appear here.
      </p>

      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link
          href="/menu"
          className="btn btn-primary"
          style={{
            borderRadius: "9999px",
            textDecoration: "none",
            fontWeight: "700",
            padding: "0.6rem 1.4rem"
          }}
        >
          Browse Menu
        </Link>

        {isForced && (
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
            Switch to Populated State
          </Link>
        )}
      </div>
    </section>
  );
}
