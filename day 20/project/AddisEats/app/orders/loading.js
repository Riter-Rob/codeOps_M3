export default function OrdersLoading() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      style={{ padding: "0.5rem 0", maxWidth: "1000px", margin: "0 auto" }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ height: "32px", width: "240px", backgroundColor: "#e5dcc3", borderRadius: "8px", marginBottom: "0.5rem" }} />
        <div style={{ height: "16px", width: "300px", backgroundColor: "#f3e8cc", borderRadius: "6px" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ padding: "1.25rem", backgroundColor: "#ffffff", border: "1px solid #e5dcc3", borderRadius: "20px" }}>
            <div style={{ height: "14px", width: "100px", backgroundColor: "#e5dcc3", borderRadius: "4px", marginBottom: "0.75rem" }} />
            <div style={{ height: "26px", width: "130px", backgroundColor: "#d5cdb5", borderRadius: "6px" }} />
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ height: "350px", backgroundColor: "#ffffff", border: "1px solid #e5dcc3", borderRadius: "20px", padding: "1.25rem" }}>
          <div style={{ height: "20px", width: "180px", backgroundColor: "#e5dcc3", borderRadius: "4px", marginBottom: "1rem" }} />
          <div style={{ height: "270px", backgroundColor: "#fcf9f0", borderRadius: "12px" }} />
        </div>
        <div style={{ height: "350px", backgroundColor: "#ffffff", border: "1px solid #e5dcc3", borderRadius: "20px", padding: "1.25rem" }}>
          <div style={{ height: "20px", width: "200px", backgroundColor: "#e5dcc3", borderRadius: "4px", marginBottom: "1rem" }} />
          <div style={{ height: "270px", backgroundColor: "#fcf9f0", borderRadius: "12px" }} />
        </div>
      </div>

      <div style={{ height: "260px", backgroundColor: "#ffffff", border: "1px solid #e5dcc3", borderRadius: "20px", padding: "1.25rem" }}>
        <div style={{ height: "20px", width: "220px", backgroundColor: "#e5dcc3", borderRadius: "4px", marginBottom: "1rem" }} />
        <div style={{ height: "180px", backgroundColor: "#fcf9f0", borderRadius: "12px" }} />
      </div>
    </div>
  );
}
