import { NextResponse } from "next/server";
import { getSession } from "./lib/auth";

export async function middleware(request) {
  const session = await getSession(request);

  if (!session) {
    const signInUrl = new URL("/sign-in", request.url);
    const next = request.nextUrl.pathname + request.nextUrl.search;
    signInUrl.searchParams.set("next", next);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/orders", "/orders/:path*"]
};
