import { orders } from "../data/orders";
import LiveDeliveryTracking from "./LiveDeliveryTracking";

export const metadata = {
  title: "Delivery Tracking · Addis Eats",
  description: "Live Leaflet delivery map and real-time Server-Sent Events dispatch tracker for your order.",
  alternates: {
    canonical: "/order-status"
  }
};

export default async function OrderStatusPage({ searchParams }) {
  const params = await searchParams;
  const targetId = params?.id || "ord_201";

  const order = orders.find((o) => String(o.id) === String(targetId)) || orders[0];

  return (
    <main style={{ padding: "1.5rem 1rem", minHeight: "85vh" }}>
      <LiveDeliveryTracking initialOrder={order} />
    </main>
  );
}
