import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
];

const protectedRoutes = ["/feed", "/profile", "/onboarding"];

const isPublicRoute = (pathname: string) => {
  return publicRoutes.some((route) => pathname === route);
};

const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.some((route) => pathname.startsWith(route));
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  const accessTokenFromGoogle =
    searchParams.get("access_token") || searchParams.get("token");

  if (
    accessTokenFromGoogle &&
    (pathname === "/onboarding" || pathname === "/feed")
  ) {
    return NextResponse.next();
  }

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  if (isProtectedRoute(pathname) && !token) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
