import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import CheckoutForm from "./CheckoutForm";

export default async function Checkout() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in?next=/checkout");
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Checkout</h1>
      <CheckoutForm />
    </div>
  );
}