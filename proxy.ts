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

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    return await requireAdmin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
