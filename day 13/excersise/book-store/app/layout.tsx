import "./globals.css";
import Providers from "./components/Providers";

export const metadata = {
  title: "Book Store",
  description: "Browse and buy books",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header>
            <h1>Book Store</h1>
            <p>Browse and buy books</p>
          </header>

          <main>{children}</main>

          <footer>
            <p>2026 Book Store</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}