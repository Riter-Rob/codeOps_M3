"use client";

import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = ["All", "Engineering", "Design", "Data", "Marketing"];
const LOCATIONS = ["All", "Addis Ababa", "Remote"];

export default function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  const currentLocation = searchParams.get("location") || "All";

  const update = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "All") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="filter-row">
      <span className="filter-label">Filter</span>

      <div>
        <label htmlFor="cat-select" className="filter-label" style={{ marginRight: "0.4rem" }}>
          Category
        </label>
        <select
          id="cat-select"
          value={currentCategory}
          onChange={(e) => update("category", e.target.value)}
          className="filter-select"
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="loc-select" className="filter-label" style={{ marginRight: "0.4rem" }}>
          Location
        </label>
        <select
          id="loc-select"
          value={currentLocation}
          onChange={(e) => update("location", e.target.value)}
          className="filter-select"
        >
          {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>
    </div>
  );
}
