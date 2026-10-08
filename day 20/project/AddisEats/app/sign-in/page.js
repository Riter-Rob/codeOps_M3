import SignInForm from "./SignInForm";
import Link from "next/link";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your Addis Eats account to manage orders and track kitchen status.",
  alternates: {
    canonical: "/sign-in",
  },
};

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const nextUrl = params?.next || "";

  return (
    <div>
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className="separator">/</span>
        <span style={{ color: "var(--color-text-muted)" }}>Sign In</span>
      </nav>

      <SignInForm nextUrl={nextUrl} />
    </div>
  );
}
