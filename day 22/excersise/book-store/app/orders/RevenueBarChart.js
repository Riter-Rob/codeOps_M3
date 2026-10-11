"use client";

import { etb } from "@/lib/format";

export default function RevenueBarChart({ summary }) {
  const dailyMetrics = summary?.dailyMetrics || [];
  const maxRevenue = Math.max(...dailyMetrics.map((d) => d.revenue), 1000);
  const maxTick = Math.ceil(maxRevenue / 1000) * 1000;
  const tickCount = 4;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => Math.round((maxTick / tickCount) * i));

  const svgWidth = 640;
  const svgHeight = 240;
  const marginLeft = 85;
  const marginRight = 20;
  const marginTop = 20;
  const marginBottom = 35;

  const chartWidth = svgWidth - marginLeft - marginRight;
  const chartHeight = svgHeight - marginTop - marginBottom;

  const barSlotWidth = dailyMetrics.length > 0 ? chartWidth / dailyMetrics.length : 0;
  const barWidth = Math.min(38, barSlotWidth * 0.6);

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
      <div style={{ marginBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#0f172a", margin: 0 }}>
          Daily Revenue
        </h3>
        <span style={{ fontSize: "0.875rem", color: "#64748b", fontVariantNumeric: "tabular-nums" }}>
          Total: {etb(summary?.totalRevenue)}
        </span>
      </div>

      <div
        style={{
          height: "280px",
          width: "100%",
          position: "relative"
        }}
        role="img"
        aria-label={`Revenue bar chart in ETB for ${summary?.rangeLabel || "the selected period"}`}
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
                  {etb(tickVal)}
                </text>
              </g>
            );
          })}

          {dailyMetrics.map((day, index) => {
            const barHeight = maxTick > 0 ? (day.revenue / maxTick) * chartHeight : 0;
            const xCenter = marginLeft + index * barSlotWidth + barSlotWidth / 2;
            const x = xCenter - barWidth / 2;
            const y = marginTop + chartHeight - barHeight;

            return (
              <g key={day.dateKey}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={Math.max(barHeight, 2)}
                  rx="4"
                  fill="#2563eb"
                  opacity="0.9"
                />
                {day.revenue > 0 && (
                  <text
                    x={xCenter}
                    y={Math.max(y - 6, marginTop + 10)}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#1e293b"
                    fontWeight="500"
                    fontFamily="sans-serif"
                  >
                    {etb(day.revenue)}
                  </text>
                )}
                <text
                  x={xCenter}
                  y={svgHeight - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#475569"
                  fontFamily="sans-serif"
                >
                  {day.displayDate}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
