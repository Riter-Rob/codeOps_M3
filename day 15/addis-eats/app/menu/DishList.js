import FoodCard from "@/app/components/FoodCard";
import { dishes } from "@/app/data/dishes";

export default async function DishList({ category }) {
  const filtered = category && category.toLowerCase() !== "all"
    ? dishes.filter((d) => d.category.toLowerCase() === category.toLowerCase())
    : dishes;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "1rem" }}>
        <h2>{category && category.toLowerCase() !== "all" ? category : "All Dishes"} ({filtered.length})</h2>
      </div>

      <div className="menu-grid">
        {filtered.map((dish) => (
          <FoodCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}