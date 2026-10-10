"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { MAX_QUANTITY } from "../lib/cart";

export default function FoodCard({ dish }) {
  const { items, addItem } = useCart();
  const quantity = items.find((item) => item.id === dish.id)?.quantity || 0;
  return (
    <article className="food-card">
      <Link href={`/menu/${dish.id}`} className="food-card-media" aria-label={`View ${dish.name} details`}>
        <Image src={dish.image} alt={dish.name} fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px" className="food-card-img" />
      </Link>
      <div className="food-card-body">
        <div className="food-card-header">
          <h3 className="food-card-title"><Link href={`/menu/${dish.id}`}>{dish.name}</Link></h3>
          <span className="food-card-price tabular">{dish.price} ETB</span>
        </div>
        <span className="dish-category">{dish.fasting ? "Fasting · Plant-based" : dish.category}</span>
        <p className="food-card-desc">{dish.summary || dish.ingredients}</p>
        <div className="food-card-controls">
          <Link href={`/menu/${dish.id}`} className="dish-details-link">Details</Link>
          <button type="button" className="btn btn-primary" onClick={() => addItem(dish.id)}
            disabled={quantity >= MAX_QUANTITY} aria-label={`Add ${dish.name} to cart`}>
            {quantity >= MAX_QUANTITY ? "Limit reached" : quantity > 0 ? `Add more (${quantity})` : "+ Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
