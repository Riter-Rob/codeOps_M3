import CartClient from "../../components/CartClient";

export default function CartPage() {
  return (
    <section>
      <h2 style={{ marginBottom: "1rem" }}>Your Cart</h2>
      <CartClient />
    </section>
  );
}
