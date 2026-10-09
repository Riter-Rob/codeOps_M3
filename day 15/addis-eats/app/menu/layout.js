import Counter from "./Counter";
import Link from "next/link";

const CATEGORIES = [
  { href: "/menu", label: "All Dishes", exact: true },
  { href: "/menu?category=Traditional", label: "Traditional" },
  { href: "/menu?category=Fasting", label: "Fasting" },
  { href: "/menu?category=Tibs", label: "Tibs" },
];

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="menu-sidebar" aria-label="Menu sidebar">
        <h2 className="sidebar-title">Categories</h2>
        <ul className="sidebar-links">
          {CATEGORIES.map((cat) => (
            <li key={cat.href}>
              <Link href={cat.href} className="sidebar-link">
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="sidebar-section">
          <Counter />
        </div>
      </aside>

      <div className="menu-content">{children}</div>
    </div>
  );
}
