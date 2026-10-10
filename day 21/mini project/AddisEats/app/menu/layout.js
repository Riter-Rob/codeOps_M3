import Counter from "./Counter";

export default function MenuLayout({ children }) {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <aside>
        <h2>Categories</h2>
        <ul>
          <li>All</li>
          <li>Stews</li>
          <li>Grills</li>
          <li>Vegetarian</li>
        </ul>

        <Counter />
      </aside>

      <div>{children}</div>
    </div>
  );
}
