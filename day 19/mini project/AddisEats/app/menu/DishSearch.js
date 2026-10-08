"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function DishSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [term, setTerm] = useState(searchParams.get("search") || "");
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  // page number from query string
  const page = Number(searchParams.get("page")) || 1;

  // debounce term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term);
    }, 300);
    return () => clearTimeout(timer);
  }, [term]);

  // null key when term is empty
  const key = debouncedTerm.trim()
    ? `/api/dishes?search=${encodeURIComponent(debouncedTerm.trim())}&page=${page}`
    : null;

  // keepPreviousData prevents flickering between searches
  const { data, isValidating } = useSWR(key, fetcher, {
    keepPreviousData: true
  });

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setTerm(val);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (val.trim()) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  };

  const setPage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  return (
    <div style={{ margin: "1.5rem 0", maxWidth: "480px" }}>
      <h2>Search Dishes</h2>
      <input
        type="text"
        value={term}
        onChange={handleSearchChange}
        placeholder="Type to search (e.g. Wat, Tibs, Shiro)..."
        style={{
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginBottom: "1rem"
        }}
      />

      {!debouncedTerm.trim() ? (
        <p style={{ color: "#666" }}>Search box is empty (null SWR key, no request sent).</p>
      ) : !data ? (
        <p>Loading dishes...</p>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ margin: 0, fontWeight: 500 }}>
              Found {data.total} {data.total === 1 ? "dish" : "dishes"}
            </p>
            {isValidating && <span style={{ fontSize: "0.8rem", color: "#666" }}>Updating...</span>}
          </div>

          {data.dishes.length === 0 ? (
            <p style={{ marginTop: "1rem", color: "#888" }}>No dishes match &quot;{debouncedTerm}&quot;.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, marginTop: "0.75rem" }}>
              {data.dishes.map((dish) => (
                <li
                  key={dish.id}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #eee",
                    borderRadius: "4px",
                    marginBottom: "6px",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <span>
                    <strong>{dish.name}</strong> {dish.spicy && "🌶️"}
                  </span>
                  <span>{dish.price} ETB</span>
                </li>
              ))}
            </ul>
          )}

          {data.totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem" }}>
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                style={{
                  padding: "4px 10px",
                  cursor: page <= 1 ? "not-allowed" : "pointer"
                }}
              >
                Previous
              </button>
              <span>
                Page {page} of {data.totalPages}
              </span>
              <button
                type="button"
                disabled={page >= data.totalPages}
                onClick={() => setPage(page + 1)}
                style={{
                  padding: "4px 10px",
                  cursor: page >= data.totalPages ? "not-allowed" : "pointer"
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
