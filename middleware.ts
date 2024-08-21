import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

enum Roles {
  ADMIN = "admin",
  USER = "user",
  PROVIDER = "provider",
}

const routes = {
  [Roles.USER]: ["/account"],
  [Roles.PROVIDER]: [
    "/account",
    "/dashboard/performance",
    "/dashboard/market-trends",
    "/dashboard/opportunities",
  ],
  [Roles.ADMIN]: [
    "/account",
    "/dashboard/referral",
    "/dashboard/routes-list",
    "/dashboard/partners",
  ],
};

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

export async function middleware(request: NextRequest) {
  const token = cookies().get("access_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);

    if (!payload.role) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const currentPath = request.nextUrl.pathname;

    if (!routes[payload.role as Roles].includes(currentPath)) {
      console.log(1);
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/performance",
    "/dashboard/referral",
    "/dashboard/market-trends",
    "/dashboard/opportunities",
    "/dashboard/routes-list",
    "/dashboard/partners",
    "/account",
  ],
};
//
