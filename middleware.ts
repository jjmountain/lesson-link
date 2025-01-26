import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
    // Skip auth for webhook routes
    if (req.nextUrl.pathname.startsWith('/api/webhooks')) {
      return NextResponse.next();
    }

  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3001)
  let hostname = req.headers.get("host")!.replace(".localhost:3001", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  console.log("Middleware request:", {
    hostname,
    path: req.nextUrl.pathname,
    fullUrl: req.url
  });

  // special case for Vercel preview deployment URLs
  if (hostname.includes("---") && hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)) {
    hostname = `${hostname.split("---")[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
// Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  
  // rewrites for app pages
  // If user is logged out and trying to access app, redirect to login
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {

    const { userId } = await auth()
    if (!userId && path !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (userId && path === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // this gets triggered in any case where the hostname is app.localhost:3001, there is a user
    // could this cause an infinite loop?
    // answer: no, it doesn't
    // reason: the user is already logged in, so the middleware doesn't get triggered again
    console.log("Rewriting to app page");
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url),
    );
  }
  // rewrite root application to `/home` folder
  if (hostname === "localhost:3001" || hostname === "legal-touching-teal.ngrok-free.app" || hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    console.log("Rewriting to home page");
    return NextResponse.rewrite(new URL(`/home${path === "/" ? "" : path}`, req.url));
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  console.log("Rewriting to dynamic route", {
    hostname,
    path,
    fullUrl: req.url
  });
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));

}, { debug: process.env.NODE_ENV === 'development' });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes (except webhooks)
//     '/(api(?!/webhooks))(.*)',
//     '/trpc/(.*)',
//   ],
// };

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

// export default async function middleware(req: NextRequest) {
//   const url = req.nextUrl;

//   // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
//   let hostname = req.headers
//     .get("host")!
//     .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

//   // special case for Vercel preview deployment URLs
//   if (
//     hostname.includes("---") &&
//     hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
//   ) {
//     hostname = `${hostname.split("---")[0]}.${
//       process.env.NEXT_PUBLIC_ROOT_DOMAIN
//     }`;
//   }

//   const searchParams = req.nextUrl.searchParams.toString();
//   // Get the pathname of the request (e.g. /, /about, /blog/first-post)
//   const path = `${url.pathname}${
//     searchParams.length > 0 ? `?${searchParams}` : ""
//   }`;

//   // rewrites for app pages
//   if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
//     const session = await getToken({ req });
//     if (!session && path !== "/login") {
//       return NextResponse.redirect(new URL("/login", req.url));
//     } else if (session && path == "/login") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//     return NextResponse.rewrite(
//       new URL(`/app${path === "/" ? "" : path}`, req.url),
//     );
//   }

//   // special case for `vercel.pub` domain
//   if (hostname === "vercel.pub") {
//     return NextResponse.redirect(
//       "https://vercel.com/blog/platforms-starter-kit",
//     );
//   }

//   // rewrite root application to `/home` folder
//   if (
//     hostname === "localhost:3000" ||
//     hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
//   ) {
//     return NextResponse.rewrite(
//       new URL(`/home${path === "/" ? "" : path}`, req.url),
//     );
//   }

//   // rewrite everything else to `/[domain]/[slug] dynamic route
//   return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
// }
