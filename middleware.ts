import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

enum Roles {
  ADMIN = 'admin',
  USER = 'user',
  PROVIDER = 'provider',
  EDITOR = 'editor',
}

const routes = {
  [Roles.USER]: ['/account'],
  [Roles.PROVIDER]: [
    '/account',
    '/dashboard/performance',
    '/dashboard/market-trends',
    '/dashboard/opportunities',
  ],
  [Roles.ADMIN]: [
    '/account',
    '/dashboard/referral',
    '/dashboard/routes-list',
    '/dashboard/partners',
    '/dashboard/blog',
    '/dashboard/header',
    '/dashboard/footer',
    '/dashboard/template',
    '/dashboard/template/create',
  ],
  [Roles.EDITOR]: [
    '/account',
    '/dashboard/blog',
    '/dashboard/header',
    '/dashboard/footer',
    '/dashboard/template',
    '/dashboard/template/create',
  ],
};

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const response = NextResponse.next();
  response.headers.set('x-url', currentPath);

  if (
    currentPath.startsWith('/dashboard') ||
    currentPath.startsWith('/account')
  ) {
    const token =
      cookies().get('access_token')?.value ||
      request.cookies.get('access_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);

      const userRole = payload.role as Roles;
      if (
        !userRole ||
        !routes[userRole]
        // && process.env.NODE_ENV === 'production'
      ) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      const currentPath = request.nextUrl.pathname;
      const allowedRoutes = routes[userRole];

      if (
        !allowedRoutes.some((route) => currentPath.startsWith(route))
        // && process.env.NODE_ENV === 'production'
      ) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      console.error('JWT verification failed:', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico).*)',
};
