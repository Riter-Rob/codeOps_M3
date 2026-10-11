"use client";

export default function OrdersLineChart({ summary }) {
  const dailyMetrics = summary?.dailyMetrics || [];
  const rangeLabel = summary?.rangeLabel || "Past 7 Days";
  const unit = summary?.unit || "Orders";

  const maxOrders = Math.max(...dailyMetrics.map((d) => d.orderCount), 4);
  const maxTick = Math.ceil(maxOrders / 2) * 2;
  const tickCount = maxTick;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => i);

  const svgWidth = 640;
  const svgHeight = 220;
  const marginLeft = 50;
  const marginRight = 25;
  const marginTop = 20;
  const marginBottom = 35;

  const chartWidth = svgWidth - marginLeft - marginRight;
  const chartHeight = svgHeight - marginTop - marginBottom;

  const points = dailyMetrics.map((day, index) => {
    const x = marginLeft + (dailyMetrics.length > 1 ? (index / (dailyMetrics.length - 1)) * chartWidth : chartWidth / 2);
    const y = marginTop + chartHeight - (day.orderCount / maxTick) * chartHeight;
    return { x, y, day };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ marginBottom: "0.75rem" }}>
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#0f172a",
            margin: "0 0 0.25rem 0"
          }}
        >
          {`Orders per Day (${rangeLabel}, Unit: ${unit})`}
        </h3>
        <p style={{ fontSize: "0.875rem", color: "#64748b", margin: 0 }}>
          {`Daily order frequency recorded across the ${rangeLabel.toLowerCase()}`}
        </p>
      </div>

      <div
        style={{
          height: "260px",
          width: "100%",
          position: "relative"
        }}
        role="img"
        aria-label={`Orders per day line chart covering ${rangeLabel} in unit ${unit}`}
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {ticks.map((tickVal) => {
            const y = marginTop + chartHeight - (tickVal / maxTick) * chartHeight;
            return (
              <g key={tickVal}>
                <line
                  x1={marginLeft}
                  y1={y}
                  x2={marginLeft + chartWidth}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray={tickVal === 0 ? "none" : "3 3"}
                  strokeWidth="1"
                />
                <text
                  x={marginLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#64748b"
                  fontFamily="sans-serif"
                >
                  {tickVal}
                </text>
              </g>
            );
          })}

          {points.length > 1 && (
            <polyline
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={polylinePoints}
            />
          )}

          {points.map((p) => (
            <g key={p.day.dateKey}>
              <circle
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill="#ffffff"
                stroke="#0284c7"
                strokeWidth="2.5"
              />
              <text
                x={p.x}
                y={p.y - 8}
                textAnchor="middle"
                fontSize="11"
                fill="#0f172a"
                fontWeight="600"
                fontFamily="sans-serif"
              >
                {p.day.orderCount}
              </text>
              <text
                x={p.x}
                y={svgHeight - 10}
                textAnchor="middle"
                fontSize="11"
                fill="#475569"
                fontFamily="sans-serif"
              >
                {p.day.displayDate}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
