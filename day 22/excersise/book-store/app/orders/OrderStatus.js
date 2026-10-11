"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { etb } from "@/lib/format";

export default function OrderStatus({ id = "1", fallbackData }) {
  const { data: order, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData,
    refreshInterval: 3000
  });

  if (error) return <p>Failed to load order status.</p>;
  if (!order) return <p>Loading order status...</p>;

  return (
    <div style={{ maxWidth: "460px", padding: "1.25rem", border: "1px solid #e5e7eb", borderRadius: "8px", backgroundColor: "#ffffff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.125rem", color: "#0f172a" }}>Order #{order.id}</h2>
        <Link
          href={`/order-status?id=${order.id}`}
          style={{ fontSize: "0.8125rem", color: "#2563eb", textDecoration: "none", fontWeight: "600" }}
        >
          Open Live Map &rarr;
        </Link>
      </div>
      <p style={{ margin: "0 0 0.35rem 0" }}><strong>Customer:</strong> {order.name}</p>
      <p style={{ margin: "0 0 0.35rem 0" }}><strong>Phone:</strong> {order.phone}</p>
      <p style={{ margin: "0 0 0.35rem 0" }}><strong>Area:</strong> {order.area}</p>
      {order.total !== undefined && (
        <p style={{ margin: "0 0 0.35rem 0" }}><strong>Total:</strong> {etb(order.total)}</p>
      )}
      <p style={{ margin: 0 }}>
        <strong>Status: </strong>
        <span style={{
          padding: "2px 8px",
          borderRadius: "4px",
          backgroundColor: order.status === "cancelled" ? "#fee2e2" : order.status === "delivered" ? "#dcfce7" : "#dbeafe",
          color: order.status === "cancelled" ? "#b91c1c" : order.status === "delivered" ? "#15803d" : "#1e40af",
          textTransform: "capitalize",
          fontWeight: 600,
          fontSize: "0.8125rem"
        }}>
          {order.status}
        </span>
      </p>
    </div>
  );
}
