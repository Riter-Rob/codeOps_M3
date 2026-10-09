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
          border: "none",
          borderRadius: "6px",
          padding: "1rem",
        }}
      >
        <h2 style={{ fontSize: "0.9375rem", margin: "0 0 0.5rem 0", color: "#18542a" }}>
          Categories
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          <li>
            <Link href="/menu" style={{ textDecoration: "none", fontSize: "0.875rem", color: "#d52518", fontWeight: 700 }}>
              All Dishes
            </Link>
          </li>
          <li>
            <Link href="/menu?category=Traditional" style={{ textDecoration: "none", fontSize: "0.875rem", color: "#18542a", fontWeight: 600 }}>
              Traditional
            </Link>
          </li>
          <li>
            <Link href="/menu?category=Fasting" style={{ textDecoration: "none", fontSize: "0.875rem", color: "#18542a", fontWeight: 600 }}>
              Fasting (የጾም)
            </Link>
          </li>
          <li>
            <Link href="/menu?category=Tibs" style={{ textDecoration: "none", fontSize: "0.875rem", color: "#18542a", fontWeight: 600 }}>
              Tibs
            </Link>
          </li>
        </ul>

        <div style={{ borderTop: "1px solid #f3e8cc", paddingTop: "0.75rem" }}>
          <Counter />
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: "280px" }}>{children}</div>
    </div>
  );
}
