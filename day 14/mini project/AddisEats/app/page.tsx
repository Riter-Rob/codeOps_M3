import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Addis Eats</h1>
      <p>Discover authentic Ethiopian cuisine.</p>
      <Link href="/menu">View Menu</Link>
    </div>
  );
}
