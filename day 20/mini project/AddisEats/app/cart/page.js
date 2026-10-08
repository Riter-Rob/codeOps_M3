import Link from "next/link";

export const metadata = {
  title: "Cart",
  description: "Review your selected Ethiopian dishes and proceed to checkout.",
  alternates: {
    canonical: "/cart",
  },
};

export default function Cart() {
  return (
    <div style={{ maxWidth: "560px", margin: "0 auto" }}>
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span style={{ color: "#6b7280" }}>Cart</span>
      </nav>

      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0 }}>Your Cart</h1>
        <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>
          Review your items before ordering.
        </p>
      </div>

      <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", borderBottom: "1px solid #f3f4f6" }}>
          <div>
            <strong style={{ color: "#111827", fontSize: "0.9375rem" }}>Doro Wat</strong>
            <p style={{ margin: "0.15rem 0 0", fontSize: "0.8125rem", color: "#6b7280" }}>With boiled egg & teff injera</p>
          </div>
          <span style={{ fontWeight: 600, color: "#111827" }} className="tabular">320 ETB</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid #f3f4f6" }}>
          <div>
            <strong style={{ color: "#111827", fontSize: "0.9375rem" }}>Beyainatu (Fasting)</strong>
            <p style={{ margin: "0.15rem 0 0", fontSize: "0.8125rem", color: "#6b7280" }}>Vegetarian combination platter</p>
          </div>
          <span style={{ fontWeight: 600, color: "#111827" }} className="tabular">220 ETB</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid #e5e7eb", fontSize: "0.875rem", color: "#6b7280" }}>
          <span>Delivery (Addis Ababa)</span>
          <span className="tabular">50 ETB</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", fontSize: "1.0625rem" }}>
          <strong style={{ color: "#111827" }}>Total</strong>
          <strong style={{ color: "#b91c1c" }} className="tabular">590 ETB</strong>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
          <Link href="/menu" className="btn btn-secondary" style={{ flex: 1 }}>
            + Add Dishes
          </Link>
          <Link href="/checkout" className="btn btn-primary" style={{ flex: 1 }}>
            Checkout &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}