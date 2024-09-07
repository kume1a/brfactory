import { NextRequest, NextResponse } from 'next/server';
import { isTokenExpired } from 'pocketbase';
import { routes } from './shared/contant/routes';

const isGuardedPage = (pathname: string) => ![routes.signIn].includes(pathname);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isGuardedPage(pathname)) {
    const authCookie = request.cookies.get('pb_auth');

    const token = authCookie?.value ? JSON.parse(authCookie.value).token : null;

    if (!token || isTokenExpired(token)) {
      const url = request.nextUrl.clone();
      url.pathname = routes.signIn;
      return NextResponse.redirect(url);
    }
  }

  if (pathname === routes.index) {
    const url = request.nextUrl.clone();
    url.pathname = routes.dashboard;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
