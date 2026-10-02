"use client";

import { useState } from "react";
import Link from "next/link";

export default function CartClient() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Kitfo",
      price: 350,
      quantity: 1
    },
    {
      id: 3,
      name: "Shiro",
      price: 250,
      quantity: 2
    }
  ]);

  function updateQuantity(id, delta) {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-box">
        <p>Your cart is empty.</p>
        <Link href="/menu" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-box">
      {cart.map((item) => (
        <article key={item.id} className="cart-item">
          <div>
            <h3>{item.name}</h3>
            <p style={{ color: "#78716c", fontSize: "0.9rem" }}>{item.price} ETB each</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button type="button" onClick={() => updateQuantity(item.id, -1)} className="btn">
              -
            </button>
            <span style={{ minWidth: "24px", textAlign: "center", fontWeight: "bold" }}>
              {item.quantity}
            </span>
            <button type="button" onClick={() => updateQuantity(item.id, 1)} className="btn">
              +
            </button>
            <span style={{ minWidth: "80px", textAlign: "right", fontWeight: "600" }}>
              {item.price * item.quantity} ETB
            </span>
          </div>
        </article>
      ))}

      <div className="cart-total">
        <strong>Total: {total} ETB</strong>
      </div>

      <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
        <Link href="/menu" className="btn">
          Add More Dishes
        </Link>
        <Link href="/checkout" className="btn btn-primary">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
