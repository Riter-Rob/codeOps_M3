"use client";

import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function OrderStatus({ id = "1", fallbackData }) {
  const { data: order, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData,
    refreshInterval: 5000
  });

  if (error) return <p className="field-error">Could not load order status.</p>;
  if (!order) return <p style={{ color: "#6b7280" }}>Loading order status...</p>;

  const statusClass =
    order.status === "cancelled"
      ? "status-cancelled"
      : order.status === "delivered"
      ? "status-delivered"
      : "status-preparing";

  return (
    <div className="order-ticket" style={{ maxWidth: "440px" }}>
      <div className="order-ticket-header">
        <h2 style={{ margin: 0, fontSize: "1.0625rem" }}>Order #{order.id}</h2>
        <span className={`status-badge ${statusClass}`}>{order.status}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.875rem", margin: "0.5rem 0" }}>
        <p style={{ margin: 0 }}><strong>Customer:</strong> {order.name}</p>
        <p style={{ margin: 0 }}><strong>Phone:</strong> {order.phone}</p>
        <p style={{ margin: 0 }}><strong>Delivery Area:</strong> {order.area}</p>
      </div>

      <div style={{ marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid #f3f4f6", fontSize: "0.75rem", color: "#9ca3af" }}>
        Live status · updates every 5s
      </div>
    </div>
  );
}
