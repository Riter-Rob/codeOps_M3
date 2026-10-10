"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div style={{ border: "1px dashed #ccc", padding: "1rem", borderRadius: "8px", margin: "1rem 0" }}>
      <div style={{ marginBottom: "1rem" }}>
        <span>Filter: </span>
        <button onClick={() => setActiveFilter("all")}>All</button>
        <button onClick={() => setActiveFilter("popular")}>Popular</button>
      </div>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>Current filter: {activeFilter}</p>
      <div>{children}</div>
    </div>
  );
}
