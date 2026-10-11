import { etb } from "@/lib/format";

export default function ChartDataTable({ dailyMetrics = [], totalOrders = 0, totalRevenue = 0 }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1.25rem",
        marginTop: "1.5rem"
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.875rem",
          color: "#1e293b"
        }}
      >
        <caption
          style={{
            captionSide: "top",
            textAlign: "left",
            fontWeight: "600",
            fontSize: "1rem",
            color: "#0f172a",
            marginBottom: "0.75rem"
          }}
        >
          Daily Chart Summary (Accessible Tabular View)
        </caption>
        <thead>
          <tr style={{ borderBottom: "2px solid #cbd5e1", backgroundColor: "#f8fafc" }}>
            <th
              scope="col"
              style={{
                textAlign: "left",
                padding: "0.625rem 0.75rem",
                fontWeight: "600",
                color: "#334155"
              }}
            >
              Date
            </th>
            <th
              scope="col"
              style={{
                textAlign: "right",
                padding: "0.625rem 0.75rem",
                fontWeight: "600",
                color: "#334155"
              }}
            >
              Orders Count (Unit: Orders)
            </th>
            <th
              scope="col"
              style={{
                textAlign: "right",
                padding: "0.625rem 0.75rem",
                fontWeight: "600",
                color: "#334155"
              }}
            >
              Daily Revenue (ETB)
            </th>
          </tr>
        </thead>
        <tbody>
          {dailyMetrics.map((day) => (
            <tr key={day.dateKey} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <td style={{ padding: "0.625rem 0.75rem", color: "#334155" }}>
                {day.displayDate} ({day.dayName})
              </td>
              <td
                style={{
                  padding: "0.625rem 0.75rem",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums"
                }}
              >
                {day.orderCount}
              </td>
              <td
                style={{
                  padding: "0.625rem 0.75rem",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums"
                }}
              >
                {etb(day.revenue)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ borderTop: "2px solid #cbd5e1", backgroundColor: "#f8fafc", fontWeight: "600" }}>
            <td style={{ padding: "0.625rem 0.75rem", color: "#0f172a" }}>
              Total
            </td>
            <td
              style={{
                padding: "0.625rem 0.75rem",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
                color: "#0f172a"
              }}
            >
              {totalOrders}
            </td>
            <td
              style={{
                padding: "0.625rem 0.75rem",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
                color: "#0f172a"
              }}
            >
              {etb(totalRevenue)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
