import Link from "next/link";
import { Suspense } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import DishSearch from "./DishSearch";
import NavigationButton from "./NavigationButton";
import FilterShell from "./FilterShell";

export const revalidate = 60;

export const metadata = {
  title: "Menu & Specialties",
  description: "Browse our authentic Ethiopian menu featuring traditional stews, grilled specialties, and vegan fasting platters.",
  alternates: {
    canonical: "/menu",
  },
};

export default async function Menu() {
  return (
    <div>
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span style={{ color: "var(--color-text-muted)" }}>Menu & Specialties</span>
      </nav>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>Authentic Ethiopian Menu</h1>
          <p style={{ marginTop: "0.25rem", color: "var(--color-text-muted)" }}>
            Handcrafted with organic Ethiopian spices, slow-simmered sauces, and fresh teff injera.
          </p>
        </div>
        <NavigationButton />
      </div>

      <Suspense fallback={<p style={{ color: "var(--color-text-muted)" }}>Loading live search...</p>}>
        <DishSearch />
      </Suspense>

      <CategoryBar />

      <FilterShell>
        <Suspense fallback={<p style={{ color: "var(--color-text-muted)" }}>Loading culinary specialties...</p>}>
          <DishList />
        </Suspense>
      </FilterShell>
    </div>
  );
}