import Link from "next/link";

export default function OrderTable({
  orders = [],
  totalCount = 0,
  currentPage = 1,
  pageSize = 5,
  sortKey = "date",
  sortDir = "desc",
  stateParam = null
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const startIndex = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalCount);

  function createSortHref(targetKey) {
    const nextDir = sortKey === targetKey && sortDir === "asc" ? "desc" : "asc";
    const params = new URLSearchParams();
    params.set("sort", targetKey);
    params.set("dir", nextDir);
    params.set("page", "1");
    if (stateParam) {
      params.set("state", stateParam);
    }
    return `/orders?${params.toString()}`;
  }

  function createPageHref(targetPage) {
    const params = new URLSearchParams();
    params.set("page", String(targetPage));
    params.set("sort", sortKey);
    params.set("dir", sortDir);
    if (stateParam) {
      params.set("state", stateParam);
    }
    return `/orders?${params.toString()}`;
  }

  function getAriaSort(columnKey) {
    if (sortKey !== columnKey) return "none";
    return sortDir === "asc" ? "ascending" : "descending";
  }

  function renderSortIndicator(columnKey) {
    if (sortKey !== columnKey) {
      return (
        <span aria-hidden="true" style={{ color: "#9ca3af", marginLeft: "4px" }}>
          &#x21C5;
        </span>
      );
    }
    return (
      <span aria-hidden="true" style={{ color: "#18542a", marginLeft: "4px" }}>
        {sortDir === "asc" ? "\u25B2" : "\u25BC"}
      </span>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5dcc3",
        borderRadius: "20px",
        padding: "1.25rem",
        marginTop: "1.5rem",
        boxShadow: "0 2px 8px rgba(24, 84, 42, 0.04)"
      }}
    >
      <div style={{ overflowX: "auto" }}>
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
              fontSize: "1.1rem",
              color: "#18542a",
              marginBottom: "0.875rem"
            }}
          >
            Customer Orders and Fulfillment Details
          </caption>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5dcc3", backgroundColor: "#fcf9f0" }}>
              <th
                scope="col"
                style={{
                  textAlign: "left",
                  padding: "0.75rem 0.875rem",
                  fontWeight: "700",
                  color: "#18542a"
                }}
              >
                Order ID
              </th>
              <th
                scope="col"
                aria-sort={getAriaSort("date")}
                style={{
                  textAlign: "left",
                  padding: "0.75rem 0.875rem",
                  fontWeight: "700",
                  color: "#18542a"
                }}
              >
                <Link
                  href={createSortHref("date")}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center"
                  }}
                >
                  Date
                  {renderSortIndicator("date")}
                </Link>
              </th>
              <th
                scope="col"
                aria-sort={getAriaSort("name")}
                style={{
                  textAlign: "left",
                  padding: "0.75rem 0.875rem",
                  fontWeight: "700",
                  color: "#18542a"
                }}
              >
                <Link
                  href={createSortHref("name")}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center"
                  }}
                >
                  Customer
                  {renderSortIndicator("name")}
                </Link>
              </th>
              <th
                scope="col"
                aria-sort={getAriaSort("area")}
                style={{
                  textAlign: "left",
                  padding: "0.75rem 0.875rem",
                  fontWeight: "700",
                  color: "#18542a"
                }}
              >
                <Link
                  href={createSortHref("area")}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center"
                  }}
                >
                  Neighbourhood
                  {renderSortIndicator("area")}
                </Link>
              </th>
              <th
                scope="col"
                aria-sort={getAriaSort("status")}
                style={{
                  textAlign: "left",
                  padding: "0.75rem 0.875rem",
                  fontWeight: "700",
                  color: "#18542a"
                }}
              >
                <Link
                  href={createSortHref("status")}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center"
                  }}
                >
                  Status
                  {renderSortIndicator("status")}
                </Link>
              </th>
              <th
                scope="col"
                aria-sort={getAriaSort("total")}
                style={{
                  textAlign: "right",
                  padding: "0.75rem 0.875rem",
                  fontWeight: "700",
                  color: "#18542a"
                }}
              >
                <Link
                  href={createSortHref("total")}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "100%"
                  }}
                >
                  Total (ETB)
                  {renderSortIndicator("total")}
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: "1px solid #f3e8cc" }}>
                <td style={{ padding: "0.75rem 0.875rem", fontWeight: "600" }}>
                  <Link
                    href={`/orders/${order.id}`}
                    style={{ color: "#18542a", textDecoration: "none" }}
                  >
                    {order.id}
                  </Link>
                </td>
                <td style={{ padding: "0.75rem 0.875rem", color: "#6b7280" }}>
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </td>
                <td style={{ padding: "0.75rem 0.875rem", color: "#1f2937", fontWeight: "600" }}>
                  {order.name}
                </td>
                <td style={{ padding: "0.75rem 0.875rem", color: "#4b5563" }}>
                  {order.area}
                </td>
                <td style={{ padding: "0.75rem 0.875rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      textTransform: "capitalize",
                      backgroundColor:
                        order.status === "delivered"
                          ? "#dcfce7"
                          : order.status === "ready"
                          ? "#e0e7ff"
                          : order.status === "cooking"
                          ? "#fef3c7"
                          : order.status === "cancelled"
                          ? "#fee2e2"
                          : "#f1f5f9",
                      color:
                        order.status === "delivered"
                          ? "#15803d"
                          : order.status === "ready"
                          ? "#3730a3"
                          : order.status === "cooking"
                          ? "#b45309"
                          : order.status === "cancelled"
                          ? "#b91c1c"
                          : "#475569"
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td
                  style={{
                    padding: "0.75rem 0.875rem",
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: "700",
                    color: "#18542a"
                  }}
                >
                  {`${order.total?.toLocaleString()} ETB`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav
        aria-label="Orders table pagination"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "1.25rem",
          paddingTop: "1rem",
          borderTop: "1px solid #e5dcc3"
        }}
      >
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#6b7280" }}>
          Showing <strong>{startIndex}</strong> to <strong>{endIndex}</strong> of <strong>{totalCount}</strong> orders
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          {currentPage > 1 ? (
            <Link
              href={createPageHref(currentPage - 1)}
              style={{
                padding: "0.375rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid #e5dcc3",
                backgroundColor: "#ffffff",
                color: "#18542a",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "600"
              }}
            >
              Previous
            </Link>
          ) : (
            <span
              aria-disabled="true"
              style={{
                padding: "0.375rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid #f3e8cc",
                backgroundColor: "#fcf9f0",
                color: "#9ca3af",
                fontSize: "0.875rem",
                cursor: "not-allowed"
              }}
            >
              Previous
            </span>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isCurrent = p === currentPage;
            return (
              <Link
                key={p}
                href={createPageHref(p)}
                aria-current={isCurrent ? "page" : undefined}
                style={{
                  padding: "0.375rem 0.75rem",
                  borderRadius: "8px",
                  border: isCurrent ? "1px solid #18542a" : "1px solid #e5dcc3",
                  backgroundColor: isCurrent ? "#18542a" : "#ffffff",
                  color: isCurrent ? "#ffffff" : "#18542a",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: isCurrent ? "700" : "500"
                }}
              >
                {p}
              </Link>
            );
          })}

          {currentPage < totalPages ? (
            <Link
              href={createPageHref(currentPage + 1)}
              style={{
                padding: "0.375rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid #e5dcc3",
                backgroundColor: "#ffffff",
                color: "#18542a",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "600"
              }}
            >
              Next
            </Link>
          ) : (
            <span
              aria-disabled="true"
              style={{
                padding: "0.375rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid #f3e8cc",
                backgroundColor: "#fcf9f0",
                color: "#9ca3af",
                fontSize: "0.875rem",
                cursor: "not-allowed"
              }}
            >
              Next
            </span>
          )}
        </div>
      </nav>
    </div>
  );
}
