import { orders } from "../data/orders";
import OrderStatus from "../orders/OrderStatus";
import Link from "next/link";

export const metadata = {
  title: "Live Order Status",
  description: "Track real-time cooking progress and estimated delivery times for your Addis Eats meals.",
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
        <span style={{ color: "var(--color-text-muted)" }}>Order Tracking</span>
      </nav>

      <div style={{ marginBottom: "1.5rem" }}>
        <h1>Live Order Tracking</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
          Real-time fulfillment updates streamed directly from our kitchen queue.
        </p>
      </div>

      <OrderStatus id={initialOrder?.id || "1"} fallbackData={initialOrder} />
    </div>
  );
}
