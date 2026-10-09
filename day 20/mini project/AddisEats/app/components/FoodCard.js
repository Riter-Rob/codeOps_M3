"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FoodCard({ dish }) {
  const [isSaved, setIsSaved] = useState(false);

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  return (
    <Link
      href={`/menu/${dish.id}`}
      className="food-card"
      aria-label={`View ${dish.name}`}
    >
      <div className="food-card-media">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className="food-card-img"
        />
        <div className="food-card-gradient" />

        {/* Floating Top Elements */}
        <div className="food-card-topbar">
          <span className="food-card-badge">
            {dish.fasting ? "Veg" : dish.category || "Traditional"}
          </span>
          <button
            type="button"
            className={`food-card-bookmark ${isSaved ? "saved" : ""}`}
            onClick={toggleBookmark}
            aria-label={isSaved ? `Remove ${dish.name} bookmark` : `Bookmark ${dish.name}`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="food-card-body">
        <div className="food-card-header">
          <h3 className="food-card-title">{dish.name}</h3>
          <span className="food-card-price tabular">{dish.price} ETB</span>
        </div>

        <p className="food-card-desc">
          {dish.summary || dish.ingredients}
        </p>

        <div className="food-card-action">
          <span>Add to Cart</span>
        </div>
      </div>
    </Link>
  );
}
