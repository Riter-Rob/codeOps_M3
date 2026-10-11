"use client";

import { when, relative } from "@/lib/format";

export default function DeliveryMap({
  courier = {
    name: "Dawit Haile",
    vehicle: "Yamaha Motorbike (ET-3401)",
    phone: "0922334455",
    lat: 9.0040,
    lng: 38.7820,
    distanceKm: 1.4,
    etaMinutes: 8
  },
  delivery = {
    address: "Bole Atlas, House 402",
    lat: 9.0125,
    lng: 38.7750
  },
  status = "out_for_delivery",
  updatedAt = new Date().toISOString()
}) {
  const cLat = courier?.lat || 9.0040;
  const cLng = courier?.lng || 38.7820;
  const dLat = delivery?.lat || 9.0125;
  const dLng = delivery?.lng || 38.7750;

  const minLat = Math.min(cLat, dLat) - 0.005;
  const maxLat = Math.max(cLat, dLat) + 0.005;
  const minLng = Math.min(cLng, dLng) - 0.007;
  const maxLng = Math.max(cLng, dLng) + 0.007;

  const svgWidth = 700;
  const svgHeight = 360;

  function toX(lng) {
    return ((lng - minLng) / (maxLng - minLng)) * (svgWidth - 100) + 50;
  }

  function toY(lat) {
    return svgHeight - (((lat - minLat) / (maxLat - minLat)) * (svgHeight - 100) + 50);
  }

  const courierX = toX(cLng);
  const courierY = toY(cLat);
  const deliveryX = toX(dLng);
  const deliveryY = toY(dLat);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1.25rem",
        marginBottom: "1.5rem"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#0f172a", margin: 0 }}>
          Live Courier & Delivery Map
        </h3>
        <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>
          Fit to courier & destination
        </span>
      </div>

      <div
        style={{
          height: "360px",
          width: "100%",
          position: "relative",
          backgroundColor: "#f8fafc",
          borderRadius: "6px",
          overflow: "hidden",
          border: "1px solid #e2e8f0"
        }}
        role="img"
        aria-label={`Interactive map showing courier at ${cLat.toFixed(4)} North, ${cLng.toFixed(4)} East delivering to ${delivery.address} at ${dLat.toFixed(4)} North, ${dLng.toFixed(4)} East`}
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <defs>
            <pattern id="cityGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
            </pattern>
          </defs>

          <rect width={svgWidth} height={svgHeight} fill="#f1f5f9" />
          <rect width={svgWidth} height={svgHeight} fill="url(#cityGrid)" />

          <path
            d={`M 0,${svgHeight * 0.4} Q ${svgWidth * 0.4},${svgHeight * 0.35} ${svgWidth},${svgHeight * 0.6}`}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="12"
          />
          <path
            d={`M ${svgWidth * 0.3},0 Q ${svgWidth * 0.4},${svgHeight * 0.5} ${svgWidth * 0.25},${svgHeight}`}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="10"
          />
          <path
            d={`M ${svgWidth * 0.7},0 L ${svgWidth * 0.6},${svgHeight}`}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="8"
          />

          <line
            x1={courierX}
            y1={courierY}
            x2={deliveryX}
            y2={deliveryY}
            stroke="#2563eb"
            strokeWidth="3.5"
            strokeDasharray="6 6"
          />

          <g transform={`translate(${deliveryX}, ${deliveryY})`}>
            <circle r="18" fill="#dcfce7" opacity="0.6" />
            <circle r="10" fill="#16a34a" stroke="#ffffff" strokeWidth="2.5" />
            <rect x="-60" y="-38" width="120" height="24" rx="4" fill="#0f172a" opacity="0.9" />
            <text x="0" y="-22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="600" fontFamily="sans-serif">
              Destination
            </text>
          </g>

          <g transform={`translate(${courierX}, ${courierY})`}>
            <circle r="22" fill="#dbeafe" opacity="0.7">
              <animate attributeName="r" values="14;26;14" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="11" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" />
            <rect x="-60" y="-38" width="120" height="24" rx="4" fill="#1e40af" opacity="0.95" />
            <text x="0" y="-22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="600" fontFamily="sans-serif">
              Courier ({courier?.name || "Driver"})
            </text>
          </g>
        </svg>
      </div>

      <div
        aria-live="polite"
        style={{
          marginTop: "0.875rem",
          padding: "0.875rem 1rem",
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          fontSize: "0.875rem",
          color: "#1e293b",
          lineHeight: "1.6"
        }}
      >
        <p style={{ margin: "0 0 0.375rem 0", fontWeight: "600", color: "#0f172a" }}>
          Live Delivery Locations (Text Alternative):
        </p>
        <p style={{ margin: "0 0 0.25rem 0" }}>
          <strong>Courier:</strong> {courier?.name || "Courier"} ({courier?.vehicle || "Vehicle"}) is located at{" "}
          <code>{cLat.toFixed(4)}° N, {cLng.toFixed(4)}° E</code>.
          {courier?.distanceKm !== undefined && (
            <span> Distance remaining: <strong>{courier.distanceKm} km</strong> (ETA: ~{courier.etaMinutes || 5} min).</span>
          )}
        </p>
        <p style={{ margin: "0 0 0.25rem 0" }}>
          <strong>Destination:</strong> {delivery?.address} at{" "}
          <code>{dLat.toFixed(4)}° N, {dLng.toFixed(4)}° E</code>.
        </p>
        <p style={{ margin: 0, color: "#64748b", fontSize: "0.8125rem" }}>
          <strong>Status:</strong> <span style={{ textTransform: "capitalize", fontWeight: "600", color: status === "delivered" ? "#16a34a" : "#2563eb" }}>{status.replace(/_/g, " ")}</span>
          {" · "}Last tracked: {when(updatedAt)} ({relative(updatedAt)}).
        </p>
      </div>
    </div>
  );
}
