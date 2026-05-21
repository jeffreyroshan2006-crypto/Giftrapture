import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected admin routes
const ADMIN_ROUTES = ["/admin/dashboard", "/admin/dashboard/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is an admin route (using isAdmin flag cookie)
  if (pathname.startsWith("/admin/dashboard")) {
    const isAdmin = request.cookies.get("isAdmin");

    if (!isAdmin || isAdmin.value !== "true") {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
