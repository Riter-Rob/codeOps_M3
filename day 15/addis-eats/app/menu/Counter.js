"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p style={{ fontSize: "0.8125rem", color: "#6b7280", marginBottom: "0.4rem" }}>
        Order count: <strong style={{ color: "#d52518" }} className="tabular">{count}</strong>
      </p>
      <div style={{ display: "flex", gap: "0.35rem" }}>
        <button
          type="button"
          onClick={() => setCount(count + 1)}
          className="btn btn-secondary btn-sm"
          aria-label="Increase count"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => setCount(Math.max(0, count - 1))}
          className="btn btn-secondary btn-sm"
          aria-label="Decrease count"
        >
          -
        </button>
      </div>
    </div>
  );
}
