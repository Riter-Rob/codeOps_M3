"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
        Selected Item Count: <strong style={{ color: "var(--color-primary)", fontVariantNumeric: "tabular-nums" }}>{count}</strong>
      </p>
      <div style={{ display: "flex", gap: "0.4rem" }}>
        <button
          type="button"
          onClick={() => setCount(count + 1)}
          className="btn btn-secondary"
          style={{ padding: "0.25rem 0.65rem", fontSize: "0.875rem" }}
          aria-label="Increase count"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => setCount(Math.max(0, count - 1))}
          className="btn btn-secondary"
          style={{ padding: "0.25rem 0.65rem", fontSize: "0.875rem" }}
          aria-label="Decrease count"
        >
          -
        </button>
      </div>
    </div>
  );
}
