import { orders } from "../data/orders";
import OrderStatus from "./OrderStatus";
import Link from "next/link";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Order History",
  description: "View your past orders, delivery receipts, and current meal preparation details.",
};

export default async function OrdersPage() {
  const session = await getSession();
  const userOrders = orders.filter((o) => o.sessionId === session?.id || o.userId === session?.id);
  const initialOrder = userOrders[0];

  return (
    <div style={{ padding: "2rem" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link href="/">Home</Link>{" | "}
        <Link href="/menu">Menu</Link>{" | "}
        <Link href="/orders">Orders</Link>{" | "}
        <Link href="/kitchen">Kitchen</Link>
      </nav>

      <h1>Orders</h1>
      {session && (
        <p style={{ color: "#4b5563", marginBottom: "1.5rem" }}>
          Signed in as <strong>{session.name}</strong> (ID: {session.id})
        </p>
      )}

      {initialOrder && (
        <div style={{ marginBottom: "2rem" }}>
          <OrderStatus id={initialOrder.id} fallbackData={initialOrder} />
        </div>
      )}

      <h2>All Orders</h2>
      {userOrders.length === 0 ? (
        <p>No orders placed yet for this account.</p>
      ) : (
        <ul>
          {userOrders.map((order) => (
            <li key={order.id} style={{ marginBottom: "0.5rem" }}>
              <Link href={`/orders/${order.id}`}>
                <strong>{order.name}</strong> - {order.phone} ({order.area}) - Status: {order.status}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
