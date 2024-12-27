"use client";
import { useAuthStore } from "@/stores/use-auth-store";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactElement } from "react";
import React, { useEffect } from "react";

type AuthProviderProps = {
  children?: React.ReactNode;
  route: "public" | "private";
};

const DASHBOARD_ROUTE = "/dashboard";
const LOGIN_ROUTE = "/auth/sign-in";

export default function AuthProvider({
  children,
  route,
}: Readonly<AuthProviderProps>): ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect");
  const pathname = usePathname();

  const queryClient = useQueryClient();

  //#region  //*=========== STORE ===========
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = Boolean(useAuthStore((state) => state.accessToken));
  //#endregion  //*======== STORE ===========

  useEffect(() => {
    // run checkAuth every page visit
    const checkAuth = useAuthStore.subscribe(
      (state) => state.accessToken,
      (accessToken) => {
        if (!accessToken) {
          logout();
          queryClient.clear();
        }
      },
    );

    // run checkAuth every focus changes
    window.addEventListener("focus", checkAuth);
    return () => {
      window.removeEventListener("focus", checkAuth);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Prevent authenticated user from accessing auth or other role pages
      if (route === "public") {
        if (redirect) {
          router.replace(redirect);
        } else {
          router.replace(DASHBOARD_ROUTE);
        }
      }
    } else if (route !== "public" && pathname !== LOGIN_ROUTE) {
      router.replace(`${LOGIN_ROUTE}?redirect=${pathname}`);
    }
  }, [isAuthenticated]);

  // if (
  //   // If unauthenticated user want to access protected pages
  //   !isAuthenticated &&
  //   route === "private"
  // ) {
  //   return <Suspense fallback={<Loading />}>{children}</Suspense>;
  // }

  return <>{children}</>;
}
