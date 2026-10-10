"use client";

import Link from "next/link";
import { useCart } from "../components/CartProvider";
import { MAX_QUANTITY } from "../lib/cart";

export default function NavigationButton({ dish }) {
  const { items, itemCount, addItem } = useCart();
  if (!dish) return <Link href="/cart" className="btn btn-secondary">View cart ({itemCount}) &rarr;</Link>;
  const quantity = items.find((item) => item.id === dish.id)?.quantity || 0;
  return (
    <div className="dish-purchase">
      <button type="button" className="btn btn-primary" disabled={quantity >= MAX_QUANTITY}
        onClick={() => addItem(dish.id)} aria-label={`Add ${dish.name} to cart`}>
        {quantity >= MAX_QUANTITY ? "Quantity limit reached" : `Add to cart · ${dish.price} ETB`}
      </button>
      {quantity > 0 && <Link href="/cart" className="btn btn-secondary">View cart ({itemCount}) &rarr;</Link>}
    </div>
  );
}
