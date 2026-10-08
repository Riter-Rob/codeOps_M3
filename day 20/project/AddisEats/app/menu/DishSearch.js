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
    <div style={{ margin: "1.5rem 0 2rem", maxWidth: "560px" }}>
      <label htmlFor="dish-search-input" style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.4rem", color: "var(--color-text)" }}>
        Search Menu Dishes (Live Debounced)
      </label>
      <div style={{ position: "relative" }}>
        <input
          id="dish-search-input"
          type="text"
          value={term}
          onChange={handleSearchChange}
          placeholder="Search by name, stew type, or ingredients (e.g. Doro, Tibs, Shiro)..."
          className="form-input"
          style={{ paddingRight: "2.5rem" }}
        />
        {isValidating && (
          <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }}>
            <span className="beacon-dot" />
          </div>
        )}
      </div>

      {!debouncedTerm.trim() ? (
        <p style={{ fontSize: "0.8125rem", color: "var(--color-text-faint)", marginTop: "0.5rem" }}>
          Live search pauses when input is empty (SWR key is null, 0 network requests fired).
        </p>
      ) : !data ? (
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginTop: "0.75rem" }}>
          Searching menu records...
        </p>
      ) : (
        <div style={{ marginTop: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--color-text)" }}>
              Found {data.total} {data.total === 1 ? "dish" : "dishes"}
            </span>
            {isValidating && (
              <span style={{ fontSize: "0.75rem", color: "var(--color-ochre)", fontWeight: "600" }}>
                Refreshing results...
              </span>
            )}
          </div>

          {data.dishes.length === 0 ? (
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", padding: "1rem 0" }}>
              No dishes match &quot;{debouncedTerm}&quot;. Try searching for &quot;Wat&quot;, &quot;Tibs&quot;, or &quot;Shiro&quot;.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {data.dishes.map((dish) => (
                <Link
                  key={dish.id}
                  href={`/menu/${dish.id}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.75rem 1rem",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "all var(--transition-fast)",
                    boxShadow: "var(--shadow-xs)"
                  }}
                >
                  <div>
                    <span style={{ fontWeight: "600", color: "var(--color-text)" }}>{dish.name}</span>
                    <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", color: "var(--color-text-faint)" }}>({dish.category})</span>
                  </div>
                  <strong style={{ color: "var(--color-ochre)", fontVariantNumeric: "tabular-nums" }}>
                    {dish.price} ETB
                  </strong>
                </Link>
              ))}
            </div>
          )}

          {data.totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem" }}>
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="btn btn-secondary"
                style={{ padding: "0.35rem 0.75rem", fontSize: "0.8125rem", opacity: page <= 1 ? 0.5 : 1 }}
              >
                Previous
              </button>
              <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                Page {page} of {data.totalPages}
              </span>
              <button
                type="button"
                disabled={page >= data.totalPages}
                onClick={() => setPage(page + 1)}
                className="btn btn-secondary"
                style={{ padding: "0.35rem 0.75rem", fontSize: "0.8125rem", opacity: page >= data.totalPages ? 0.5 : 1 }}
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
