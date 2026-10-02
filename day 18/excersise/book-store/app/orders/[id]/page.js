import { orders } from "@/app/data/orders";
import OrderStatus from "../OrderStatus";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const session = await getSession();
  const order = orders.find((o) => String(o.id) === String(id));

  if (!order) {
    return notFound();
  }

  if (session && order.sessionId && order.sessionId !== session.id && session.role !== "staff") {
    return (
      <div style={{ padding: "2rem" }}>
        <h1 style={{ color: "#dc2626" }}>Access Denied</h1>
        <p>You cannot view orders from another account.</p>
        <Link href="/orders">&larr; Back to your orders</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link href="/orders">&larr; Back to orders</Link>
      </nav>
      <OrderStatus id={id} fallbackData={order} />
    </div>
  );
}
