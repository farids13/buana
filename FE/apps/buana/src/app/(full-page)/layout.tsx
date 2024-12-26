import type {Metadata} from "next";
import type {ReactElement} from "react";
import React from "react";

interface FullPageLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "PrimeReact Avalon",
  description:
    "The ultimate collection of design-agnostic, flexible and accessible React UI Components.",
};

export default function FullPageLayout({
  children,
}: FullPageLayoutProps): ReactElement {
  return <>{children}</>;
}
