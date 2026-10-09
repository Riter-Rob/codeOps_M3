"use client";

import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function OrderStatus({ id = "1", fallbackData }) {
  const { data: order, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData,
    refreshInterval: 5000
  });

  const activeOrder = order || fallbackData;

  if (error && !activeOrder) return <p className="field-error">Could not load order status.</p>;
  if (!activeOrder) return <p style={{ color: "#6b7280" }}>Loading order status...</p>;

  return (
    <div className="order-ticket" style={{ maxWidth: "440px" }}>
      <div className="order-ticket-header">
        <h2 style={{ margin: 0, fontSize: "1.0625rem" }}>Order #{activeOrder.id}</h2>
        <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: activeOrder.status === "cancelled" ? "#d52518" : activeOrder.status === "delivered" ? "#18542a" : "#b45309", textTransform: "capitalize" }}>
          Status: {activeOrder.status}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.875rem", margin: "0.5rem 0" }}>
        <p style={{ margin: 0 }}><strong>Customer:</strong> {activeOrder.name}</p>
        <p style={{ margin: 0 }}><strong>Phone:</strong> {activeOrder.phone}</p>
        <p style={{ margin: 0 }}><strong>Delivery Area:</strong> {activeOrder.area}</p>
      </div>

      <div style={{ marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid #f3e8cc", fontSize: "0.75rem", color: "#78716c" }}>
        Live status · updates every 5s
      </div>
    </div>
  );
}
