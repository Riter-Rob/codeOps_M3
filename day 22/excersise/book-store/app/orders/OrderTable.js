import Link from "next/link";
import { etb, when } from "@/lib/format";
import CsvExportButton from "./CsvExportButton";

export default function OrderTable({
  orders = [],
  allOrders = [],
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
        <span aria-hidden="true" style={{ color: "#94a3b8", marginLeft: "4px" }}>
          &#x21C5;
        </span>
      );
    }
    return (
      <span aria-hidden="true" style={{ color: "#2563eb", marginLeft: "4px" }}>
        {sortDir === "asc" ? "\u25B2" : "\u25BC"}
      </span>
    );
  }

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.875rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#0f172a", margin: 0 }}>
          Customer Orders Log
        </h2>
        <CsvExportButton orders={allOrders.length > 0 ? allOrders : orders} />
      </div>

      <div style={{ overflowX: "auto" }}>
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
              fontSize: "0.875rem",
              color: "#64748b",
              marginBottom: "0.5rem"
            }}
          >
            Customer Orders and Fulfillment Details
          </caption>
          <thead>
            <tr style={{ borderBottom: "2px solid #cbd5e1", backgroundColor: "#f8fafc" }}>
              <th
                scope="col"
                style={{
                  textAlign: "left",
                  padding: "0.75rem 0.875rem",
                  fontWeight: "600",
                  color: "#334155"
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
                  fontWeight: "600",
                  color: "#334155"
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
                  fontWeight: "600",
                  color: "#334155"
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
                style={{
                  textAlign: "left",
                  padding: "0.75rem 0.875rem",
                  fontWeight: "600",
                  color: "#334155"
                }}
              >
                Area
              </th>
              <th
                scope="col"
                aria-sort={getAriaSort("status")}
                style={{
                  textAlign: "left",
                  padding: "0.75rem 0.875rem",
                  fontWeight: "600",
                  color: "#334155"
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
                style={{
                  textAlign: "left",
                  padding: "0.75rem 0.875rem",
                  fontWeight: "600",
                  color: "#334155"
                }}
              >
                Tracking
              </th>
              <th
                scope="col"
                aria-sort={getAriaSort("total")}
                style={{
                  textAlign: "right",
                  padding: "0.75rem 0.875rem",
                  fontWeight: "600",
                  color: "#334155"
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
              <tr key={order.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "0.75rem 0.875rem", fontWeight: "500" }}>
                  <Link
                    href={`/orders/${order.id}`}
                    style={{ color: "#2563eb", textDecoration: "none" }}
                  >
                    {order.id}
                  </Link>
                </td>
                <td style={{ padding: "0.75rem 0.875rem", color: "#475569" }}>
                  {when(order.createdAt)}
                </td>
                <td style={{ padding: "0.75rem 0.875rem", color: "#1e293b", fontWeight: "500" }}>
                  {order.name}
                </td>
                <td style={{ padding: "0.75rem 0.875rem", color: "#475569" }}>
                  {order.area}
                </td>
                <td style={{ padding: "0.75rem 0.875rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      backgroundColor:
                        order.status === "delivered"
                          ? "#dcfce7"
                          : order.status === "ready"
                          ? "#e0e7ff"
                          : order.status === "out_for_delivery"
                          ? "#dbeafe"
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
                          : order.status === "out_for_delivery"
                          ? "#1e40af"
                          : order.status === "cooking"
                          ? "#b45309"
                          : order.status === "cancelled"
                          ? "#b91c1c"
                          : "#475569"
                    }}
                  >
                    {order.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td style={{ padding: "0.75rem 0.875rem" }}>
                  <Link
                    href={`/order-status?id=${order.id}`}
                    style={{
                      fontSize: "0.8125rem",
                      color: "#2563eb",
                      textDecoration: "none",
                      fontWeight: "500"
                    }}
                  >
                    Live Map &rarr;
                  </Link>
                </td>
                <td
                  style={{
                    padding: "0.75rem 0.875rem",
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: "600",
                    color: "#0f172a"
                  }}
                >
                  {etb(order.total)}
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
          borderTop: "1px solid #e2e8f0"
        }}
      >
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#64748b" }}>
          Showing <strong>{startIndex}</strong> to <strong>{endIndex}</strong> of <strong>{totalCount}</strong> orders
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          {currentPage > 1 ? (
            <Link
              href={createPageHref(currentPage - 1)}
              style={{
                padding: "0.375rem 0.75rem",
                borderRadius: "4px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                color: "#1e293b",
                textDecoration: "none",
                fontSize: "0.875rem"
              }}
            >
              Previous
            </Link>
          ) : (
            <span
              aria-disabled="true"
              style={{
                padding: "0.375rem 0.75rem",
                borderRadius: "4px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#f8fafc",
                color: "#94a3b8",
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
                  borderRadius: "4px",
                  border: isCurrent ? "1px solid #2563eb" : "1px solid #cbd5e1",
                  backgroundColor: isCurrent ? "#2563eb" : "#ffffff",
                  color: isCurrent ? "#ffffff" : "#1e293b",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: isCurrent ? "600" : "400"
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
                borderRadius: "4px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                color: "#1e293b",
                textDecoration: "none",
                fontSize: "0.875rem"
              }}
            >
              Next
            </Link>
          ) : (
            <span
              aria-disabled="true"
              style={{
                padding: "0.375rem 0.75rem",
                borderRadius: "4px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#f8fafc",
                color: "#94a3b8",
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
