import { orders } from "../data/orders";

export default function OrdersPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} style={{ marginBottom: "1rem" }}>
              <strong>{order.name}</strong> - {order.phone} ({order.area}) - Status: {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
