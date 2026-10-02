import Link from "next/link";
import { getDishes } from "../../lib/dishes";

export const revalidate = 3600;

export default async function MenuPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category;
  let dishes = await getDishes();

  if (category) {
    dishes = dishes.filter((d) => d.category === category);
  }

  return (
    <section>
      <h2>Our Menu</h2>
      {category && (
        <p style={{ margin: "0.5rem 0", color: "#78716c", fontSize: "0.9rem" }}>
          Showing category: <strong>{category}</strong> (<Link href="/menu">clear filter</Link>)
        </p>
      )}
      <div className="dish-grid">
        {dishes.map((dish) => (
          <article key={dish.id} className="dish-card">
            <div>
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
            </div>
            <div>
              <p className="price">{dish.price} ETB</p>
              <Link href={`/menu/${dish.id}`} className="btn">
                View Dish
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
