"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div style={{ border: "1px dashed #d6d3d1", padding: "1rem", borderRadius: "8px", margin: "1rem 0" }}>
      <div style={{ marginBottom: "0.75rem" }}>
        <span style={{ fontWeight: 600 }}>Filter: </span>
        <button onClick={() => setSelectedCategory("all")}>All</button>
        <button onClick={() => setSelectedCategory("stews")}>Stews</button>
        <button onClick={() => setSelectedCategory("grills")}>Grills</button>
      </div>
      <p style={{ fontSize: "0.85rem", color: "#78716c", marginBottom: "0.75rem" }}>
        Active view: {selectedCategory}
      </p>
      <div>{children}</div>
    </div>
  );
}
