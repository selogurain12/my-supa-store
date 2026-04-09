import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function requireAdmin(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token?.role || token.role !== "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export async function handleABTest(request: NextRequest) {
  const response = NextResponse.next();
  const abPrefetch = request.nextUrl.searchParams.get("ab_prefetch");
  const existingCookie = request.cookies.get("ab_variant")?.value;

  let variant: "A" | "B";

  if (abPrefetch === "A" || abPrefetch === "B") {
    variant = abPrefetch;
    console.log(`[A/B Test] Forcing variant ${variant} via query param`);
  } else if (existingCookie === "A" || existingCookie === "B") {
    variant = existingCookie;
    console.log(`[A/B Test] Using existing cookie variant: ${variant}`);
  } else {
    variant = Math.random() < 0.5 ? "A" : "B";
    console.log(`[A/B Test] Generated new random variant: ${variant}`);
  }
  response.cookies.set("ab_variant", variant, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
    httpOnly: false,
  });

  console.log(`[A/B Test] Cookie set: ab_variant=${variant}`);

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const abResponse = await handleABTest(request);

  if (pathname.startsWith("/admin")) {
    return await requireAdmin(request);
  }

  return abResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
