import Link from "next/link";
import { redirect } from "next/navigation";
import { orders } from "../data/orders";
import { getSession } from "@/lib/auth";
import OrdersEmptyState from "./OrdersEmptyState";
import NeighbourhoodBarChart from "./NeighbourhoodBarChart";
import OrdersOverTimeLineChart from "./OrdersOverTimeLineChart";
import NeighbourhoodDataTable from "./NeighbourhoodDataTable";
import OrdersTimeDataTable from "./OrdersTimeDataTable";
import OrderTable from "./OrderTable";
import OrdersLoading from "./loading";
import OrdersError from "./error";
import { etb } from "@/lib/format";
import CsvExportButton from "./CsvExportButton";

export const metadata = {
  title: "Order Dashboard & Analytics",
  description: "View neighbourhood revenue distribution, order trends, and itemized customer receipts.",
  alternates: {
    canonical: "/orders",
  },
};

export default async function OrdersPage({ searchParams }) {
  const params = await searchParams;
  const forcedState = params?.state || null;
  const currentPage = Math.max(1, parseInt(params?.page || "1", 10) || 1);
  const sortKey = params?.sort || "date";
  const sortDir = params?.dir === "asc" ? "asc" : "desc";

  if (forcedState === "error") {
    return (
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <StateSwitcher activeState={forcedState} />
        <OrdersError
          error={{ message: "Demonstration error: Simulated failure while reading live kitchen order transactions." }}
        />
      </div>
    );
  }

  if (forcedState === "loading") {
    return (
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <StateSwitcher activeState={forcedState} />
        <OrdersLoading />
      </div>
    );
  }

  const session = await getSession();

  if (!session) {
    redirect("/sign-in?next=/orders");
  }

  const allOrders = session?.role === "staff"
    ? orders
    : orders.filter((o) => o.sessionId === session.id || o.userId === session.id);

  if (forcedState === "empty" || allOrders.length === 0) {
    return (
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <nav className="breadcrumbs" aria-label="Breadcrumbs">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <span style={{ color: "#6b7280" }}>Orders</span>
        </nav>

        <StateSwitcher activeState={forcedState || "empty"} />

        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: 0 }}>Addis Eats Dashboard</h1>
          <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>
            Signed in as <strong>{session.name}</strong> ({session.role})
          </p>
        </div>

        <OrdersEmptyState isForced={forcedState === "empty"} />
      </div>
    );
  }

  const neighbourhoods = ["Bole", "Kazanchis", "Piassa", "Sarbet", "Gerji", "CMC"];
  const revenueByNeighbourhood = neighbourhoods.map((area) => {
    const areaOrders = allOrders.filter((o) => o.area === area);
    const revenue = areaOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    return {
      neighbourhood: area,
      revenue,
      orderCount: areaOrders.length
    };
  });

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

  const ordersOverTime = daysList.map((day) => {
    const dayStart = day.timestamp;
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;

    const matchedOrders = allOrders.filter((order) => {
      const orderTime = new Date(order.createdAt).getTime();
      return orderTime >= dayStart && orderTime < dayEnd;
    });

    const revenue = matchedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    return {
      dateKey: day.dateKey,
      displayDate: day.displayDate,
      dayName: day.dayName,
      orderCount: matchedOrders.length,
      revenue
    };
  });

  const totalRevenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = allOrders.length;
  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const summary = {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    revenueByNeighbourhood,
    ordersOverTime,
    rangeLabel: "Past 7 Days",
    timeUnit: "Orders"
  };

  const sortedOrders = [...allOrders].sort((a, b) => {
    let comparison = 0;
    if (sortKey === "total") {
      comparison = (a.total || 0) - (b.total || 0);
    } else if (sortKey === "name") {
      comparison = (a.name || "").localeCompare(b.name || "");
    } else if (sortKey === "area") {
      comparison = (a.area || "").localeCompare(b.area || "");
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
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span style={{ color: "#6b7280" }}>Orders</span>
      </nav>

      <StateSwitcher activeState={forcedState || "populated"} />

      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.75rem",
          background: "transparent",
          color: "inherit",
          padding: 0
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Addis Eats Dashboard</h1>
          <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>
            Signed in as <strong>{session.name}</strong> ({session.role})
          </p>
        </div>
        <CsvExportButton orders={allOrders} />
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
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5dcc3", borderRadius: "20px", padding: "1.25rem", boxShadow: "0 2px 8px rgba(24, 84, 42, 0.04)" }}>
          <span style={{ fontSize: "0.85rem", color: "#6b7280", display: "block", marginBottom: "0.35rem" }}>
            Total Revenue
          </span>
          <strong style={{ fontSize: "1.5rem", color: "#18542a", fontVariantNumeric: "tabular-nums" }}>
            {etb(summary.totalRevenue)}
          </strong>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5dcc3", borderRadius: "20px", padding: "1.25rem", boxShadow: "0 2px 8px rgba(24, 84, 42, 0.04)" }}>
          <span style={{ fontSize: "0.85rem", color: "#6b7280", display: "block", marginBottom: "0.35rem" }}>
            Total Orders
          </span>
          <strong style={{ fontSize: "1.5rem", color: "#18542a", fontVariantNumeric: "tabular-nums" }}>
            {summary.totalOrders}
          </strong>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5dcc3", borderRadius: "20px", padding: "1.25rem", boxShadow: "0 2px 8px rgba(24, 84, 42, 0.04)" }}>
          <span style={{ fontSize: "0.85rem", color: "#6b7280", display: "block", marginBottom: "0.35rem" }}>
            Average Order Value
          </span>
          <strong style={{ fontSize: "1.5rem", color: "#18542a", fontVariantNumeric: "tabular-nums" }}>
            {etb(summary.averageOrderValue)}
          </strong>
        </div>
      </section>

      <section
        aria-label="Analytics charts"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
          gap: "1.5rem",
          marginBottom: "1.5rem"
        }}
      >
        <div>
          <NeighbourhoodBarChart summary={summary} />
          <NeighbourhoodDataTable
            data={summary.revenueByNeighbourhood}
            totalRevenue={summary.totalRevenue}
            totalOrders={summary.totalOrders}
          />
        </div>

        <div>
          <OrdersOverTimeLineChart summary={summary} />
          <OrdersTimeDataTable
            data={summary.ordersOverTime}
            totalOrders={summary.totalOrders}
            totalRevenue={summary.totalRevenue}
          />
        </div>
      </section>

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
        border: "1px solid #e5dcc3",
        borderRadius: "16px",
        fontSize: "0.8125rem",
        boxShadow: "0 2px 8px rgba(24, 84, 42, 0.04)"
      }}
    >
      <span style={{ fontWeight: "700", color: "#18542a" }}>Demonstrate States:</span>
      {states.map((s) => {
        const isActive = activeState === s.key || (!activeState && s.key === "populated");
        return (
          <Link
            key={s.key}
            href={s.href}
            style={{
              padding: "0.3rem 0.75rem",
              borderRadius: "9999px",
              border: isActive ? "1px solid #18542a" : "1px solid #e5dcc3",
              backgroundColor: isActive ? "#18542a" : "#fcf9f0",
              color: isActive ? "#ffffff" : "#4b5563",
              textDecoration: "none",
              fontWeight: isActive ? "700" : "500",
              transition: "all 0.15s ease"
            }}
          >
            {s.label}
          </Link>
        );
      })}
    </div>
  );
}
