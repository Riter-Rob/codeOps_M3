"use client";

import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function OrderStatus({ id = "1", fallbackData }) {
  const { data: order, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData,
    refreshInterval: 5000
  });

  if (error) return <p className="form-error">Failed to load order status.</p>;
  if (!order) return <p style={{ color: "var(--color-text-muted)" }}>Loading order status...</p>;

  return (
    <div className="card" style={{ maxWidth: "480px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.25rem" }}>Live Order Status</h2>
        <div className="status-beacon">
          <span className="beacon-dot" />
          <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "var(--color-herb)" }}>
            5s Polling
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <p style={{ margin: 0 }}><strong>Order Ticket:</strong> #{order.id}</p>
        <p style={{ margin: 0 }}><strong>Customer:</strong> {order.name}</p>
        <p style={{ margin: 0 }}><strong>Phone:</strong> {order.phone}</p>
        <p style={{ margin: 0 }}><strong>Delivery District:</strong> {order.area}</p>
        <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <strong style={{ fontSize: "0.875rem" }}>Progress:</strong>
          <span className={`badge ${order.status === "cancelled" ? "badge-danger" : "badge-success"}`}>
            {order.status}
          </span>
        </div>
      </div>
    </div>
  );
}
