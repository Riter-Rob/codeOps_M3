import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import CheckoutForm from "./CheckoutForm";
import Link from "next/link";

export const metadata = {
  title: "Checkout",
  description: "Review your dishes and delivery details in the Addis Eats demo checkout.",
  alternates: {
    canonical: "/checkout",
  },
};

export default async function Checkout() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in?next=/checkout");
  }

  return (
    <div>
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <Link href="/menu">Menu</Link>
        <span className="separator">/</span>
        <span style={{ color: "var(--color-text-muted)" }}>Checkout</span>
      </nav>

      <div className="page-heading">
        <h1>Checkout</h1>
        <p>
          Ordering as <strong>{session.name}</strong>. This is a demo flow: your order is recorded so you can follow
          its status, but no payment is collected and nothing is delivered.
        </p>
      </div>

      <CheckoutForm />
    </div>
  );
}