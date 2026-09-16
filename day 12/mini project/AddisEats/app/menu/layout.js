"use client";

import { useState } from "react";

export default function MenuLayout({ children }) {
  const [count, setCount] = useState(0);

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

        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>+</button>
          <button onClick={() => setCount(count - 1)}>-</button>
        </div>
      </aside>

      <div>{children}</div>
    </div>
  );
}
