import Link from "next/link";
import CartContents from "../components/CartContents";

export const metadata = {
  title: "Cart",
  description: "Review your selected Ethiopian dishes and proceed to demo checkout.",
  alternates: { canonical: "/cart" },
};

export default function Cart() {
  return (
    <div className="cart-page">
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Cart</span>
      </nav>
      <div className="page-heading"><h1>Your cart</h1><p>A little closer to your next favorite meal. Review your dishes below.</p></div>
      <CartContents />
    </div>
  );
}
