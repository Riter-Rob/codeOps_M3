import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishById, getDishes } from "../../../lib/dishes";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({
    id: String(dish.id)
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <article className="dish-detail">
      <h2>{dish.name}</h2>
      <p style={{ color: "#78716c", textTransform: "capitalize", fontSize: "0.9rem" }}>
        Category: {dish.category}
      </p>
      <p>{dish.description}</p>
      <p className="price" style={{ fontSize: "1.25rem", margin: "1rem 0" }}>
        {dish.price} ETB
      </p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
        <Link href="/cart" className="btn btn-primary">
          Add to Cart
        </Link>
        <Link href="/menu" className="btn">
          Back to Menu
        </Link>
      </div>
    </article>
  );
}
