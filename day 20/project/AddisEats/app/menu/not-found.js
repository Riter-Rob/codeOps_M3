import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ maxWidth: "480px", margin: "2rem auto", background: "#ffffff", border: "1px solid #e5dcc3", borderRadius: "6px", padding: "1.75rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "1.5rem", color: "#18542a", marginBottom: "0.5rem" }}>Dish Not Found</h1>
      <p style={{ color: "#6b7280", marginBottom: "1.25rem" }}>Sorry, the dish you are looking for does not exist or has been removed.</p>
      <Link href="/menu" className="btn btn-primary btn-sm">
        &larr; Return to Menu
      </Link>
    </div>
  );
}