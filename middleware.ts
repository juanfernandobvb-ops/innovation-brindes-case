import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith("/produtos");
  const isLoginRoute = pathname.startsWith("/login");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginRoute && token) {
    return NextResponse.redirect(new URL("/produtos", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/produtos/:path*"],
};