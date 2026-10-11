import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { signOut } from "./actions/auth";

export const metadata = {
  title: "Home",
  description: "Welcome to Addis Eats. Order freshly cooked authentic Ethiopian dishes, stews, and cultural books.",
};

export default async function Home() {
  const session = await getSession();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to Addis Eats</h1>

      <div style={{ margin: "1.5rem 0", maxWidth: "800px" }}>
        <Image
          src="/hero.jpg"
          alt="Addis Eats and Books"
          width={800}
          height={400}
          priority
          sizes="(max-width: 768px) 100vw, 800px"
          style={{ width: "100%", height: "auto", borderRadius: "8px", display: "block" }}
        />
      </div>

      <div style={{ margin: "1rem 0", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
        {session ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span>Signed in as: <strong>{session.name}</strong> ({session.role})</span>
            <form action={signOut}>
              <button
                type="submit"
                style={{
                  padding: "4px 10px",
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <div>
            <span>Not signed in. </span>
            <Link href="/sign-in" style={{ color: "#2563eb", fontWeight: "600" }}>Sign In here</Link>
          </div>
        )}
      </div>

      <nav style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
        <Link href="/menu">Menu & Search</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/order-status">Order Status</Link>
        <Link href="/checkout">Checkout</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/kitchen">Kitchen (Staff)</Link>
      </nav>
    </div>
  );
}
