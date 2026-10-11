export const metadata = {
  title: "Shopping Cart",
  description: "Review your selected Ethiopian dishes, update order quantities, and proceed to checkout.",
  alternates: {
    canonical: "/cart",
  },
};

export default function Cart() {
  return (
    <div>
      <h1>Your Cart</h1>
      <p>Review your selected dishes!</p>
    </div>
  );
}