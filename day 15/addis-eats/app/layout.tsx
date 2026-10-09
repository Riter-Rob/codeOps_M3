import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import Providers from "./components/Providers";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://addis-eats-six.vercel.app"),
  title: {
    default: "Addis Eats Ethiopian Food Delivery",
    template: "%s  Addis Eats",
  },
  description: "Order Ethiopian food in Addis Ababa. Fresh Doro Wat, Tibs, and Beyainatu.",
  openGraph: {
    title: "Addis Eats",
    description: "Ethiopian food delivered to your door.",
    siteName: "Addis Eats",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="site-header">
            <div className="header-container">
              <Link href="/" className="brand-title">
                Addis Eats
              </Link>

              <nav className="header-nav" aria-label="Main Navigation">
                <Link href="/menu">Menu</Link>
                <Link href="/orders">Orders</Link>
                <Link href="/order-status">Live Status</Link>
                <Link href="/kitchen">Kitchen</Link>
                <Link href="/cart" className="cart-pill">Cart</Link>
              </nav>
            </div>
          </header>

          <main>{children}</main>

          <footer>
            <p>Addis Eats · Food delivery in Bole, Kazanchis, Megenagna &amp; Piassa · Open daily 11am – 10pm</p>
          </footer>
        </Providers>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ADDISEATS123"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
