import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import Providers from "./components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://addis-eats-six.vercel.app"),
  title: {
    default: "Addis Eats | Authentic Ethiopian Food & Cultural Books",
    template: "%s | Addis Eats",
  },
  description: "Browse and order authentic Ethiopian cuisine and cultural literature with fresh ingredients and traditional spices.",
  openGraph: {
    title: "Addis Eats",
    description: "Authentic Ethiopian cuisine, traditional wat stews, and cultural literature.",
    siteName: "Addis Eats",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          <header className="site-header">
            <div className="header-inner">
              <div className="brand-group">
                <Link href="/" className="brand-link">
                  <span className="brand-badge" aria-hidden="true">አዲስ</span>
                  <div>
                    <div className="brand-title">Addis Eats</div>
                    <p className="brand-tagline">Authentic Ethiopian Cuisine & Heritage</p>
                  </div>
                </Link>
              </div>

              <nav className="header-nav" aria-label="Main Navigation">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/menu" className="nav-link">Menu</Link>
                <Link href="/cart" className="nav-link">Cart</Link>
                <Link href="/orders" className="nav-link">Orders</Link>
                <Link href="/order-status" className="nav-link">Status</Link>
                <Link href="/kitchen" className="nav-link staff-nav">Kitchen</Link>
              </nav>
            </div>
          </header>

          <main>{children}</main>

          <footer>
            <p>© 2026 Addis Eats · Authentic Culinary Traditions of Addis Ababa</p>
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
