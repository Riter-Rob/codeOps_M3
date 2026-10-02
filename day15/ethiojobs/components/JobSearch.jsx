"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function JobSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("search") || "");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (term.trim()) {
      params.set("search", term.trim());
    } else {
      params.delete("search");
    }
    startTransition(() => {
      router.push(`/jobs?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    startTransition(() => {
      router.push(`/jobs?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="search-row">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search by title, company or keyword..."
        className="search-input"
        aria-label="Search jobs"
      />
      <button type="submit" disabled={isPending} className="btn btn-primary">
        {isPending ? "..." : "Search"}
      </button>
      {term && (
        <button type="button" onClick={handleClear} className="btn btn-ghost">
          Clear
        </button>
      )}
    </form>
  );
}
