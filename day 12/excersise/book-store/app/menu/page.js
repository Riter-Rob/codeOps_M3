import Link from "next/link";
import { Suspense } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import NavigationButton from "./NavigationButton";

export const revalidate = 60;

export default function Menu() {
  return (
    <div>
      <NavigationButton />
      <h1>Menu</h1>

      <nav>
        <Link href="/">Home</Link>{" | "}
        <Link href="/cart">Cart</Link>{" | "}
        <Link href="/checkout">Checkout</Link>
      </nav>

      <CategoryBar />

      <Suspense fallback={<p>Loading books...</p>}>
        <DishList />
      </Suspense>

      <h2>Dish Details</h2>
      <Link href="/menu/1">View Dish 1</Link>
    </div>
  );
}