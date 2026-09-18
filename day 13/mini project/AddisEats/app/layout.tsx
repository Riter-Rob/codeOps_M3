import "./globals.css";
import Providers from "./components/Providers";

export const metadata = {
  title: "Addis Eats",
  description: "Discover delicious Ethiopian dishes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}
