"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartLink() {
  const { itemCount } = useCart();
  return (
    <Link href="/cart" className="cart-pill">
      Cart{itemCount > 0 ? ` (${itemCount})` : ""}
      <span className="sr-only">{itemCount > 0 ? `, ${itemCount} portions selected` : ", empty"}</span>
    </Link>
  );
}
