"use client";

import { useState } from "react";
import { ordersToCsv } from "@/lib/csv";

export default function CsvExportButton({ orders = [] }) {
  const [downloading, setDownloading] = useState(false);

  function handleExport() {
    try {
      setDownloading(true);
      const csvString = ordersToCsv(orders);
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `addis_eats_orders_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setTimeout(() => setDownloading(false), 600);
    }
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={downloading || orders.length === 0}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        backgroundColor: "#18542a",
        color: "#ffffff",
        border: "1px solid #144422",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        fontSize: "0.875rem",
        fontWeight: "600",
        cursor: orders.length === 0 || downloading ? "not-allowed" : "pointer",
        opacity: orders.length === 0 || downloading ? 0.65 : 1,
        transition: "all 0.15s ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }}
      aria-label="Export order history as RFC 4180 CSV file"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {downloading ? "Generating CSV..." : "Export CSV"}
    </button>
  );
}
