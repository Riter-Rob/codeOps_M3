import { orders } from "@/app/data/orders";
import LiveOrderStatus from "./LiveOrderStatus";
import Link from "next/link";

export const metadata = {
  title: "Live Order Status & Delivery Map",
  description: "Track real-time courier movement, SSE connection indicators, and delivery progress for your Addis Eats orders.",
};

export default async function OrderStatusPage({ searchParams }) {
  const params = await searchParams;
  const orderId = params?.id || "ord_101";
  const initialOrder = orders.find((o) => String(o.id) === String(orderId)) || orders[0];

  return (
    <div style={{ padding: "2rem" }}>
      <nav style={{ marginBottom: "1.25rem" }}>
        <Link href="/">Home</Link>{" | "}
        <Link href="/menu">Menu</Link>{" | "}
        <Link href="/orders">Orders</Link>{" | "}
        <Link href="/order-status">Live Status</Link>
      </nav>

      <LiveOrderStatus initialOrder={initialOrder} />
    </div>
  );
}
