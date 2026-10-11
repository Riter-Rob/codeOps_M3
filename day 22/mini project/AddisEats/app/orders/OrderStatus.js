"use client";

import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { etb } from "@/lib/format";

export default function OrderStatus({ id = "1", fallbackData }) {
  const { data: order, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData,
    refreshInterval: 5000
  });

  const activeOrder = order || fallbackData;

  if (error && !activeOrder) return <p className="field-error">Could not load order status.</p>;
  if (!activeOrder) return <p style={{ color: "#6b7280" }}>Loading order status...</p>;

  const currentStatus = (activeOrder.status || "preparing").toLowerCase();
  const isCancelled = currentStatus === "cancelled";
  const isDelivered = currentStatus === "delivered";
  const isPreparing = currentStatus === "preparing" || currentStatus === "confirmed";

  return (
    <div className="order-ticket" style={{ maxWidth: "460px", padding: "1.25rem 1.4rem" }}>
      <div className="order-ticket-header" style={{ marginBottom: "0.75rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.15rem", color: "#18542a" }}>Order #{activeOrder.id}</h2>
          <div className="live-beacon" style={{ marginTop: "0.25rem" }}>
            <span className="pulse-dot" />
            <span>Kitchen Queue · Live Polling</span>
          </div>
        </div>
        <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: isCancelled ? "#d52518" : isDelivered ? "#18542a" : "#b45309", textTransform: "capitalize" }}>
          Status: {activeOrder.status}
        </span>
      </div>

      {!isCancelled && (
        <div style={{ margin: "1rem 0 1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", marginBottom: "0.35rem" }}>
            <span style={{ color: "#18542a" }}>1. Placed</span>
            <span style={{ color: isPreparing || isDelivered ? "#18542a" : "#6b7280" }}>2. Cooking</span>
            <span style={{ color: isDelivered ? "#18542a" : "#6b7280" }}>3. Delivered</span>
          </div>
          <div style={{ height: "6px", background: "#f3e8cc", borderRadius: "9999px", overflow: "hidden", display: "flex" }}>
            <div style={{ width: isDelivered ? "100%" : isPreparing ? "66%" : "33%", background: isDelivered ? "#18542a" : "#f96015", borderRadius: "9999px", transition: "width 0.4s ease" }} />
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.875rem", margin: "0.75rem 0", background: "#fdfbf7", padding: "0.75rem 0.9rem", borderRadius: "10px", border: "1px solid #f0e9d6" }}>
        <p style={{ margin: 0 }}><strong>Customer:</strong> {activeOrder.name}</p>
        <p style={{ margin: 0 }}><strong>Phone:</strong> {activeOrder.phone}</p>
        <p style={{ margin: 0 }}><strong>Delivery Area:</strong> {activeOrder.area}</p>
        {activeOrder.total && (
          <p style={{ margin: 0 }}><strong>Total:</strong> {etb(activeOrder.total)}</p>
        )}
      </div>

      <div style={{ marginTop: "0.75rem", paddingTop: "0.5rem", borderTop: "1px solid #f3e8cc", fontSize: "0.75rem", color: "#78716c", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>Live status · updates every 5s</span>
        <span style={{ color: "#18542a", fontWeight: 600 }}>Addis Ababa Kitchen</span>
      </div>
    </div>
  );
}
