export function escapeCsvField(val) {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function ordersToCsv(orderList = []) {
  const headers = [
    "Order ID",
    "Date",
    "Customer",
    "Area",
    "Status",
    "Items",
    "Total (ETB)"
  ];

  const rows = orderList.map((order) => {
    const itemsSummary = (order.items || [])
      .map((item) => `${item.quantity}x ${item.name}`)
      .join(", ");

    return [
      escapeCsvField(order.id),
      escapeCsvField(order.createdAt),
      escapeCsvField(order.name),
      escapeCsvField(order.area),
      escapeCsvField(order.status),
      escapeCsvField(itemsSummary),
      escapeCsvField(order.total)
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\r\n");
}
