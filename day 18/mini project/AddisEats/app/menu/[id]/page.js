import Image from "next/image";
import { notFound } from "next/navigation";

const dishes = [
  { id: "1", name: "Shiro", image: "/dishes/shiro.jpg" },
  { id: "2", name: "cake", image: "/dishes/cake.jpg" },
  { id: "3", name: "Pasta", image: "/dishes/pasta.jpg" },
];

export async function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = dishes.find((dish) => dish.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <div>
      <h1>{dish.name}</h1>
      <p style={{ margin: "0.5rem 0 1rem" }}>Dish ID: {dish.id}</p>
      <div style={{ maxWidth: "450px" }}>
        <Image
          src={dish.image}
          alt={`${dish.name} - detailed culinary presentation`}
          width={300}
          height={200}
          sizes="(max-width: 640px) 100vw, 450px"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </div>
    </div>
  );
}