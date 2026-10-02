import SignInForm from "./SignInForm";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const nextUrl = params?.next || "";

  return (
    <div style={{ padding: "2rem" }}>
      <SignInForm nextUrl={nextUrl} />
    </div>
  );
}
