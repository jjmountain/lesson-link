import { NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(
  async (auth, req) => {
    // Skip auth for webhook routes
    if (req.nextUrl.pathname.startsWith('/api/webhooks')) {
      return NextResponse.next();
    }

    const url = req.nextUrl;

    // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3001)
    let hostname = req.headers
      .get('host')!
      .replace('.localhost:3001', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

    console.log('Middleware request:', {
      hostname,
      path: req.nextUrl.pathname,
      fullUrl: req.url,
    });

    // special case for Vercel preview deployment URLs
    if (
      hostname.includes('---') &&
      hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
    ) {
      hostname = `${hostname.split('---')[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    }

    const searchParams = req.nextUrl.searchParams.toString();
    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

    const { userId } = await auth();
    // If user is logged out and trying to access app, redirect to login
    if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
      if (!userId && path !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url));
      } else if (userId && path === '/login') {
        return NextResponse.redirect(new URL('/', req.url));
      }

      console.log('going to app');
      console.log('user id', userId);
      return NextResponse.rewrite(new URL(`/app${path === '/' ? '' : path}`, req.url));
    }
    // rewrite root application to `/home` folder
    if (
      hostname === 'localhost:3001' ||
      hostname === 'legal-touching-teal.ngrok-free.app' ||
      hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
    ) {
      return NextResponse.rewrite(new URL(`/home${path === '/' ? '' : path}`, req.url));
    }

    // rewrite everything else to `/[domain]/[slug] dynamic route
    console.log('Rewriting to dynamic route', {
      hostname,
      path,
      fullUrl: req.url,
    });
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
