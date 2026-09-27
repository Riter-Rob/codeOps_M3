import Counter from "./Counter";

export default function MenuLayout({ children }) {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <aside>
        <h2>Categories</h2>
        <ul>
          <li>All</li>
          <li>Fiction</li>
          <li>Science</li>
          <li>History</li>
        </ul>

        <Counter />
      </aside>

      <div>{children}</div>
    </div>
  );
}
