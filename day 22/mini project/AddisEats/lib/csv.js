export function escapeCsvField(val) {
  if (val === null || val === undefined) {
    return "";
  }
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function ordersToCsv(orders = []) {
  const headers = [
    "Order ID",
    "Date",
    "Customer",
    "Phone",
    "Neighbourhood",
    "Status",
    "Total (ETB)",
    "Items Summary",
    "Delivery Address",
    "Notes"
  ];

  const rows = orders.map((order) => {
    const itemsSummary = (order.items || [])
      .map((item) => `${item.name} (x${item.quantity})`)
      .join("; ");

    return [
      escapeCsvField(order.id),
      escapeCsvField(order.createdAt),
      escapeCsvField(order.name),
      escapeCsvField(order.phone),
      escapeCsvField(order.area),
      escapeCsvField(order.status),
      escapeCsvField(order.total),
      escapeCsvField(itemsSummary),
      escapeCsvField(order.deliveryLocation?.address || `${order.area}, Addis Ababa`),
      escapeCsvField(order.notes || "")
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\r\n");
}
