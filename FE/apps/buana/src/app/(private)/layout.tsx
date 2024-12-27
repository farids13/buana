import AuthProvider from "@/components/auth-provider";
import Layout from "@/components/layout";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import '@/styles/main/style.css'

interface MainLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "Notulensia",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function MainLayout({
  children,
}: Readonly<MainLayoutProps>): ReactElement {
  return (
    <Layout>
      <AuthProvider route="private"> {children}</AuthProvider>
    </Layout>
  );
}
