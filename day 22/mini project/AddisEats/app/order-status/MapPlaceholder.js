export default function MapPlaceholder() {
  return (
    <div
      style={{
        height: "420px",
        width: "100%",
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        color: "#64748b"
      }}
      role="status"
      aria-label="Loading interactive Leaflet delivery map"
      aria-busy="true"
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          border: "3.5px solid #e2e8f0",
          borderTopColor: "#18542a",
          borderRadius: "50%",
          animation: "spin 0.9s linear infinite"
        }}
      />
      <span style={{ fontSize: "0.9375rem", fontWeight: "600", color: "#334155" }}>
        Loading Leaflet Delivery Map...
      </span>
      <span style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>
        Preparing GPS coordinates and live route
      </span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
