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
    <div className="menu-page-container">
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span style={{ color: "#6b7280" }}>Menu</span>
      </nav>

      <div className="menu-top-toolbar">
        <div className="menu-search-wrapper">
          <Suspense fallback={<div className="search-pill-bar" />}>
            <DishSearch />
          </Suspense>
        </div>

        <div className="menu-promo-cards">
          <div className="promo-badge-card">
            
            <div>
              <strong>Fast Delivery</strong>
              <span>Bole & Kazanchis</span>
            </div>
          </div>

          <div className="promo-badge-card">
            
            <div>
              <strong>Hot & Fresh</strong>
              <span>Made to order</span>
            </div>
          </div>

          <NavigationButton />
        </div>
      </div>

      <div className="categories-section-wrapper">
        <h2 className="categories-section-title">Categories</h2>
        <Suspense fallback={null}>
          <CategoryBar />
        </Suspense>
      </div>

      <FilterShell>
        <Suspense fallback={<p style={{ color: "#6b7280" }}>Loading dishes...</p>}>
          <DishList category={category} />
        </Suspense>
      </FilterShell>
    </div>
  );
}