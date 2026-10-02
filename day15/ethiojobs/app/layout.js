import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "EthioJobs — Ethiopian Tech Jobs",
  description: "Find and apply for engineering, design, and professional jobs in Ethiopia"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="page-shell">
          {children}
        </div>
        <footer className="site-footer">
          <div className="page-shell">
            &copy; {new Date().getFullYear()} EthioJobs &mdash; Practice project
          </div>
        </footer>
      </body>
    </html>
  );
}
