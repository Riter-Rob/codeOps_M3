import Link from "next/link";
import { Suspense } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import DishSearch from "./DishSearch";
import NavigationButton from "./NavigationButton";

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
  const search = params?.search || "";

  return (
    <div className="menu-page-container">
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Menu</span>
      </nav>

      <div className="page-heading">
        <h1>Today&rsquo;s menu</h1>
        <p>Nine Ethiopian favorites, cooked to order and delivered across Addis Ababa.</p>
      </div>

      <div className="menu-top-toolbar">
        <Suspense fallback={<div className="search-pill-bar" />}>
          <DishSearch />
        </Suspense>
        <div className="menu-promo-cards">
          <div className="promo-badge-card">
            <div>
              <strong>Fast delivery</strong>
              <span>Bole &amp; Kazanchis</span>
            </div>
          </div>
          <NavigationButton />
        </div>
      </div>

      <Suspense fallback={null}>
        <CategoryBar />
      </Suspense>

      <Suspense fallback={<p className="helper-text">Loading dishes...</p>}>
        <DishList category={category} search={search} />
      </Suspense>
    </div>
  );
}
