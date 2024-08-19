import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

export async function middleware(request: NextRequest) {
  // const token = cookies().get("access_token")?.value;

  // if (!token) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  // try {
  //   const { payload } = await jwtVerify(token, SECRET_KEY);
  //   console.log("Decoded JWT:", payload);
  // } catch (error) {
  //   console.error("JWT verification failed:", error);
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/performance"],
};
