import Image from "next/image";
import Link from "next/link";
import { dishes } from "@/app/data/dishes";

export default async function DishList() {
  return (
    <div>
      <h2 style={{ marginTop: "2rem" }}>Authentic Specialties</h2>
      <div className="dish-grid">
        {dishes.map((dish) => (
          <Link
            key={dish.id}
            href={`/menu/${dish.id}`}
            className="dish-card"
          >
            <div className="dish-card-image-wrap">
              <Image
                src={dish.image}
                alt={dish.name}
                width={300}
                height={200}
                sizes="(max-width: 640px) 100vw, 300px"
              />
            </div>
            <div className="dish-card-body">
              <div className="dish-card-title">{dish.name}</div>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", margin: "0.25rem 0 0.75rem", lineHeight: 1.45 }}>
                {dish.summary}
              </p>
              <div className="dish-card-price">{dish.price} ETB</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}