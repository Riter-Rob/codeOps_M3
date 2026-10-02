import { notFound } from "next/navigation";

const dishes = [
  { id: "1", name: "Shiro" },
  { id: "2", name: "cake" },
  { id: "3", name: "Pasta" },
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
      <p>Dish ID: {dish.id}</p>
    </div>
  );
}