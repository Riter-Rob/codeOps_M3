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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#18542a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path d="M15 18H9" />
              <path d="M19 18h2a1 1 0 0 0 1-1v-5.2a2 2 0 0 0-.58-1.42l-2.84-2.84A2 2 0 0 0 17.16 7H15v11Z" />
              <circle cx="17" cy="18" r="2" />
              <circle cx="7" cy="18" r="2" />
            </svg>
            <div>
              <strong>Fast Delivery</strong>
              <span>Bole & Kazanchis</span>
            </div>
          </div>

          <div className="promo-badge-card">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f96015" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
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