"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { dishes } from "../data/dishes";
import { getCartTotals, MAX_QUANTITY } from "../lib/cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Demo cart is deliberately session-only: no customer data is stored in the browser.
  const [items, setItems] = useState([]);
  const [announcement, setAnnouncement] = useState("");

  const addItem = useCallback((id) => {
    const dish = dishes.find((entry) => String(entry.id) === String(id));
    if (!dish) return;
    setItems((current) => {
      const existing = current.find((item) => item.id === dish.id);
      if (existing) {
        return current.map((item) => item.id === dish.id
          ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + 1) }
          : item);
      }
      return [...current, { ...dish, quantity: 1 }];
    });
    setAnnouncement(`${dish.name} added to your cart.`);
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) return;
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity } : item));
  }, []);

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id));
    setAnnouncement("Dish removed from your cart.");
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAnnouncement("");
  }, []);

  const value = useMemo(
    () => ({ items, addItem, updateQuantity, removeItem, clearCart, ...getCartTotals(items) }),
    [items, addItem, updateQuantity, removeItem, clearCart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("Cart controls must be inside CartProvider.");
  return cart;
}
