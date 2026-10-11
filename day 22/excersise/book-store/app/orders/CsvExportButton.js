"use client";

import { useState } from "react";
import { ordersToCsv } from "@/lib/csv";

export default function CsvExportButton({ orders = [] }) {
  const [downloading, setDownloading] = useState(false);

  function handleExport() {
    setDownloading(true);
    try {
      const csvContent = ordersToCsv(orders);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
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
      aria-label="Export orders to CSV file"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        backgroundColor: "#ffffff",
        border: "1px solid #cbd5e1",
        borderRadius: "6px",
        padding: "0.45rem 0.85rem",
        fontSize: "0.875rem",
        fontWeight: "600",
        color: "#1e293b",
        cursor: downloading || orders.length === 0 ? "not-allowed" : "pointer",
        opacity: downloading || orders.length === 0 ? 0.7 : 1,
        transition: "all 0.15s ease"
      }}
    >
      <span aria-hidden="true">&#x2193;</span>
      {downloading ? "Exporting CSV..." : "Export CSV"}
    </button>
  );
}
