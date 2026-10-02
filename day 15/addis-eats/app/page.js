import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <h2>Welcome to Addis Eats</h2>
      <p style={{ margin: "1rem 0", color: "#57534e" }}>
        Discover delicious Ethiopian food and order your favorite dishes.
      </p>
      <Link href="/menu" className="btn btn-primary">
        View Menu
      </Link>
    </section>
  );
}
