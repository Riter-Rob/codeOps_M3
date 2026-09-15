import Link from "next/link";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import NavigationButton from "./NavigationButton";

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

      <DishList />

      <h2>Dish Details</h2>
      <Link href="/menu/1">View Dish 1</Link>
    </div>
  );
}