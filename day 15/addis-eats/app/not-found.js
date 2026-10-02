import Link from "next/link";

export default function NotFound() {
  return (
    <section className="dish-detail" style={{ margin: "2rem auto", textAlign: "center" }}>
      <h2>Dish Not Found</h2>
      <p style={{ margin: "1rem 0" }}>Sorry, the dish you requested does not exist.</p>
      <Link href="/menu" className="btn btn-primary">
        Return to Menu
      </Link>
    </section>
  );
}
