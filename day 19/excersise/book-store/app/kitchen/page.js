import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { orders } from "../data/orders";
import Link from "next/link";

export const metadata = {
  title: "Kitchen Dashboard",
  description: "Staff portal for monitoring incoming orders and kitchen ticket fulfillment.",
};

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in?next=/kitchen");
  }

  if (session.role !== "staff") {
    return (
      <div style={{ padding: "2rem" }}>
        <h1 style={{ color: "#dc2626" }}>403 - Forbidden</h1>
        <p>Staff role required to view the kitchen dashboard.</p>
        <p>Your current role is: <strong>{session.role}</strong></p>
        <Link href="/">&larr; Return to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link href="/">Home</Link>{" | "}
        <Link href="/orders">Orders</Link>{" | "}
        <Link href="/kitchen">Kitchen</Link>
      </nav>

      <h1>Kitchen Dashboard</h1>
      <p style={{ color: "#4b5563" }}>
        Staff member: <strong>{session.name}</strong> ({session.role})
      </p>

      <h2 style={{ marginTop: "1.5rem" }}>All Kitchen Orders</h2>
      {orders.length === 0 ? (
        <p>No active orders in the queue.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((order) => (
            <li
              key={order.id}
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "6px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>Order #{order.id}</strong>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "4px",
                    backgroundColor: order.status === "cancelled" ? "#fee2e2" : "#dcfce7",
                    color: order.status === "cancelled" ? "#991b1b" : "#166534",
                    fontSize: "0.875rem"
                  }}
                >
                  {order.status}
                </span>
              </div>
              <p style={{ margin: "4px 0" }}>Customer: {order.name} ({order.phone})</p>
              <p style={{ margin: "4px 0" }}>Area: {order.area}</p>
              {order.notes && <p style={{ margin: "4px 0", color: "#6b7280" }}>Notes: {order.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
