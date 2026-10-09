"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function DishSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [term, setTerm] = useState(searchParams.get("search") || "");
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term);
    }, 300);
    return () => clearTimeout(timer);
  }, [term]);

  const key = debouncedTerm.trim()
    ? `/api/dishes?search=${encodeURIComponent(debouncedTerm.trim())}&page=${page}`
    : null;

  const { data } = useSWR(key, fetcher, {
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const setPage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="search-widget-container">
      <form onSubmit={handleSearchSubmit} className="search-pill-bar">
        <input
          id="dish-search-input"
          type="text"
          value={term}
          onChange={handleSearchChange}
          placeholder="Search stews, tibs, shiro..."
          className="search-pill-input"
          aria-label="Search menu"
        />
        <button type="submit" className="search-pill-btn">
          Search
        </button>
      </form>

      {debouncedTerm.trim() && (
        <div style={{ marginTop: "0.75rem" }}>
          {!data ? (
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Searching...
            </p>
          ) : data.dishes.length === 0 ? (
            <p style={{ color: "#6b7280", fontSize: "0.875rem", padding: "0.5rem 0" }}>
              No dishes found for &quot;{debouncedTerm}&quot;. Try searching for &quot;Wat&quot;, &quot;Tibs&quot;, or &quot;Shiro&quot;.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <div style={{ fontSize: "0.8125rem", color: "#6b7280", marginBottom: "0.25rem" }}>
                {data.total} {data.total === 1 ? "result" : "results"}
              </div>
              {data.dishes.map((dish) => (
                <Link
                  key={dish.id}
                  href={`/menu/${dish.id}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.65rem 0.95rem",
                    background: "#ffffff",
                    border: "1px solid #e5dcc3",
                    borderRadius: "16px",
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "0.875rem",
                    boxShadow: "0 2px 6px rgba(24, 84, 42, 0.04)"
                  }}
                >
                  <div>
                    <strong style={{ color: "#18542a" }}>{dish.name}</strong>
                    <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", color: "#6b7280" }}>
                      ({dish.category})
                    </span>
                  </div>
                  <span style={{ color: "#d52518", fontWeight: "700" }} className="tabular">
                    {dish.price} ETB
                  </span>
                </Link>
              ))}

              {data.totalPages > 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="btn btn-secondary btn-sm"
                    style={{ opacity: page <= 1 ? 0.5 : 1 }}
                  >
                    Previous
                  </button>
                  <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    Page {page} of {data.totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={page >= data.totalPages}
                    onClick={() => setPage(page + 1)}
                    className="btn btn-secondary btn-sm"
                    style={{ opacity: page >= data.totalPages ? 0.5 : 1 }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
