import { Geist, Geist_Mono } from "next/font/google";
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
          <header>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.25rem" }}>Addis Eats</div>
            <p>Discover delicious Ethiopian dishes</p>
          </header>

          <main>{children}</main>

          <footer>
            <p>© 2026 Addis Eats</p>
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
