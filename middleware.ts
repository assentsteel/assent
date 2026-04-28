import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";

const BLOCKED_COUNTRIES = ["cn", "us", "sg"]; // China, USA, Singapore

function isBlocked(request: NextRequest): boolean {
  const country =
    request.headers.get("x-vercel-ip-country")?.toLowerCase() || "";

  return BLOCKED_COUNTRIES.includes(country);
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  if (path.startsWith("/blocked")) {
    return NextResponse.next();
  }
  // 🚫 GEO BLOCKING
  if (isBlocked(request)) {
    return NextResponse.redirect(new URL("/blocked", request.url));
  }

  /* =================================
     🔥 CLEAN QUERY REDIRECTS (NEW)
     ================================= */

  if (path === "/projects-plants" && url.searchParams.has("sector")) {
    url.pathname = "/projects/industrial-oil-gas";
    url.search = ""; // remove ALL query params
    return NextResponse.redirect(url, 302);
  }

  if (path === "/projects-oil-gas-industry" && url.searchParams.has("sector")) {
    url.pathname = "/projects/industrial-oil-gas";
    url.search = ""; // remove ALL query params
    return NextResponse.redirect(url, 302);
  }

  /* =================================
     EXISTING LOGIC (UNCHANGED)
     ================================= */

  const response = NextResponse.next();

  // CORS headers
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://docs-rho-wine.vercel.app"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Define protected and public admin routes
  const isLoginPage = path === "/ASe25Nt@dmin/login";
  const isProtectedRoute =
    path.startsWith("/ASe25Nt@dmin") && !isLoginPage;

  const token = request.cookies.get("adminToken")?.value || "";
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || "your-secret-key"
  );

  // 🔹 1. If user is on login page and already has a valid token → redirect to /admin
  if (isLoginPage && token) {
    try {
      await jose.jwtVerify(token, secret);
      return NextResponse.redirect(
        new URL("/ASe25Nt@dmin", request.url)
      );
    } catch {
      // invalid token — let them stay on login
    }
  }

  // 🔹 2. If user is on a protected route and no valid token → redirect to login
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/ASe25Nt@dmin/login", request.url)
      );
    }

    try {
      await jose.jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(
        new URL("/ASe25Nt@dmin/login", request.url)
      );
    }
  }

  // Default (public routes)
  return response;
}

export const config = {
  matcher: [
    "/projects-plants",
    "/projects-oil-gas-industry",
    "/api/:path*",
    "/ASe25Nt@dmin/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ],
};




// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import * as jose from "jose";

// /* =========================
//    NONCE GENERATOR
// ========================= */
// function generateNonce() {
//   const array = new Uint8Array(16);
//   crypto.getRandomValues(array);
//   return btoa(String.fromCharCode(...array));
// }

// /* =========================
//    SECURITY HEADERS
// ========================= */
// function applySecurityHeaders(response: NextResponse, nonce: string) {

//   const csp = `
// default-src 'self';
// script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.google.com https://www.gstatic.com https://cdn.tiny.cloud;
// style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tiny.cloud;
// style-src-attr 'unsafe-inline';
// img-src 'self' data: blob: https:;
// font-src 'self' data: https://fonts.gstatic.com https://cdn.tiny.cloud;
// connect-src 'self' https://www.google.com https://www.gstatic.com https://www.google-analytics.com https://vitals.vercel-insights.com https://cdn.tiny.cloud https://api.resend.com;
// frame-src 'self' https://www.google.com;
// frame-ancestors 'self';
// media-src 'self' https://dl.dropboxusercontent.com blob:;
// object-src 'none';
// base-uri 'self';
// form-action 'self';
// upgrade-insecure-requests;
// `.replace(/\n/g, "");

//   response.headers.set("Content-Security-Policy", csp);
//   response.headers.set("x-nonce", nonce);

//   response.headers.set("X-Content-Type-Options", "nosniff");

//   response.headers.set(
//     "Referrer-Policy",
//     "strict-origin-when-cross-origin"
//   );

//   response.headers.set("X-Frame-Options", "SAMEORIGIN");

//   response.headers.set(
//     "Cross-Origin-Resource-Policy",
//     "same-origin"
//   );

//   // IMPORTANT: DO NOT set Cross-Origin-Embedder-Policy
//   // It breaks Dropbox images/videos

//   // existing CORS headers
//   response.headers.set(
//     "Access-Control-Allow-Origin",
//     "https://docs-rho-wine.vercel.app"
//   );

//   response.headers.set(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );

//   response.headers.set(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization"
//   );

//   return response;
// }

// /* =========================
//    MIDDLEWARE
// ========================= */
// export async function middleware(request: NextRequest) {

//   const nonce = generateNonce();

//   const url = request.nextUrl.clone();
//   const path = url.pathname;

//   /* =================================
//      CLEAN QUERY REDIRECTS
//   ================================= */

//   if (path === "/projects-plants" && url.searchParams.has("sector")) {

//     url.pathname = "/projects/industrial-oil-gas";
//     url.search = "";

//     return applySecurityHeaders(
//       NextResponse.redirect(url, 302),
//       nonce
//     );
//   }

//   if (path === "/projects-oil-gas-industry" && url.searchParams.has("sector")) {

//     url.pathname = "/projects/industrial-oil-gas";
//     url.search = "";

//     return applySecurityHeaders(
//       NextResponse.redirect(url, 302),
//       nonce
//     );
//   }

//   /* =================================
//      EXISTING LOGIC
//   ================================= */

//   let response = NextResponse.next();

//   // Define protected and public admin routes
//   const isLoginPage = path === "/ASe25Nt@dmin/login";

//   const isProtectedRoute =
//     path.startsWith("/ASe25Nt@dmin") && !isLoginPage;

//   const token =
//     request.cookies.get("adminToken")?.value || "";

//   const secret = new TextEncoder().encode(
//     process.env.JWT_SECRET || "your-secret-key"
//   );

//   // If user already logged in → redirect to admin dashboard
//   if (isLoginPage && token) {

//     try {

//       await jose.jwtVerify(token, secret);

//       return applySecurityHeaders(
//         NextResponse.redirect(
//           new URL("/ASe25Nt@dmin", request.url)
//         ),
//         nonce
//       );

//     } catch {}
//   }

//   // If protected route and not logged in
//   if (isProtectedRoute) {

//     if (!token) {

//       return applySecurityHeaders(
//         NextResponse.redirect(
//           new URL("/ASe25Nt@dmin/login", request.url)
//         ),
//         nonce
//       );
//     }

//     try {

//       await jose.jwtVerify(token, secret);

//     } catch {

//       return applySecurityHeaders(
//         NextResponse.redirect(
//           new URL("/ASe25Nt@dmin/login", request.url)
//         ),
//         nonce
//       );
//     }
//   }

//   return applySecurityHeaders(response, nonce);
// }

// /* =========================
//    MATCHER
// ========================= */

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico).*)",
//   ],
// };


