import Link from "next/link";
import { Suspense } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import DishSearch from "./DishSearch";
import NavigationButton from "./NavigationButton";
import FilterShell from "./FilterShell";

export const revalidate = 60;

export const metadata = {
  title: "Menu & Specialties",
  description: "Explore our authentic Ethiopian menu featuring freshly prepared wat stews, grilled tibs, and vegan platters.",
};

export default async function Menu() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <NavigationButton />
      <h1>Menu</h1>

      <nav style={{ margin: "0.5rem 0 1rem" }}>
        <Link href="/">Home</Link>{" | "}
        <Link href="/cart">Cart</Link>{" | "}
        <Link href="/checkout">Checkout</Link>{" | "}
        <Link href="/orders">Orders</Link>
      </nav>

      <Suspense fallback={<p>Loading search...</p>}>
        <DishSearch />
      </Suspense>

      <CategoryBar />

      <FilterShell>
        <Suspense fallback={<p>Loading dishes...</p>}>
          <DishList />
        </Suspense>
      </FilterShell>

      <h2>Dish Details</h2>
      <Link href="/menu/1">View Dish 1</Link>
    </div>
  );
}