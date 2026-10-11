export default function MapPlaceholder() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading delivery tracking map"
      style={{
        height: "360px",
        width: "100%",
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        color: "#64748b"
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: "36px",
          height: "36px",
          border: "3px solid #cbd5e1",
          borderTopColor: "#2563eb",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}
      />
      <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
        Loading Live Delivery Map...
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
