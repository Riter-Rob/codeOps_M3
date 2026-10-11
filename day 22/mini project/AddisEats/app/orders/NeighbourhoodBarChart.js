"use client";

export default function NeighbourhoodBarChart({ summary }) {
  const data = summary?.revenueByNeighbourhood || [];
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1000);
  const maxTick = Math.ceil(maxRevenue / 1000) * 1000;
  const tickCount = 4;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => Math.round((maxTick / tickCount) * i));

  const svgWidth = 620;
  const svgHeight = 240;
  const marginLeft = 85;
  const marginRight = 20;
  const marginTop = 24;
  const marginBottom = 36;

  const chartWidth = svgWidth - marginLeft - marginRight;
  const chartHeight = svgHeight - marginTop - marginBottom;

  const slotWidth = data.length > 0 ? chartWidth / data.length : 0;
  const barWidth = Math.min(42, slotWidth * 0.65);

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
      <div style={{ marginBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#18542a", margin: 0 }}>
          Revenue by Neighbourhood (Unit: ETB)
        </h3>
        <span style={{ fontSize: "0.85rem", color: "#6b7280", fontVariantNumeric: "tabular-nums" }}>
          Total: {summary?.totalRevenue?.toLocaleString()} ETB
        </span>
      </div>

      <div
        style={{
          height: "280px",
          width: "100%",
          position: "relative"
        }}
        role="img"
        aria-label="Bar chart showing revenue by neighbourhood in ETB, starting at zero"
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          <defs>
            <pattern id="neighbourhoodHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#18542a" strokeWidth="2.5" />
            </pattern>
          </defs>

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
                  {`${tickVal.toLocaleString()} ETB`}
                </text>
              </g>
            );
          })}

          {data.map((item, index) => {
            const barHeight = maxTick > 0 ? (item.revenue / maxTick) * chartHeight : 0;
            const xCenter = marginLeft + index * slotWidth + slotWidth / 2;
            const x = xCenter - barWidth / 2;
            const y = marginTop + chartHeight - barHeight;

            return (
              <g key={item.neighbourhood}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={Math.max(barHeight, 2)}
                  rx="3"
                  fill="url(#neighbourhoodHatch)"
                  stroke="#18542a"
                  strokeWidth="1.5"
                />
                <text
                  x={xCenter}
                  y={Math.max(y - 6, marginTop + 10)}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#18542a"
                  fontWeight="700"
                  fontFamily="sans-serif"
                >
                  {`${item.revenue.toLocaleString()} ETB`}
                </text>
                <text
                  x={xCenter}
                  y={svgHeight - 12}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#1f2937"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {item.neighbourhood}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
