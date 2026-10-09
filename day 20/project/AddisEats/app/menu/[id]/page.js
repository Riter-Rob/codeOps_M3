import Image from "next/image";
import Link from "next/link";
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
    title: `${dish.name} - ${dish.price} ETB`,
    description: dish.summary,
    alternates: {
      canonical: `/menu/${dish.id}`,
    },
    openGraph: {
      title: `${dish.name} - ${dish.price} ETB | Addis Eats`,
      description: dish.summary,
      images: [
        {
          url: `/menu/${dish.id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${dish.name} - Authentic Ethiopian dish at Addis Eats`,
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
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <Link href="/menu">Menu</Link>
        <span className="separator">/</span>
        <span style={{ color: "#706b61" }}>{dish.name}</span>
      </nav>

      <div
        style={{
          background: "#fffefa",
          border: "1px solid #e7e0d4",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Image
          src={dish.image}
          alt={dish.name}
          width={720}
          height={380}
          priority
          sizes="(max-width: 720px) 100vw, 720px"
          style={{ width: "100%", height: "auto", display: "block" }}
        />

        <div style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "1.625rem", color: "#365746" }}>{dish.name}</h1>
            <div style={{ fontSize: "1.375rem", fontWeight: "700", color: "#ad503c" }} className="tabular">
              {dish.price} ETB
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <span className={`tag ${dish.fasting ? "tag-fasting" : "tag-meat"}`}>
              {dish.fasting ? "የጾም / Fasting" : dish.category}
            </span>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <strong style={{ fontSize: "0.875rem", color: "#18542a", display: "block", marginBottom: "0.25rem" }}>
              Ingredients
            </strong>
            <p style={{ margin: 0, fontSize: "0.9375rem", color: "#4b5563" }}>
              {dish.ingredients}
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <strong style={{ fontSize: "0.875rem", color: "#18542a", display: "block", marginBottom: "0.25rem" }}>
              About this dish
            </strong>
            <p style={{ margin: 0, fontSize: "0.9375rem", color: "#4b5563", lineHeight: 1.6 }}>
              {dish.summary}
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", borderTop: "1px solid #e5dcc3", paddingTop: "1.25rem" }}>
            <Link href="/menu" className="btn btn-secondary">
              &larr; Back to Menu
            </Link>
            <Link href="/checkout" className="btn btn-primary">
              Order This Dish ({dish.price} ETB)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}