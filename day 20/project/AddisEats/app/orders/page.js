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
        <span style={{ color: "#6b7280" }}>Orders</span>
      </nav>

      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0 }}>Your Orders</h1>
        <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>
          Logged in as <strong>{session.name}</strong>
        </p>
      </div>

      {initialOrder && (
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Active Order</h2>
          <OrderStatus id={initialOrder.id} fallbackData={initialOrder} />
        </div>
      )}

      <h2>Past Orders</h2>
      {userOrders.length === 0 ? (
        <div style={{ background: "#ffffff", border: "1px solid #e5dcc3", borderRadius: "6px", padding: "2rem", textAlign: "center" }}>
          <p style={{ margin: "0 0 1rem", color: "#6b7280" }}>
            No orders placed yet.
          </p>
          <Link href="/menu" className="btn btn-primary btn-sm">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "600px" }}>
          {userOrders.map((order) => {
            const statusClass =
              order.status === "cancelled"
                ? "status-cancelled"
                : order.status === "delivered"
                ? "status-delivered"
                : "status-preparing";

            return (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  background: "#ffffff",
                  border: "1px solid #e5dcc3",
                  borderRadius: "6px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div>
                  <strong style={{ color: "#18542a", fontSize: "0.9375rem" }}>
                    Ticket #{order.id}
                  </strong>
                  <span style={{ marginLeft: "0.75rem", color: "#6b7280", fontSize: "0.8125rem" }}>
                    {order.area} · {order.name}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className={`status-badge ${statusClass}`}>
                    {order.status}
                  </span>
                  <span style={{ color: "#d52518", fontSize: "0.8125rem", fontWeight: 500 }}>
                    Details &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
