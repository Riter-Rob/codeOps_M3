import FoodCard from "@/app/components/FoodCard";
import { dishes } from "@/app/data/dishes";
import { filterDishes } from "@/app/lib/cart";

export default async function DishList({ category, search }) {
  const filtered = filterDishes(dishes, category || "all", search || "");
  const heading = category && category.toLowerCase() !== "all" ? category : "All dishes";

  if (!filtered.length) {
    return (
      <div className="card empty-state">
        <h2>No dishes match your search.</h2>
        <p>
          {search ? `Nothing found for “${search}”. ` : ""}
          Try “Wat”, “Tibs”, or “Shiro”, or clear the filters to see every dish.
        </p>
      </div>
    );
  }

  return (
    <section aria-labelledby="dish-list-heading">
      <h2 id="dish-list-heading" className="dish-list-heading">
        {heading} ({filtered.length})
      </h2>
      <div className="menu-grid">
        {filtered.map((dish) => <FoodCard key={dish.id} dish={dish} />)}
      </div>
    </section>
  );
}
