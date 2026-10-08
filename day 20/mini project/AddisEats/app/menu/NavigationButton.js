"use client";

import { useRouter } from "next/navigation";

export default function NavigationButton() {
  const router = useRouter();

  function goToCart() {
    router.push("/cart");
  }

  return (
    <button type="button" onClick={goToCart} className="btn btn-secondary">
      View Cart &rarr;
    </button>
  );
}