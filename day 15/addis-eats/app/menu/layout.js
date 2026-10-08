import Counter from "./Counter";
import Link from "next/link";

export default function MenuLayout({ children }) {
  return (
    <div style={{ display: "flex", gap: "1.75rem", alignItems: "flex-start", flexWrap: "wrap" }}>
      <aside
        style={{
          width: "200px",
          flexShrink: 0,
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          padding: "1rem",
        }}
      >
        <h2 style={{ fontSize: "0.9375rem", margin: "0 0 0.5rem 0", color: "#111827" }}>
          Categories
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          <li>
            <Link href="/menu" style={{ textDecoration: "none", fontSize: "0.8125rem", color: "#b91c1c", fontWeight: 500 }}>
              All Dishes
            </Link>
          </li>
          <li>
            <Link href="/menu?category=Traditional" style={{ textDecoration: "none", fontSize: "0.8125rem", color: "#4b5563" }}>
              Traditional
            </Link>
          </li>
          <li>
            <Link href="/menu?category=Fasting" style={{ textDecoration: "none", fontSize: "0.8125rem", color: "#4b5563" }}>
              Fasting (የጾም)
            </Link>
          </li>
          <li>
            <Link href="/menu?category=Tibs" style={{ textDecoration: "none", fontSize: "0.8125rem", color: "#4b5563" }}>
              Tibs
            </Link>
          </li>
        </ul>

        <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "0.75rem" }}>
          <Counter />
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: "280px" }}>{children}</div>
    </div>
  );
}
