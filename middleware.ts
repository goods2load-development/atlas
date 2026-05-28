import { decodeJwt } from 'jose';
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
    '/dashboard/atlas',
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
    '/dashboard/atlas',
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

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const response = NextResponse.next();
  response.headers.set('x-url', currentPath);

  // Atlas & Ops dashboards are always public — auth gate handled client-side
  if (
    currentPath.startsWith('/dashboard/atlas') ||
    currentPath.startsWith('/dashboard/ops') ||
    currentPath.startsWith('/dashboard/freightforwardingcompany')
  ) {
    return response;
  }

  if (
    currentPath.startsWith('/dashboard') ||
    currentPath.startsWith('/account')
  ) {
    const token = request.cookies.get('access_token')?.value;

    if (!token) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', currentPath);
      return NextResponse.redirect(signInUrl);
    }

    try {
      // Decode without signature verification — the backend verifies the token
      // on every API call, so this middleware only needs to read the role claim
      // for client-side route gating.
      const payload = decodeJwt(token);
      const userRole = payload.role as Roles;

      if (!userRole || !routes[userRole]) {
        const signInUrl = new URL('/sign-in', request.url);
        return NextResponse.redirect(signInUrl);
      }

      const allowedRoutes = routes[userRole];
      if (!allowedRoutes.some((route) => currentPath.startsWith(route))) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      // Token exists but isn't a valid JWT format at all
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', currentPath);
      return NextResponse.redirect(signInUrl);
    }
  }

  return response;
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico).*)',
};
