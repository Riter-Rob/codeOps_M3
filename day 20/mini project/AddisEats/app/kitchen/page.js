import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { orders } from "../data/orders";
import Link from "next/link";

export const metadata = {
  title: "Kitchen Dashboard",
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
      <div style={{ maxWidth: "540px", margin: "2rem auto" }}>
        <div className="card" style={{ padding: "2.5rem", borderLeft: "none" }}>
          <span className="badge badge-danger" style={{ marginBottom: "0.75rem" }}>
            403 Forbidden
          </span>
          <h1 style={{ fontSize: "1.75rem", margin: "0.5rem 0" }}>Staff Access Required</h1>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
            The kitchen fulfillment console is restricted to verified kitchen staff members. Your current session is authenticated as <strong>{session.role}</strong>.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <Link href="/" className="btn btn-primary">
              &larr; Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span style={{ color: "var(--color-text-muted)" }}>Kitchen Console</span>
      </nav>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>Kitchen Fulfillment Queue</h1>
          <p style={{ color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
            Active order tickets and live cooking queue for Addis Eats staff.
          </p>
        </div>
        <div>
          <span className="badge badge-warning" style={{ fontSize: "0.8125rem", padding: "0.35rem 0.75rem" }}>
            Staff: {session.name}
          </span>
        </div>
      </div>

      <h2>Active Cooking Tickets</h2>
      {orders.length === 0 ? (
        <div className="card" style={{ padding: "2.5rem", textAlign: "center" }}>
          <p style={{ margin: 0, color: "var(--color-text-muted)" }}>No pending tickets in the kitchen queue.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              className="card"
              style={{
                padding: "1.25rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                boxShadow: "var(--shadow-xs)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <strong style={{ fontSize: "1.0625rem", color: "var(--color-text)" }}>
                    Ticket #{order.id}
                  </strong>
                  <span style={{ marginLeft: "0.75rem", fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                    Customer: {order.name}
                  </span>
                </div>
                <span className={`badge ${order.status === "cancelled" ? "badge-danger" : "badge-success"}`}>
                  {order.status}
                </span>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.875rem", color: "var(--color-text-muted)", flexWrap: "wrap" }}>
                <span><strong>Phone:</strong> {order.phone}</span>
                <span><strong>Delivery Area:</strong> {order.area}</span>
              </div>

              {order.notes && (
                <div style={{ background: "var(--color-surface-subtle)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                  <strong>Notes:</strong> {order.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
