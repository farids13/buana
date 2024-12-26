"use client";
import type {ReactElement} from "react";
import AppMailLayout from "@/src/demo/components/apps/mail/app-mail-layout";

interface AppMailLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({
  children,
}: AppMailLayoutProps): ReactElement {
  return <AppMailLayout>{children}</AppMailLayout>;
}
