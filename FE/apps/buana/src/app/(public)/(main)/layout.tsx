import AuthProvider from "@/components/auth-provider";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import React from "react";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Buana",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function LandingLayout({
  children,
}: Readonly<LandingLayoutProps>): ReactElement {
  return (
    <div className="layout tw-min-h-screen tw-flex tw-items-center tw-flex-col">
      <AuthProvider route="public">{children}</AuthProvider>
    </div>
  );
}
