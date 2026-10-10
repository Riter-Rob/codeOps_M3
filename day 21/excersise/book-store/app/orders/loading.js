export default function OrdersLoading() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ height: "28px", width: "180px", backgroundColor: "#e2e8f0", borderRadius: "4px", marginBottom: "0.5rem" }} />
        <div style={{ height: "16px", width: "260px", backgroundColor: "#f1f5f9", borderRadius: "4px" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ padding: "1.25rem", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
            <div style={{ height: "14px", width: "90px", backgroundColor: "#e2e8f0", borderRadius: "4px", marginBottom: "0.75rem" }} />
            <div style={{ height: "24px", width: "120px", backgroundColor: "#cbd5e1", borderRadius: "4px" }} />
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ height: "340px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.25rem" }}>
          <div style={{ height: "20px", width: "140px", backgroundColor: "#e2e8f0", borderRadius: "4px", marginBottom: "1rem" }} />
          <div style={{ height: "260px", backgroundColor: "#f8fafc", borderRadius: "6px" }} />
        </div>
        <div style={{ height: "340px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.25rem" }}>
          <div style={{ height: "20px", width: "200px", backgroundColor: "#e2e8f0", borderRadius: "4px", marginBottom: "1rem" }} />
          <div style={{ height: "260px", backgroundColor: "#f8fafc", borderRadius: "6px" }} />
        </div>
      </div>

      <div style={{ height: "260px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.25rem" }}>
        <div style={{ height: "20px", width: "180px", backgroundColor: "#e2e8f0", borderRadius: "4px", marginBottom: "1rem" }} />
        <div style={{ height: "180px", backgroundColor: "#f8fafc", borderRadius: "6px" }} />
      </div>
    </div>
  );
}
