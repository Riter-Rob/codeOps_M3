import Counter from "./Counter";

export default function MenuLayout({ children }) {
  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
      <aside
        style={{
          width: "220px",
          flexShrink: 0,
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "1.5rem",
          boxShadow: "var(--shadow-xs)",
        }}
      >
        <h2 style={{ fontSize: "1.125rem", margin: "0 0 0.75rem 0", color: "var(--color-text)" }}>
          Categories
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <li style={{ fontSize: "0.875rem", color: "var(--color-primary)", fontWeight: "600" }}>All Specialties</li>
          <li style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>Traditional Wats</li>
          <li style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>Sizzling Tibs</li>
          <li style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>Vegetarian Fasting</li>
        </ul>

        <div style={{ borderTop: "1px solid var(--color-border-subtle)", paddingTop: "1rem" }}>
          <Counter />
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: "300px" }}>{children}</div>
    </div>
  );
}
