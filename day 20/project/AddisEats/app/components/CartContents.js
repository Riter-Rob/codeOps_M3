"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { MAX_QUANTITY } from "../lib/cart";

export default function CartContents() {
  const { items, itemCount, subtotal, deliveryFee, total, updateQuantity, removeItem } = useCart();
  if (!items.length) return (
    <div className="card empty-state">
      <h2>Your cart is waiting for something delicious.</h2>
      <p>Choose a dish from the menu to get started.</p>
      <Link href="/menu" className="btn btn-primary">Browse the menu &rarr;</Link>
    </div>
  );
  return (
    <div className="card">
      <ul className="cart-items">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <Image src={item.image} alt="" width={76} height={76} className="cart-thumbnail" />
            <div className="cart-item-info">
              <Link href={`/menu/${item.id}`} className="cart-item-name">{item.name}</Link>
              <p>{item.price} ETB each</p>
              <div className="quantity-control" role="group" aria-label={`Quantity for ${item.name}`}>
                <button type="button" disabled={item.quantity <= 1} onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                <span className="tabular" aria-label={`${item.quantity} portions`}>{item.quantity}</span>
                <button type="button" disabled={item.quantity >= MAX_QUANTITY} onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
              </div>
            </div>
            <div className="cart-item-end">
              <strong className="tabular">{item.price * item.quantity} ETB</strong>
              <button type="button" className="remove-item" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name} from cart`}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="price-row"><span>Subtotal ({itemCount} {itemCount === 1 ? "portion" : "portions"})</span><span className="tabular">{subtotal} ETB</span></div>
      <div className="price-row"><span>Demo delivery fee</span><span className="tabular">{deliveryFee} ETB</span></div>
      <div className="price-row price-total" aria-live="polite"><strong>Total</strong><strong className="tabular">{total} ETB</strong></div>
      <p className="helper-text">Session-only demo cart. Refreshing the page clears it. No payment or delivery is processed.</p>
      <div className="cart-actions">
        <Link href="/menu" className="btn btn-secondary">Keep browsing</Link>
        <Link href="/checkout" className="btn btn-primary">Continue to checkout &rarr;</Link>
      </div>
    </div>
  );
}
