import Link from "next/link";
import { orders } from "../data/orders";
import { getSession } from "@/lib/auth";
import OrdersEmptyState from "./OrdersEmptyState";
import RevenueBarChart from "./RevenueBarChart";
import OrdersLineChart from "./OrdersLineChart";
import ChartDataTable from "./ChartDataTable";
import OrderTable from "./OrderTable";
import OrdersLoading from "./loading";
import OrdersError from "./error";

export const metadata = {
  title: "Order History & Analytics",
  description: "Aggregated order volume, ETB revenue metrics, fulfillment status, and order transactions.",
};

export default async function OrdersPage({ searchParams }) {
  const params = await searchParams;
  const forcedState = params?.state || null;
  const currentPage = Math.max(1, parseInt(params?.page || "1", 10) || 1);
  const sortKey = params?.sort || "date";
  const sortDir = params?.dir === "asc" ? "asc" : "desc";

  if (forcedState === "error") {
    return (
      <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <StateSwitcher activeState={forcedState} />
        <OrdersError
          error={{ message: "Demonstration error: Simulated database failure while reading order stream." }}
        />
      </div>
    );
  }

  if (forcedState === "loading") {
    return (
      <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <StateSwitcher activeState={forcedState} />
        <OrdersLoading />
      </div>
    );
  }

  const session = await getSession();
  const allOrders = session?.role === "staff"
    ? orders
    : orders.filter((o) => o.sessionId === session?.id || o.userId === session?.id || !session);

  if (forcedState === "empty" || allOrders.length === 0) {
    return (
      <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <nav style={{ marginBottom: "1.25rem" }}>
          <Link href="/">Home</Link>{" | "}
          <Link href="/menu">Menu</Link>{" | "}
          <Link href="/orders">Orders</Link>{" | "}
          <Link href="/kitchen">Kitchen</Link>
        </nav>

        <StateSwitcher activeState={forcedState || "empty"} />

        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.25rem" }}>
            Orders & Revenue Analytics
          </h1>
          {session && (
            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
              Signed in as <strong>{session.name}</strong> ({session.role})
            </p>
          )}
        </div>

        <OrdersEmptyState isForced={forcedState === "empty"} />
      </div>
    );
  }

  const now = new Date();
  const daysList = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const dateKey = d.toISOString().slice(0, 10);
    const displayDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    daysList.push({ dateKey, displayDate, dayName, timestamp: d.getTime() });
  }

  const dailyMetrics = daysList.map((day) => {
    const dayStart = day.timestamp;
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;

    const matchedOrders = allOrders.filter((order) => {
      const orderTime = new Date(order.createdAt).getTime();
      return orderTime >= dayStart && orderTime < dayEnd;
    });

    const revenue = matchedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const orderCount = matchedOrders.length;

    return {
      dateKey: day.dateKey,
      displayDate: day.displayDate,
      dayName: day.dayName,
      revenue,
      orderCount
    };
  });

  const totalRevenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = allOrders.length;
  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const summary = {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    rangeLabel: "Past 7 Days",
    unit: "Orders",
    dailyMetrics
  };

  const sortedOrders = [...allOrders].sort((a, b) => {
    let comparison = 0;
    if (sortKey === "total") {
      comparison = (a.total || 0) - (b.total || 0);
    } else if (sortKey === "name") {
      comparison = (a.name || "").localeCompare(b.name || "");
    } else if (sortKey === "status") {
      comparison = (a.status || "").localeCompare(b.status || "");
    } else {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return sortDir === "asc" ? comparison : -comparison;
  });

  const pageSize = 5;
  const paginatedOrders = sortedOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <nav style={{ marginBottom: "1.25rem" }}>
        <Link href="/">Home</Link>{" | "}
        <Link href="/menu">Menu</Link>{" | "}
        <Link href="/orders">Orders</Link>{" | "}
        <Link href="/kitchen">Kitchen</Link>
      </nav>

      <StateSwitcher activeState={forcedState || "populated"} />

      <header style={{ marginBottom: "1.75rem", background: "transparent", color: "inherit", padding: 0 }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.25rem" }}>
          Orders & Revenue Analytics
        </h1>
        {session && (
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
            Signed in as <strong>{session.name}</strong> ({session.role})
          </p>
        )}
      </header>

      <section
        aria-label="High level performance metrics"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "1.75rem"
        }}
      >
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.25rem" }}>
          <span style={{ fontSize: "0.875rem", color: "#64748b", display: "block", marginBottom: "0.375rem" }}>
            Total Revenue
          </span>
          <strong style={{ fontSize: "1.5rem", color: "#0f172a", fontVariantNumeric: "tabular-nums" }}>
            {`${summary.totalRevenue.toLocaleString()} ETB`}
          </strong>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.25rem" }}>
          <span style={{ fontSize: "0.875rem", color: "#64748b", display: "block", marginBottom: "0.375rem" }}>
            Total Orders
          </span>
          <strong style={{ fontSize: "1.5rem", color: "#0f172a", fontVariantNumeric: "tabular-nums" }}>
            {summary.totalOrders}
          </strong>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.25rem" }}>
          <span style={{ fontSize: "0.875rem", color: "#64748b", display: "block", marginBottom: "0.375rem" }}>
            Average Order Value
          </span>
          <strong style={{ fontSize: "1.5rem", color: "#0f172a", fontVariantNumeric: "tabular-nums" }}>
            {`${summary.averageOrderValue.toLocaleString()} ETB`}
          </strong>
        </div>
      </section>

      <section
        aria-label="Order trend charts"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
          gap: "1.5rem"
        }}
      >
        <RevenueBarChart summary={summary} />
        <OrdersLineChart summary={summary} />
      </section>

      <ChartDataTable
        dailyMetrics={summary.dailyMetrics}
        totalOrders={summary.totalOrders}
        totalRevenue={summary.totalRevenue}
      />

      <OrderTable
        orders={paginatedOrders}
        totalCount={sortedOrders.length}
        currentPage={currentPage}
        pageSize={pageSize}
        sortKey={sortKey}
        sortDir={sortDir}
        stateParam={forcedState}
      />
    </div>
  );
}

function StateSwitcher({ activeState }) {
  const states = [
    { key: "populated", label: "Populated State", href: "/orders?state=populated" },
    { key: "empty", label: "Empty State", href: "/orders?state=empty" },
    { key: "loading", label: "Loading State", href: "/orders?state=loading" },
    { key: "error", label: "Error State", href: "/orders?state=error" }
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
        marginBottom: "1.5rem",
        padding: "0.75rem 1rem",
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        fontSize: "0.8125rem"
      }}
    >
      <span style={{ fontWeight: "600", color: "#475569" }}>Demonstrate States:</span>
      {states.map((s) => {
        const isActive = activeState === s.key || (!activeState && s.key === "populated");
        return (
          <Link
            key={s.key}
            href={s.href}
            style={{
              padding: "0.25rem 0.625rem",
              borderRadius: "4px",
              border: isActive ? "1px solid #2563eb" : "1px solid #cbd5e1",
              backgroundColor: isActive ? "#eff6ff" : "#ffffff",
              color: isActive ? "#1d4ed8" : "#475569",
              textDecoration: "none",
              fontWeight: isActive ? "600" : "400"
            }}
          >
            {s.label}
          </Link>
        );
      })}
    </div>
  );
}
