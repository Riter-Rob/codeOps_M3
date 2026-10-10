"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DishSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(() => searchParams.get("search") || "");
  const debounceRef = useRef(null);

  function navigate(value) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    const trimmed = value.trim();
    if (trimmed) params.set("search", trimmed);
    else params.delete("search");
    router.push(`?${params.toString()}`);
  }

  function handleChange(event) {
    const value = event.target.value;
    setTerm(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => navigate(value), 300);
  }

  function handleClear() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setTerm("");
    navigate("");
  }

  return (
    <form
      className="search-pill-bar"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        if (debounceRef.current) clearTimeout(debounceRef.current);
        navigate(term);
      }}
    >
      <label className="sr-only" htmlFor="dish-search-input">Search the menu</label>
      <input
        id="dish-search-input"
        type="search"
        value={term}
        onChange={handleChange}
        placeholder="Search stews, tibs, shiro..."
        className="search-pill-input"
      />
      {term && (
        <button type="button" className="search-clear" onClick={handleClear}>Clear</button>
      )}
      <button type="submit" className="search-pill-btn">Search</button>
    </form>
  );
}
