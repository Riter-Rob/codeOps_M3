import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { orders } from "../data/orders";
import Link from "next/link";

export const metadata = {
  title: "Kitchen Queue",
  description: "Staff portal for monitoring incoming orders and kitchen ticket fulfillment.",
  alternates: {
    canonical: "/kitchen",
  },
};

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in?next=/kitchen");
  }

  if (session.role !== "staff") {
    return (
      <div style={{ maxWidth: "480px", margin: "2rem auto" }}>
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "1.75rem" }}>
          <span className="status-badge status-cancelled" style={{ marginBottom: "0.5rem" }}>
            Access Restricted
          </span>
          <h1 style={{ fontSize: "1.375rem", margin: "0.5rem 0" }}>Staff Access Only</h1>
          <p style={{ color: "#6b7280", marginBottom: "1.25rem", fontSize: "0.875rem" }}>
            The kitchen queue is restricted to restaurant staff. You are currently logged in as <strong>{session.role}</strong>.
          </p>
          <Link href="/" className="btn btn-secondary btn-sm">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span style={{ color: "#6b7280" }}>Kitchen</span>
      </nav>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>Kitchen Queue</h1>
          <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>
            Active tickets for food preparation.
          </p>
        </div>
        <div style={{ fontSize: "0.8125rem", color: "#6b7280" }}>
          Staff: <strong style={{ color: "#111827" }}>{session.name}</strong>
        </div>
      </div>

      <h2>Incoming Tickets</h2>
      {orders.length === 0 ? (
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "2rem", textAlign: "center" }}>
          <p style={{ margin: 0, color: "#6b7280" }}>No pending orders in the kitchen queue.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "680px" }}>
          {orders.map((order) => {
            const statusClass =
              order.status === "cancelled"
                ? "status-cancelled"
                : order.status === "delivered"
                ? "status-delivered"
                : "status-preparing";

            return (
              <div
                key={order.id}
                className="order-ticket"
              >
                <div className="order-ticket-header">
                  <div>
                    <strong style={{ fontSize: "0.9375rem", color: "#111827" }}>
                      Ticket #{order.id}
                    </strong>
                    <span style={{ marginLeft: "0.75rem", fontSize: "0.875rem", color: "#4b5563" }}>
                      {order.name}
                    </span>
                  </div>
                  <span className={`status-badge ${statusClass}`}>
                    {order.status}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8125rem", color: "#6b7280", flexWrap: "wrap", margin: "0.25rem 0" }}>
                  <span><strong>Phone:</strong> {order.phone}</span>
                  <span><strong>District:</strong> {order.area}</span>
                </div>

                {order.notes && (
                  <div style={{ background: "#f9fafb", padding: "0.4rem 0.6rem", borderRadius: "4px", fontSize: "0.8125rem", color: "#4b5563", marginTop: "0.35rem" }}>
                    <strong>Note:</strong> {order.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
