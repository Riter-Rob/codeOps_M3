import { orders } from "../data/orders";
import OrderStatus from "../orders/OrderStatus";
import Link from "next/link";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Order Status",
  description: "Track cooking progress and delivery updates for your Addis Eats meals.",
  alternates: {
    canonical: "/order-status",
  },
};

export default async function OrderStatusPage({ searchParams }) {
  const resolvedParams = searchParams ? await searchParams : {};
  const queryId = resolvedParams?.id;
  const session = await getSession();

  const userOrders = session
    ? orders.filter((o) => o.sessionId === session.id || o.userId === session.id)
    : [];

  let currentOrder = orders[0];
  if (queryId) {
    const matched = orders.find((o) => String(o.id) === String(queryId));
    if (matched) currentOrder = matched;
  } else if (userOrders.length > 0) {
    currentOrder = userOrders[userOrders.length - 1];
  }

  return (
    <div>
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span style={{ color: "#6b7280" }}>Status</span>
      </nav>

      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0 }}>Order Status</h1>
        <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>
          Live updates from the kitchen.
        </p>
      </div>

      <OrderStatus id={currentOrder?.id || "1"} fallbackData={currentOrder} />
    </div>
  );
}
