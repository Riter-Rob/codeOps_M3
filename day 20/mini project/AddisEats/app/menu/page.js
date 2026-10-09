import Link from "next/link";
import { Suspense } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import DishSearch from "./DishSearch";
import NavigationButton from "./NavigationButton";
import FilterShell from "./FilterShell";

export const revalidate = 60;

export const metadata = {
  title: "Menu",
  description: "Browse our authentic Ethiopian menu featuring traditional stews, grilled specialties, and vegan fasting platters.",
  alternates: {
    canonical: "/menu",
  },
};

export default async function Menu({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || "all";

  return (
    <div>
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span style={{ color: "#6b7280" }}>Menu</span>
      </nav>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>Menu</h1>
          <p style={{ marginTop: "0.25rem", color: "#6b7280" }}>
            Meals
          </p>
        </div>
        <NavigationButton />
      </div>

      <Suspense fallback={<p style={{ color: "#6b7280" }}>Loading search...</p>}>
        <DishSearch />
      </Suspense>

      <Suspense fallback={null}>
        <CategoryBar />
      </Suspense>

      <FilterShell>
        <Suspense fallback={<p style={{ color: "#6b7280" }}>Loading dishes...</p>}>
          <DishList category={category} />
        </Suspense>
      </FilterShell>
    </div>
  );
}