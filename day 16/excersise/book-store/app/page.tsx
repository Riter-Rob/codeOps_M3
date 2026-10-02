import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to Addis Eats</h1>
      <nav style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Link href="/menu">Menu & Search</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/order-status">Order Status</Link>
        <Link href="/checkout">Checkout</Link>
        <Link href="/cart">Cart</Link>
      </nav>
    </div>
  );
}
