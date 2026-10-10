import CheckoutForm from "./CheckoutForm";

export const metadata = {
  title: "Secure Checkout",
  description: "Provide delivery details and securely complete your Addis Eats order.",
};

export default function Checkout() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Checkout</h1>
      <CheckoutForm />
    </div>
  );
}