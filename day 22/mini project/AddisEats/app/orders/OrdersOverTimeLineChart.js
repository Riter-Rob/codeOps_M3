"use client";

export default function OrdersOverTimeLineChart({ summary }) {
  const data = summary?.ordersOverTime || [];
  const rangeLabel = summary?.rangeLabel || "Past 7 Days";
  const unit = summary?.timeUnit || "Orders";

  const maxOrders = Math.max(...data.map((d) => d.orderCount), 4);
  const maxTick = Math.ceil(maxOrders / 2) * 2;
  const tickCount = maxTick;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => i);

  const svgWidth = 620;
  const svgHeight = 220;
  const marginLeft = 50;
  const marginRight = 25;
  const marginTop = 20;
  const marginBottom = 35;

  const chartWidth = svgWidth - marginLeft - marginRight;
  const chartHeight = svgHeight - marginTop - marginBottom;

  const points = data.map((item, index) => {
    const x = marginLeft + (data.length > 1 ? (index / (data.length - 1)) * chartWidth : chartWidth / 2);
    const y = marginTop + chartHeight - (item.orderCount / maxTick) * chartHeight;
    return { x, y, item };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5dcc3",
        borderRadius: "20px",
        padding: "1.25rem",
        boxShadow: "0 2px 8px rgba(24, 84, 42, 0.04)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ marginBottom: "0.75rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#18542a", margin: "0 0 0.25rem 0" }}>
          {`Orders over Time (${rangeLabel}, Unit: ${unit})`}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0 }}>
          {`Daily volume frequency recorded across ${rangeLabel.toLowerCase()}`}
        </p>
      </div>

      <div
        style={{
          height: "260px",
          width: "100%",
          position: "relative"
        }}
        role="img"
        aria-label={`Line chart showing orders over time across ${rangeLabel} in unit ${unit}, starting at zero`}
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
                  stroke={tickVal === 0 ? "#18542a" : "#e5dcc3"}
                  strokeDasharray={tickVal === 0 ? "none" : "3 3"}
                  strokeWidth={tickVal === 0 ? "1.5" : "1"}
                />
                <text
                  x={marginLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#4b5563"
                  fontFamily="sans-serif"
                  fontWeight={tickVal === 0 ? "600" : "400"}
                >
                  {tickVal}
                </text>
              </g>
            );
          })}

          {points.length > 1 && (
            <polyline
              fill="none"
              stroke="#18542a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={polylinePoints}
            />
          )}

          {points.map((p) => (
            <g key={p.item.dateKey}>
              <circle
                cx={p.x}
                cy={p.y}
                r="5"
                fill="#ffffff"
                stroke="#18542a"
                strokeWidth="2.5"
              />
              <text
                x={p.x}
                y={p.y - 8}
                textAnchor="middle"
                fontSize="11"
                fill="#18542a"
                fontWeight="700"
                fontFamily="sans-serif"
              >
                {p.item.orderCount}
              </text>
              <text
                x={p.x}
                y={svgHeight - 10}
                textAnchor="middle"
                fontSize="11"
                fill="#1f2937"
                fontWeight="600"
                fontFamily="sans-serif"
              >
                {p.item.displayDate}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
