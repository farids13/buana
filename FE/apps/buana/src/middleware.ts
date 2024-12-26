import { createServerClient } from '@supabase/ssr'
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/dashboard"];
const loginRoutes = "/auth/login2";
const publicRoutes = [loginRoutes];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const response = NextResponse.next();
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // const supabase = createServerClient(
  //   process.env.NEXT_PUBLIC_SUPA_API_URL!,
  //   process.env.NEXT_PUBLIC_SUPA_ANON_KEY!,
  //   {
  //     cookies: {
  //       get(name: string) {
  //         return req.cookies.get(name)?.value
  //       },
  //     },
  //   }
  // )

  // const { data: { session } } = await supabase.auth.getSession()
  
  // console.log("Session status:", !!session)

  // // Jalur Protected
  // if (isProtectedRoute) {
  //   return NextResponse.redirect(new URL(loginRoutes, req.nextUrl));
  // }
  
  // // Jalur Public
  // if (isPublicRoute) {
  //   return NextResponse.redirect(new URL("/", req.nextUrl));
  // }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}