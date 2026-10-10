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
    <div style={{ padding: "2rem" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link href="/">Home</Link>{" | "}
        <Link href="/menu">Menu</Link>{" | "}
        <Link href="/orders">Orders</Link>
      </nav>
      <OrderStatus id={initialOrder?.id || "1"} fallbackData={initialOrder} />
    </div>
  );
}
