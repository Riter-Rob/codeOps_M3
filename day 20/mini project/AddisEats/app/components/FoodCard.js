"use client";

import Image from "next/image";
import Link from "next/link";

export default function FoodCard({ dish }) {
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
          <span>See More</span>
          <span aria-hidden="true">&rarr;</span>
        </div>
      </div>
    </Link>
  );
}
