import { NextRequest, NextResponse } from 'next/server';
import { routes } from './shared/constant/routes';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === routes.index) {
    const url = request.nextUrl.clone();
    url.pathname = routes.dashboard;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
