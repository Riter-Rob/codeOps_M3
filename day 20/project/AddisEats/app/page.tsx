import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { signOut } from "./actions/auth";
import { dishes } from "./data/dishes";

export const metadata = {
  title: "Home",
  description: "Ethiopian food in Addis Ababa. Fresh Doro Wat, Tibs, and Beyainatu.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const session = await getSession();
  const popularDishes = dishes.slice(0, 4);

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1>What are you eating today?</h1>
        <p style={{ color: "#706b61", marginTop: "0.25rem" }}>
          Fresh dishes delivered to your door in Bole, Kazanchis, Megenagna, and Piassa.
        </p>
      </div>

      {/* Account bar */}
      <div
        style={{
          background: "#fffefa",
          border: "1px solid #e7e0d4",
          borderRadius: "10px",
          padding: "0.75rem 1rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          fontSize: "0.9375rem",
        }}
      >
        {session ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span>
              Signed in as <strong style={{ color: "#365746" }}>{session.name}</strong>{" "}
              <span className={`badge ${session.role === "staff" ? "badge-warning" : "badge-success"}`}>
                {session.role}
              </span>
            </span>
            <form action={signOut}>
              <button type="submit" className="btn btn-secondary btn-sm">
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: "0.5rem" }}>
            <span style={{ color: "#706b61" }}>
              Sign in to save your delivery address and view past orders.
            </span>
            <Link href="/sign-in" className="btn btn-primary btn-sm">
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Quick Category Filters */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div className="category-filters">
          <Link href="/menu" className="category-btn active">All Dishes</Link>
          <Link href="/menu?category=Traditional" className="category-btn">Traditional</Link>
          <Link href="/menu?category=Fasting" className="category-btn">Fasting (የጾም)</Link>
          <Link href="/menu?category=Tibs" className="category-btn">Tibs</Link>
        </div>
      </div>

      {/* Popular Dishes */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
          <h2>Popular in Addis</h2>
          <Link href="/menu" style={{ fontSize: "0.9375rem", color: "#ad503c", textDecoration: "none", fontWeight: 700 }}>
            Full menu &rarr;
          </Link>
        </div>

        <div className="menu-grid">
          {popularDishes.map((dish) => (
            <Link key={dish.id} href={`/menu/${dish.id}`} className="menu-item">
              <Image
                src={dish.image}
                alt={dish.name}
                width={300}
                height={170}
                className="menu-item-image"
                sizes="(max-width: 640px) 100vw, 300px"
              />
              <div className="menu-item-info">
                <div className="menu-item-header">
                  <span className="menu-item-name">{dish.name}</span>
                  <span className="menu-item-price tabular">{dish.price} ETB</span>
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <span className={`tag ${dish.fasting ? "tag-fasting" : "tag-meat"}`}>
                    {dish.fasting ? "የጾም / Fasting" : dish.category}
                  </span>
                </div>
                <p className="menu-item-ingredients">{dish.ingredients}</p>
                <div className="menu-item-footer">
                  <span style={{ fontSize: "0.875rem", color: "#ad503c", fontWeight: 700 }}>
                    View Dish &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Practical Delivery Notice */}
      <div
        style={{
          background: "#fffefa",
          border: "1px solid #e7e0d4",
          borderRadius: "10px",
          padding: "1rem 1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <strong style={{ fontSize: "1rem", color: "#365746", display: "block" }}>
            Delivery Districts
          </strong>
          <span style={{ fontSize: "0.875rem", color: "#706b61" }}>
            Bole (25–35m) · Kazanchis (30–40m) · Megenagna (35–45m) · Piassa (40–50m)
          </span>
        </div>
        <Link href="/checkout" className="btn btn-secondary btn-sm">
          Start Order
        </Link>
      </div>
    </div>
  );
}
