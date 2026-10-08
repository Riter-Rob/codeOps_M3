import Image from "next/image";
import { notFound } from "next/navigation";
import { dishes } from "@/app/data/dishes";

export async function generateStaticParams() {
  return dishes.map((dish) => ({ id: String(dish.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = dishes.find((d) => String(d.id) === String(id));

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested Ethiopian dish could not be found.",
    };
  }

  return {
    title: `${dish.name} - $${dish.price}`,
    description: dish.summary,
    openGraph: {
      title: `${dish.name} - $${dish.price}`,
      description: dish.summary,
      images: [
        {
          url: `/menu/${dish.id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${dish.name} at Addis Eats`,
        },
      ],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = dishes.find((d) => String(d.id) === String(id));

  if (!dish) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.summary,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
    },
    image: dish.image,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>{dish.name}</h1>
      <p style={{ margin: "0.25rem 0", color: "#b45309", fontWeight: "600", fontSize: "1.25rem" }}>
        {dish.price} ETB
      </p>
      <p style={{ margin: "0.5rem 0 1rem", color: "#4b5563" }}>
        {dish.summary}
      </p>
      <div style={{ maxWidth: "450px" }}>
        <Image
          src={dish.image}
          alt={dish.name}
          width={300}
          height={200}
          sizes="(max-width: 640px) 100vw, 450px"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </div>
    </div>
  );
}