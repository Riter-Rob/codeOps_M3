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
  title: "Addis Eats",
  description: "Discover delicious Ethiopian dishes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          <header>
            <h1>Addis Eats</h1>
            <p>Discover delicious Ethiopian dishes</p>
          </header>

          <main>{children}</main>

          <footer>
            <p>© 2026 Addis Eats</p>
          </footer>
        </Providers>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ADDIS123"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
