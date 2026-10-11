export function etb(amount) {
  const num = Number(amount) || 0;
  return `${num.toLocaleString("en-US")} ETB`;
}

export function when(timestamp) {
  if (!timestamp) return "—";
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

export function relative(timestamp) {
  if (!timestamp) return "—";
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "—";
  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHours = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHours / 24);

  if (Math.abs(diffSec) < 30) return "just now";
  if (diffSec > 0) {
    if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  } else {
    const absMin = Math.abs(diffMin);
    const absHours = Math.abs(diffHours);
    const absDays = Math.abs(diffDays);
    if (absMin < 60) return `in ${absMin} minute${absMin === 1 ? "" : "s"}`;
    if (absHours < 24) return `in ${absHours} hour${absHours === 1 ? "" : "s"}`;
    return `in ${absDays} day${absDays === 1 ? "" : "s"}`;
  }
}
