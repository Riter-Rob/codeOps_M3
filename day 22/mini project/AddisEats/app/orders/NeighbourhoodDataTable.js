export default function NeighbourhoodDataTable({ data = [], totalRevenue = 0, totalOrders = 0 }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5dcc3",
        borderRadius: "20px",
        padding: "1.25rem",
        marginTop: "1rem",
        boxShadow: "0 2px 8px rgba(24, 84, 42, 0.04)"
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.875rem",
          color: "#1f2937"
        }}
      >
        <caption
          style={{
            captionSide: "top",
            textAlign: "left",
            fontWeight: "700",
            fontSize: "0.95rem",
            color: "#18542a",
            marginBottom: "0.75rem"
          }}
        >
          Revenue by Neighbourhood Breakdown (Accessible Table)
        </caption>
        <thead>
          <tr style={{ borderBottom: "2px solid #e5dcc3", backgroundColor: "#fcf9f0" }}>
            <th
              scope="col"
              style={{
                textAlign: "left",
                padding: "0.625rem 0.75rem",
                fontWeight: "700",
                color: "#18542a"
              }}
            >
              Neighbourhood
            </th>
            <th
              scope="col"
              style={{
                textAlign: "right",
                padding: "0.625rem 0.75rem",
                fontWeight: "700",
                color: "#18542a"
              }}
            >
              Order Count
            </th>
            <th
              scope="col"
              style={{
                textAlign: "right",
                padding: "0.625rem 0.75rem",
                fontWeight: "700",
                color: "#18542a"
              }}
            >
              Revenue (ETB)
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.neighbourhood} style={{ borderBottom: "1px solid #f3e8cc" }}>
              <td style={{ padding: "0.625rem 0.75rem", fontWeight: "600", color: "#1f2937" }}>
                {item.neighbourhood}
              </td>
              <td
                style={{
                  padding: "0.625rem 0.75rem",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums"
                }}
              >
                {item.orderCount}
              </td>
              <td
                style={{
                  padding: "0.625rem 0.75rem",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: "600"
                }}
              >
                {`${item.revenue.toLocaleString()} ETB`}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ borderTop: "2px solid #e5dcc3", backgroundColor: "#fcf9f0", fontWeight: "700" }}>
            <td style={{ padding: "0.625rem 0.75rem", color: "#18542a" }}>
              Total
            </td>
            <td
              style={{
                padding: "0.625rem 0.75rem",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
                color: "#18542a"
              }}
            >
              {totalOrders}
            </td>
            <td
              style={{
                padding: "0.625rem 0.75rem",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
                color: "#18542a"
              }}
            >
              {`${totalRevenue.toLocaleString()} ETB`}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
