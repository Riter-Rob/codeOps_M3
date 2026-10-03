import Image from "next/image";
import { notFound } from "next/navigation";

const dishes = [
  {
    id: "1",
    name: "Shiro",
    image: "/dishes/shiro.jpg",
    alt: "Rich spiced Ethiopian chickpea stew served bubbling hot in a clay pot"
  },
  {
    id: "2",
    name: "cake",
    image: "/dishes/cake.jpg",
    alt: "Traditional sweet Ethiopian spiced honey cake garnished with powdered sugar"
  },
  {
    id: "3",
    name: "Pasta",
    image: "/dishes/pasta.jpg",
    alt: "Italian-Ethiopian fusion pasta tossed with savory spiced berbere tomato sauce"
  },
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
          alt={dish.alt}
          width={300}
          height={200}
          sizes="(max-width: 640px) 100vw, 450px"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </div>
    </div>
  );
}