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
        <span style={{ color: "var(--color-text-muted)" }}>{dish.name}</span>
      </nav>

      <div className="card" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
          <h1 style={{ margin: 0 }}>{dish.name}</h1>
          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-ochre)", fontVariantNumeric: "tabular-nums" }}>
            {dish.price} ETB
          </div>
        </div>

        <p style={{ margin: "1rem 0 1.5rem", fontSize: "1.0625rem", lineHeight: 1.6, color: "var(--color-text-muted)" }}>
          {dish.summary}
        </p>

        <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--color-border)", marginBottom: "1.5rem", background: "var(--color-surface-subtle)" }}>
          <Image
            src={dish.image}
            alt={dish.name}
            width={600}
            height={400}
            sizes="(max-width: 640px) 100vw, 600px"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/menu" className="btn btn-secondary">
            &larr; Back to Menu
          </Link>
          <Link href="/checkout" className="btn btn-primary">
            Order This Dish
          </Link>
        </div>
      </div>
    </div>
  );
}