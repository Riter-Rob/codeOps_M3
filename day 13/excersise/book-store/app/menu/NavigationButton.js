"use client";

import { useRouter } from "next/navigation";

export default function NavigationButton() {
  const router = useRouter();

  function goToCart() {
    router.push("/cart");
  }

  return (
    <button onClick={goToCart}>
      Go to Cart
    </button>
  );
}