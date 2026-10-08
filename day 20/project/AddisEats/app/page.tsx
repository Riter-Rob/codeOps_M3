import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { signOut } from "./actions/auth";

export const metadata = {
  title: "Home",
  description: "Discover authentic Ethiopian cuisine at Addis Eats. Savor slow-simmered wats, sizzling tibs, and vibrant vegan platters.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const session = await getSession();

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1>Authentic Ethiopian Flavors, Prepared with Heritage</h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
          Savor traditional Ethiopian culinary mastery in Addis Ababa. From slow-simmered Doro Wat and sizzling Shekla Tibs to wholesome fasting platters, served fresh with authentic teff injera.
        </p>
      </div>

      <div
        style={{
          position: "relative",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-md)",
          marginBottom: "2.5rem",
          background: "var(--color-surface-subtle)",
        }}
      >
        <Image
          src="/hero.jpg"
          alt="Traditional Ethiopian culinary spread and fresh coffee banquet at Addis Eats"
          width={800}
          height={400}
          priority
          sizes="(max-width: 768px) 100vw, 800px"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          padding: "1.25rem 1.5rem",
          marginBottom: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          boxShadow: "var(--shadow-xs)",
        }}
      >
        {session ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <span style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>Current account: </span>
              <strong style={{ color: "var(--color-text)" }}>{session.name}</strong>{" "}
              <span className={`badge ${session.role === "staff" ? "badge-warning" : "badge-success"}`}>
                {session.role}
              </span>
            </div>
            <form action={signOut}>
              <button type="submit" className="btn btn-secondary" style={{ padding: "0.35rem 0.85rem", fontSize: "0.8125rem" }}>
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <span style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
                You are currently browsing as a guest.
              </span>
            </div>
            <Link href="/sign-in" className="btn btn-primary" style={{ padding: "0.45rem 1rem", fontSize: "0.875rem" }}>
              Sign In to Order
            </Link>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
        <Link
          href="/menu"
          className="card"
          style={{ textDecoration: "none", display: "block" }}
        >
          <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.25rem", color: "var(--color-primary)" }}>
            Explore the Menu &rarr;
          </h2>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            Browse our selection of beef, chicken, lamb, and vegan fasting platters with instant live search.
          </p>
        </Link>

        <Link
          href="/orders"
          className="card"
          style={{ textDecoration: "none", display: "block" }}
        >
          <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.25rem", color: "var(--color-text)" }}>
            My Past Orders &rarr;
          </h2>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            View your order history, verified delivery receipts, and current fulfillment updates.
          </p>
        </Link>

        <Link
          href="/order-status"
          className="card"
          style={{ textDecoration: "none", display: "block" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.25rem", color: "var(--color-text)" }}>
              Live Order Tracker
            </h2>
            <div className="status-beacon">
              <span className="beacon-dot" />
            </div>
          </div>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            Follow your order status in real time with continuous background updates.
          </p>
        </Link>
      </div>
    </div>
  );
}
