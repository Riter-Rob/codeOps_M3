import { cookies } from "next/headers";

// Reading request cookies forces this page to be dynamically rendered at request time
export default async function Checkout() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");

  return (
    <div>
      <h1>Checkout</h1>
      <p>Complete your purchase!</p>
      <p>Theme cookie: {theme ? theme.value : "not set"}</p>
    </div>
  );
}