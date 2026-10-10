"use client";

import { CartProvider } from "./CartProvider";

export default function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
