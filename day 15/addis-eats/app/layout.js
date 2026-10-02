import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Order delicious food in Addis Ababa"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Addis Eats</h1>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2026 Addis Eats</p>
        </footer>
      </body>
    </html>
  );
}
