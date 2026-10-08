import Image from "next/image";
import Link from "next/link";
import { dishes } from "@/app/data/dishes";

export default async function DishList() {
  return (
    <div>
      <h2>Available Dishes</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
        {dishes.map((dish) => (
          <Link
            key={dish.id}
            href={`/menu/${dish.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", background: "#fff" }}>
              <Image
                src={dish.image}
                alt={dish.name}
                width={300}
                height={200}
                sizes="(max-width: 640px) 100vw, 300px"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div style={{ padding: "0.75rem" }}>
                <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>{dish.name}</p>
                <p style={{ color: "#b45309", fontWeight: "600", fontSize: "0.875rem" }}>{dish.price} ETB</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}