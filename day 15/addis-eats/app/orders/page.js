import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { orders } from "../data/orders";
import OrderStatus from "./OrderStatus";
import Link from "next/link";

export const metadata = {
  title: "Order History",
  description: "View your past Addis Eats orders, item receipts, and fulfillment status.",
  alternates: {
    canonical: "/orders",
  },
};

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in?next=/orders");
  }

  const userOrders = orders.filter((o) => o.sessionId === session.id || o.userId === session.id);
  const initialOrder = userOrders[0];

  return (
    <div>
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span style={{ color: "var(--color-text-muted)" }}>My Orders</span>
      </nav>

      <h1>Order History</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.75rem" }}>
        Authenticated as <strong>{session.name}</strong> · Account ID: <code style={{ color: "var(--color-text-faint)" }}>{session.id}</code>
      </p>

      {initialOrder && (
        <div style={{ marginBottom: "2.5rem" }}>
          <OrderStatus id={initialOrder.id} fallbackData={initialOrder} />
        </div>
      )}

      <h2>Past Account Orders</h2>
      {userOrders.length === 0 ? (
        <div className="card" style={{ padding: "2.5rem", textAlign: "center" }}>
          <p style={{ margin: 0, color: "var(--color-text-muted)" }}>
            No orders found under this verified account.
          </p>
          <div style={{ marginTop: "1.25rem" }}>
            <Link href="/menu" className="btn btn-primary">
              Browse Menu & Place an Order
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {userOrders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="card"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 1.25rem",
                flexWrap: "wrap",
                gap: "0.75rem",
                boxShadow: "var(--shadow-xs)"
              }}
            >
              <div>
                <strong style={{ color: "var(--color-text)", fontSize: "1rem" }}>{order.name}</strong>
                <span style={{ marginLeft: "0.5rem", color: "var(--color-text-faint)", fontSize: "0.8125rem" }}>
                  #{order.id} · {order.area} ({order.phone})
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span className={`badge ${order.status === "cancelled" ? "badge-danger" : "badge-success"}`}>
                  {order.status}
                </span>
                <span style={{ color: "var(--color-primary)", fontWeight: "600", fontSize: "0.875rem" }}>
                  Details &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
