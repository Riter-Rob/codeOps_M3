import Image from "next/image";
import Link from "next/link";
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
          <Link
            key={dish.id}
            href={`/menu/${dish.id}`}
            className="menu-item"
          >
            <Image
              src={dish.image}
              alt={dish.name}
              width={300}
              height={170}
              className="menu-item-image"
              sizes="(max-width: 640px) 100vw, 300px"
            />
            <div className="menu-item-info">
              <div className="menu-item-header">
                <span className="menu-item-name">{dish.name}</span>
                <span className="menu-item-price tabular">{dish.price} ETB</span>
              </div>
              <div style={{ fontSize: "0.8125rem", color: dish.fasting ? "#18542a" : "#78716c", fontStyle: "italic", marginBottom: "0.35rem" }}>
                {dish.fasting ? "የጾም · Fasting" : dish.category}
              </div>
              <p className="menu-item-ingredients">{dish.ingredients}</p>
              <div className="menu-item-footer">
                <span style={{ fontSize: "0.875rem", color: "#d52518", fontWeight: 700 }}>
                  Order &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}