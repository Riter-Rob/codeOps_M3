"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import MapPlaceholder from "./MapPlaceholder";
import { etb, when, relative } from "@/lib/format";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => <MapPlaceholder />
});

export default function LiveDeliveryTracking({ initialOrder }) {
  const [order, setOrder] = useState(initialOrder);
  const [connectionState, setConnectionState] = useState("connecting");
  const [lastEventTime, setLastEventTime] = useState(new Date().toISOString());

  useEffect(() => {
    if (!initialOrder?.id) return;

    const streamUrl = `/api/orders/${initialOrder.id}/stream`;
    const eventSource = new EventSource(streamUrl);

    eventSource.onopen = () => {
      setConnectionState("connected");
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setOrder(data);
        setLastEventTime(new Date().toISOString());

        if (data.status === "delivered") {
          eventSource.close();
          setConnectionState("delivered");
        }
      } catch {}
    };

    eventSource.onerror = () => {
      eventSource.close();
      setConnectionState((prev) => (prev === "delivered" ? "delivered" : "closed"));
    };

    return () => {
      eventSource.close();
    };
  }, [initialOrder?.id]);

  const currentStatus = (order.status || "preparing").toLowerCase();
  const courier = order.courierLocation || {
    name: 'Dawit "Speedy" Haile',
    vehicle: "Yamaha DT175 (ET-3401)",
    phone: "0922334455",
    lat: 9.0035,
    lng: 38.7760,
    distanceKm: 0.9,
    etaMinutes: 5
  };

  const delivery = order.deliveryLocation || {
    address: `${order.area || "Bole"}, Addis Ababa`,
    lat: 9.0085,
    lng: 38.7830
  };

  const steps = [
    { key: "preparing", label: "Preparing" },
    { key: "cooking", label: "Cooking" },
    { key: "out_for_delivery", label: "On the Way" },
    { key: "delivered", label: "Delivered" }
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === currentStatus);
  const activeIndex = currentStepIndex >= 0 ? currentStepIndex : 0;

  function renderConnectionBadge() {
    if (connectionState === "connected") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.3rem 0.75rem",
            borderRadius: "9999px",
            backgroundColor: "#dcfce7",
            color: "#15803d",
            fontSize: "0.8125rem",
            fontWeight: "700"
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#16a34a",
              boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.25)"
            }}
          />
          Live SSE Stream Active
        </span>
      );
    }

    if (connectionState === "delivered") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.3rem 0.75rem",
            borderRadius: "9999px",
            backgroundColor: "#f0fdf4",
            color: "#166534",
            fontSize: "0.8125rem",
            fontWeight: "700",
            border: "1px solid #bbf7d0"
          }}
        >
          ✓ Stream Closed (Delivered)
        </span>
      );
    }

    if (connectionState === "connecting") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.3rem 0.75rem",
            borderRadius: "9999px",
            backgroundColor: "#fef3c7",
            color: "#b45309",
            fontSize: "0.8125rem",
            fontWeight: "700"
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#d97706"
            }}
          />
          Connecting SSE Stream...
        </span>
      );
    }

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.3rem 0.75rem",
          borderRadius: "9999px",
          backgroundColor: "#f1f5f9",
          color: "#475569",
          fontSize: "0.8125rem",
          fontWeight: "600"
        }}
      >
        Stream Closed
      </span>
    );
  }

  return (
    <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.75rem",
          paddingBottom: "1.25rem",
          borderBottom: "1px solid #e5dcc3"
        }}
      >
        <div>
          <nav className="breadcrumbs" aria-label="Breadcrumbs" style={{ marginBottom: "0.5rem" }}>
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/orders">Orders</Link>
            <span className="separator">/</span>
            <span style={{ color: "#6b7280" }}>Tracking #{order.id}</span>
          </nav>
          <h1 style={{ margin: "0 0 0.25rem 0", color: "#18542a", fontSize: "1.75rem" }}>
            Live Delivery Tracking
          </h1>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "0.9375rem" }}>
            Real-time GPS dispatch and kitchen fulfillment updates for <strong>{order.name}</strong>.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem" }}>
          {renderConnectionBadge()}
          <span style={{ fontSize: "0.75rem", color: "#78716c" }}>
            Last event: {when(lastEventTime)} ({relative(lastEventTime)})
          </span>
        </div>
      </header>

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e5dcc3",
          padding: "1.25rem 1.5rem",
          marginBottom: "1.75rem",
          boxShadow: "0 2px 8px rgba(24, 84, 42, 0.04)"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.5rem",
            position: "relative"
          }}
        >
          {steps.map((step, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            return (
              <div
                key={step.key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "0.4rem"
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.875rem",
                    fontWeight: "700",
                    backgroundColor: isCompleted ? "#18542a" : isCurrent ? "#f96015" : "#f1f5f9",
                    color: isCompleted || isCurrent ? "#ffffff" : "#94a3b8",
                    boxShadow: isCurrent ? "0 0 0 4px rgba(249, 96, 21, 0.2)" : "none",
                    transition: "all 0.3s ease"
                  }}
                >
                  {isCompleted ? "✓" : idx + 1}
                </div>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: isCurrent ? "700" : "500",
                    color: isCurrent ? "#f96015" : isCompleted ? "#18542a" : "#64748b"
                  }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "1.5rem",
          alignItems: "start"
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e5dcc3",
            padding: "1.25rem",
            boxShadow: "0 2px 8px rgba(24, 84, 42, 0.04)"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem"
            }}
          >
            <h2 style={{ margin: 0, fontSize: "1.125rem", color: "#18542a" }}>
              Live Courier & Delivery Map
            </h2>
            <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              Leaflet · OpenStreetMap
            </span>
          </div>

          <DeliveryMap
            courier={courier}
            delivery={delivery}
            status={currentStatus}
          />
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e5dcc3",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(24, 84, 42, 0.04)"
          }}
        >
          <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.125rem", color: "#18542a" }}>
            Delivery Information & Live Dispatch
          </h2>

          <div
            aria-live="polite"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              fontSize: "0.875rem",
              color: "#1f2937"
            }}
          >
            <div
              style={{
                backgroundColor: "#fcf9f0",
                border: "1px solid #e5dcc3",
                borderRadius: "12px",
                padding: "1rem"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                <strong style={{ color: "#18542a", fontSize: "0.9375rem" }}>
                  🛵 Courier In Transit
                </strong>
                <span
                  style={{
                    fontWeight: "700",
                    color: currentStatus === "delivered" ? "#16a34a" : "#f96015",
                    textTransform: "capitalize"
                  }}
                >
                  {currentStatus.replace(/_/g, " ")}
                </span>
              </div>
              <p style={{ margin: "0 0 0.35rem 0" }}>
                <strong>Name:</strong> {courier.name}
              </p>
              <p style={{ margin: "0 0 0.35rem 0" }}>
                <strong>Vehicle:</strong> {courier.vehicle}
              </p>
              <p style={{ margin: "0 0 0.35rem 0" }}>
                <strong>Phone:</strong> {courier.phone}
              </p>
              <p style={{ margin: "0 0 0.35rem 0" }}>
                <strong>GPS Coordinates:</strong>{" "}
                <code style={{ backgroundColor: "#ffffff", padding: "2px 6px", borderRadius: "4px", border: "1px solid #e5dcc3" }}>
                  {courier.lat.toFixed(4)}° N, {courier.lng.toFixed(4)}° E
                </code>
              </p>
              <p style={{ margin: 0 }}>
                <strong>Distance Remaining:</strong>{" "}
                <span style={{ fontWeight: "700", color: "#18542a" }}>
                  {courier.distanceKm} km
                </span>{" "}
                (Est. Arrival: <strong>~{courier.etaMinutes} mins</strong>)
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#fdfbf7",
                border: "1px solid #f0e9d6",
                borderRadius: "12px",
                padding: "1rem"
              }}
            >
              <strong style={{ display: "block", color: "#18542a", fontSize: "0.9375rem", marginBottom: "0.35rem" }}>
                📍 Delivery Address
              </strong>
              <p style={{ margin: "0 0 0.35rem 0", whiteSpace: "pre-line" }}>
                {delivery.address}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Destination GPS:</strong>{" "}
                <code style={{ backgroundColor: "#ffffff", padding: "2px 6px", borderRadius: "4px", border: "1px solid #e5dcc3" }}>
                  {delivery.lat.toFixed(4)}° N, {delivery.lng.toFixed(4)}° E
                </code>
              </p>
            </div>

            {order.notes && (
              <div
                style={{
                  backgroundColor: "#fffbeb",
                  border: "1px solid #fef3c7",
                  borderRadius: "12px",
                  padding: "0.875rem 1rem"
                }}
              >
                <strong style={{ display: "block", color: "#92400e", fontSize: "0.8125rem", marginBottom: "0.25rem" }}>
                  Special Delivery Instructions:
                </strong>
                <p style={{ margin: 0, fontSize: "0.8125rem", color: "#78350f", whiteSpace: "pre-line" }}>
                  {order.notes}
                </p>
              </div>
            )}

            <div
              style={{
                borderTop: "1px solid #f3e8cc",
                paddingTop: "0.875rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <span style={{ display: "block", fontSize: "0.75rem", color: "#6b7280" }}>
                  Order Total
                </span>
                <strong style={{ fontSize: "1.25rem", color: "#18542a" }}>
                  {etb(order.total)}
                </strong>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{ display: "block", fontSize: "0.75rem", color: "#6b7280" }}>
                  Placed At
                </span>
                <span style={{ fontSize: "0.8125rem", fontWeight: "600", color: "#374151" }}>
                  {when(order.createdAt)}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <Link
                href="/orders"
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5dcc3",
                  color: "#18542a",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "0.875rem"
                }}
              >
                &larr; Back to Orders
              </Link>
              <Link
                href={`/orders/${order.id}`}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  backgroundColor: "#18542a",
                  border: "1px solid #144422",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "0.875rem"
                }}
              >
                View Full Receipt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
