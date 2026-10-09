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
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <Link href="/menu">Menu</Link>
        <span className="separator">/</span>
        <span style={{ color: "#6b7280" }}>{dish.name}</span>
      </nav>

      <div
        className="food-card"
        style={{
          background: "#ffffff",
          border: "1px solid #e5dcc3",
          borderRadius: "26px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(24, 84, 42, 0.08)",
          color: "inherit",
          cursor: "default"
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "260px", overflow: "hidden", background: "#f8f6f0" }}>
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            priority
            sizes="(max-width: 720px) 100vw, 680px"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div style={{ padding: "1.35rem 1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.35rem" }}>
            <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "#18542a" }}>{dish.name}</h1>
            <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#d52518" }} className="tabular">
              {dish.price} ETB
            </div>
          </div>

          <div style={{ marginBottom: "0.85rem", fontSize: "0.875rem", color: dish.fasting ? "#18542a" : "#6b7280", fontStyle: "italic" }}>
            {dish.fasting ? "የጾም · Fasting" : dish.category}
          </div>

          <div style={{ marginBottom: "0.85rem" }}>
            <strong style={{ fontSize: "0.85rem", color: "#18542a", display: "block", marginBottom: "0.2rem" }}>
              Ingredients
            </strong>
            <p style={{ margin: 0, fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.5 }}>
              {dish.ingredients}
            </p>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <strong style={{ fontSize: "0.85rem", color: "#18542a", display: "block", marginBottom: "0.2rem" }}>
              About this dish
            </strong>
            <p style={{ margin: 0, fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.55 }}>
              {dish.summary}
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", borderTop: "1px solid #f3e8cc", paddingTop: "1.15rem" }}>
            <Link href="/menu" className="btn btn-secondary" style={{ borderRadius: "9999px" }}>
              &larr; Back to Menu
            </Link>
            <Link href="/checkout" className="btn btn-primary" style={{ borderRadius: "9999px" }}>
              Order This Dish ({dish.price} ETB)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}