const etbFormatter = new Intl.NumberFormat("en-ET", {
  maximumFractionDigits: 0
});

const whenFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true
});

const relativeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto"
});

export function etb(amount) {
  const num = Number(amount) || 0;
  return `${etbFormatter.format(num)} ETB`;
}

export function when(date) {
  if (!date) return "";
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  return whenFormatter.format(d);
}

export function relative(date) {
  if (!date) return "";
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  const diffSec = Math.round((d.getTime() - Date.now()) / 1000);
  const absSec = Math.abs(diffSec);

  if (absSec < 45) return "just now";
  if (absSec < 3600) return relativeFormatter.format(Math.round(diffSec / 60), "minute");
  if (absSec < 86400) return relativeFormatter.format(Math.round(diffSec / 3600), "hour");
  if (absSec < 2592000) return relativeFormatter.format(Math.round(diffSec / 86400), "day");
  if (absSec < 31536000) return relativeFormatter.format(Math.round(diffSec / 2592000), "month");
  return relativeFormatter.format(Math.round(diffSec / 31536000), "year");
}
