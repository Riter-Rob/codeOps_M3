import { orders } from "@/app/data/orders";
import OrderStatus from "../OrderStatus";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const initialOrder = orders.find((o) => String(o.id) === String(id));

  if (!initialOrder) {
    return notFound();
  }

  return (
    <div style={{ padding: "2rem" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link href="/orders">&larr; Back to orders</Link>
      </nav>
      <OrderStatus id={id} fallbackData={initialOrder} />
    </div>
  );
}
