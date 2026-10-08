import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import CheckoutForm from "./CheckoutForm";
import Link from "next/link";

export const metadata = {
  title: "Secure Checkout",
  description: "Complete your order with secure delivery details and seamless payment.",
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

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ margin: 0 }}>Secure Order Checkout</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
          Ordering as <strong>{session.name}</strong> · TeleBirr and cash on delivery supported across Addis Ababa.
        </p>
      </div>

      <CheckoutForm />
    </div>
  );
}