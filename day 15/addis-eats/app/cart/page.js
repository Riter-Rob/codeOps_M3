import Link from "next/link";

export const metadata = {
  title: "Shopping Cart",
  description: "Review your selected Ethiopian dishes, update order quantities, and proceed to checkout.",
  alternates: {
    canonical: "/cart",
  },
};

export default function Cart() {
  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span style={{ color: "var(--color-text-muted)" }}>Shopping Cart</span>
      </nav>

      <h1>Your Selected Dishes</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.75rem" }}>
        Review your authentic Ethiopian culinary selections before placing your delivery order.
      </p>

      <div className="card" style={{ padding: "2.5rem", textAlign: "center" }}>
        <p style={{ margin: "0 0 1.5rem 0", color: "var(--color-text-muted)", fontSize: "1rem" }}>
          Ready to finalize your banquet? Select your delivery destination and confirm payment.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/menu" className="btn btn-secondary">
            Browse Specialties
          </Link>
          <Link href="/checkout" className="btn btn-primary">
            Proceed to Checkout &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}