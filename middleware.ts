import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

export default clerkMiddleware(
  async (auth, req) => {
    const url = req.nextUrl;

    // // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3001)
    let hostname = req.headers
      .get('host')!
      .replace('.localhost:3001', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

    const searchParams = req.nextUrl.searchParams.toString();
    // // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

    const { userId, sessionClaims } = await auth();

    // // For users visiting /onboarding, don't try to redirect
    if (userId) {
      if (path === '/onboarding') {
        return NextResponse.next();
      }

      // if signed in and trying to access login page, redirect to home
      if (path === '/login') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } else {
      // if signed out and trying to access home page, redirect to login
      // if (path === '/') {
      //   return NextResponse.rewrite(new URL('/home', req.url));
      // }
    }

    // If the user isn't signed in and the route is private, redirect to sign-in
    // if (!userId && !isPublicRoute(req))
    //   return redirectToSignIn({ returnBackUrl: req.url });

    // // If user is logged out and trying to access app, redirect to login
    if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
      if (!userId && path !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url));
      } else if (userId && path === '/login') {
        // if the user is logged in and tries to access the login page, redirect to home (using request url)
        return NextResponse.redirect(new URL('/', req.url));
      }

      if (userId && !sessionClaims?.metadata?.onboardingComplete) {
        const onboardingUrl = new URL('/onboarding', req.url);
        return NextResponse.redirect(onboardingUrl);
      }

      return NextResponse.rewrite(new URL(`/app${path === '/' ? '' : path}`, req.url));
    }

    // Rewrite root application to `/home` folder
    // if (hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    //   return NextResponse.rewrite(new URL(`/home${path === '/' ? '' : path}`, req.url));
    // }

    // Rewrite everything else to `/[domain]/[slug]` dynamic route
    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
  },
  { debug: process.env.NODE_ENV === 'development' },
);

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};
