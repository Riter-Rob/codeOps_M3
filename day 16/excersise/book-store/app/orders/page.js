import { orders } from "../data/orders";
import OrderStatus from "./OrderStatus";
import Link from "next/link";

export default async function OrdersPage() {
  const initialOrder = orders[0];

  return (
    <div style={{ padding: "2rem" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link href="/">Home</Link>{" | "}
        <Link href="/menu">Menu</Link>{" | "}
        <Link href="/orders">Orders</Link>
      </nav>

      <h1>Orders</h1>

      {initialOrder && (
        <div style={{ marginBottom: "2rem" }}>
          <OrderStatus id={initialOrder.id} fallbackData={initialOrder} />
        </div>
      )}

      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
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
