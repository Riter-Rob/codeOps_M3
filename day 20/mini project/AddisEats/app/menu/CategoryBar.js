"use client";

import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  { id: "all", label: "All Dishes" },
  { id: "Traditional", label: "Traditional" },
  { id: "Fasting", label: "Fasting " },
  { id: "Tibs", label: "Tibs" },
];

export default function CategoryBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  function handleSelect(catId) {
    const params = new URLSearchParams(searchParams.toString());
    if (catId === "all") {
      params.delete("category");
    } else {
      params.set("category", catId);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="categories-pill-row" role="tablist" aria-label="Menu categories">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`category-item-btn ${isActive ? "active" : ""}`}
            onClick={() => handleSelect(cat.id)}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}