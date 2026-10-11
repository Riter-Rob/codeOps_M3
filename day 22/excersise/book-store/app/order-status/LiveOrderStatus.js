"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import MapPlaceholder from "./MapPlaceholder";
import { etb, when, relative } from "@/lib/format";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => <MapPlaceholder />
});

export default function LiveOrderStatus({ initialOrder }) {
  const [order, setOrder] = useState(initialOrder);
  const [status, setStatus] = useState(initialOrder?.status || "preparing");
  const [currentStep, setCurrentStep] = useState("Order accepted by kitchen");
  const [courier, setCourier] = useState(
    initialOrder?.courierLocation || {
      name: "Dawit Haile",
      vehicle: "Yamaha Motorbike (ET-3401)",
      phone: "0922334455",
      lat: 9.0040,
      lng: 38.7820,
      distanceKm: 1.4,
      etaMinutes: 8
    }
  );
  const [delivery, setDelivery] = useState(
    initialOrder?.deliveryLocation || {
      address: initialOrder?.area || "Bole Atlas, House 402",
      lat: 9.0125,
      lng: 38.7750
    }
  );
  const [connectionState, setConnectionState] = useState("connecting");
  const [updatedAt, setUpdatedAt] = useState(initialOrder?.createdAt || new Date().toISOString());

  useEffect(() => {
    if (!initialOrder?.id) return;

    const eventSource = new EventSource(`/api/orders/${initialOrder.id}/stream`);

    eventSource.onopen = () => {
      setConnectionState("connected");
    };

    eventSource.addEventListener("init", (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.status) setStatus(payload.status);
        if (payload.courier) setCourier(payload.courier);
        if (payload.delivery) setDelivery(payload.delivery);
        if (payload.timestamp) setUpdatedAt(payload.timestamp);
      } catch {}
    });

    eventSource.addEventListener("status", (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.status) setStatus(payload.status);
        if (payload.step) setCurrentStep(payload.step);
        if (payload.courier) setCourier(payload.courier);
        if (payload.delivery) setDelivery(payload.delivery);
        if (payload.timestamp) setUpdatedAt(payload.timestamp);
      } catch {}
    });

    eventSource.addEventListener("delivered", (event) => {
      try {
        const payload = JSON.parse(event.data);
        setStatus("delivered");
        if (payload.step) setCurrentStep(payload.step);
        setConnectionState("closed_delivered");
        eventSource.close();
      } catch {}
    });

    eventSource.onerror = () => {
      if (status === "delivered") {
        setConnectionState("closed_delivered");
      } else {
        setConnectionState("error");
      }
    };

    return () => {
      eventSource.close();
    };
  }, [initialOrder?.id, status]);

  function renderConnectionIndicator() {
    if (connectionState === "connected") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            fontSize: "0.8125rem",
            fontWeight: "600",
            color: "#15803d",
            backgroundColor: "#dcfce7",
            padding: "0.25rem 0.65rem",
            borderRadius: "9999px"
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#16a34a"
            }}
          />
          Live SSE Connected
        </span>
      );
    }

    if (connectionState === "closed_delivered") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            fontSize: "0.8125rem",
            fontWeight: "600",
            color: "#1e40af",
            backgroundColor: "#dbeafe",
            padding: "0.25rem 0.65rem",
            borderRadius: "9999px"
          }}
        >
          &#x2713; Stream Closed (Delivered)
        </span>
      );
    }

    if (connectionState === "error") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            fontSize: "0.8125rem",
            fontWeight: "600",
            color: "#b91c1c",
            backgroundColor: "#fee2e2",
            padding: "0.25rem 0.65rem",
            borderRadius: "9999px"
          }}
        >
          Disconnected
        </span>
      );
    }

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          fontSize: "0.8125rem",
          fontWeight: "600",
          color: "#b45309",
          backgroundColor: "#fef3c7",
          padding: "0.25rem 0.65rem",
          borderRadius: "9999px"
        }}
      >
        Connecting...
      </span>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "1.25rem",
          marginBottom: "1.5rem"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0f172a", margin: "0 0 0.25rem 0" }}>
              Order #{order.id} Status
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0 }}>
              Customer: <strong>{order.name}</strong> · Area: <strong>{order.area}</strong>
            </p>
          </div>
          {renderConnectionIndicator()}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", padding: "1rem", backgroundColor: "#f8fafc", borderRadius: "6px", marginBottom: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Current Stage</span>
            <strong style={{ fontSize: "1rem", color: "#0f172a", textTransform: "capitalize" }}>
              {status.replace(/_/g, " ")}
            </strong>
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Total Billed</span>
            <strong style={{ fontSize: "1rem", color: "#0f172a", fontVariantNumeric: "tabular-nums" }}>
              {etb(order.total)}
            </strong>
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Order Placed</span>
            <strong style={{ fontSize: "0.875rem", color: "#0f172a" }}>
              {when(order.createdAt)}
            </strong>
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Last Update</span>
            <strong style={{ fontSize: "0.875rem", color: "#0f172a" }}>
              {relative(updatedAt)}
            </strong>
          </div>
        </div>

        <p style={{ fontSize: "0.9375rem", color: "#334155", margin: 0, padding: "0.75rem", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
          <strong>Activity:</strong> {currentStep}
        </p>
      </div>

      <DeliveryMap
        courier={courier}
        delivery={delivery}
        status={status}
        updatedAt={updatedAt}
      />
    </div>
  );
}
