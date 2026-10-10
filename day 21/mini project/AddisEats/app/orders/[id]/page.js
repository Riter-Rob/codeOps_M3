import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { orders } from "@/app/data/orders";
import OrderStatus from "../OrderStatus";
import Link from "next/link";

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/sign-in?next=/orders/${id}`);
  }

  const order = orders.find((o) => String(o.id) === String(id));

  if (!order) {
    return notFound();
  }

  if (order.sessionId && order.sessionId !== session.id && session.role !== "staff") {
    return (
      <div style={{ maxWidth: "520px", margin: "2rem auto" }}>
        <div className="card" style={{ padding: "2.5rem" }}>
          <div style={{ color: "#d52518", fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.5rem" }}>
            Access Denied
          </div>
          <h1 style={{ fontSize: "1.75rem", margin: "0.5rem 0" }}>Protected Customer Order</h1>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "1.25rem" }}>
            This order ticket belongs to another customer account. You cannot inspect receipts or details across account boundaries.
          </p>
          <Link href="/orders" className="btn btn-primary">
            &larr; Return to Your Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <Link href="/orders">Orders</Link>
        <span className="separator">/</span>
        <span style={{ color: "var(--color-text-muted)" }}>Order #{id}</span>
      </nav>

      <div style={{ marginBottom: "1.5rem" }}>
        <h1>Order Receipt & Fulfillment</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
          Verified receipt for customer <strong>{order.name}</strong>.
        </p>
      </div>

      <OrderStatus id={id} fallbackData={order} />
    </div>
  );
}
