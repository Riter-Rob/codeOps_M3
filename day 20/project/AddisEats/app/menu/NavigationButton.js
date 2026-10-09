"use client";

import { useRouter } from "next/navigation";

export default function NavigationButton() {
  const router = useRouter();

  function goToCart() {
    router.push("/cart");
  }

  return (
    <button
      type="button"
      onClick={goToCart}
      className="btn btn-secondary btn-sm"
      style={{ borderRadius: "9999px", fontWeight: 700, padding: "0.45rem 1rem" }}
    >
      View Cart &rarr;
    </button>
  );
}