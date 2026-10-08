"use client";

import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function OrderStatus({ id = "1", fallbackData }) {
  const { data: order, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData,
    refreshInterval: 5000
  });

  if (error) return <p>Failed to load order status.</p>;
  if (!order) return <p>Loading order status...</p>;

  return (
    <div style={{ maxWidth: "420px", padding: "1.25rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
      <h2 style={{ margin: "0 0 1rem 0" }}>Order Status</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Customer:</strong> {order.name}</p>
      <p><strong>Phone:</strong> {order.phone}</p>
      <p><strong>Area:</strong> {order.area}</p>
      <p>
        <strong>Status: </strong>
        <span style={{
          padding: "2px 8px",
          borderRadius: "4px",
          backgroundColor: order.status === "cancelled" ? "#fee2e2" : "#dcfce7",
          color: order.status === "cancelled" ? "#b91c1c" : "#15803d",
          textTransform: "capitalize",
          fontWeight: 600
        }}>
          {order.status}
        </span>
      </p>
    </div>
  );
}
