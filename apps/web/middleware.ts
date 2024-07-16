import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenExpired } from "./utils/token-checker";

 export function middleware(request: NextRequest) {
  const token = localStorage.getItem("token");

  if (token && !isTokenExpired(token)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/login", "/dashboard"],
};
