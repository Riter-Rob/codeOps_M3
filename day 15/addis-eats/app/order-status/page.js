import { orders } from "../data/orders";
import OrderStatus from "../orders/OrderStatus";
import Link from "next/link";

export const metadata = {
  title: "Order Status",
  description: "Track cooking progress and delivery updates for your Addis Eats meals.",
  alternates: {
    canonical: "/order-status",
  },
};

export default async function OrderStatusPage() {
  const initialOrder = orders[0];

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

      <OrderStatus id={initialOrder?.id || "1"} fallbackData={initialOrder} />
    </div>
  );
}
