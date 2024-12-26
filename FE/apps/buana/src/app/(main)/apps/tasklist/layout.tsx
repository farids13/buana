"use client";
import type {ReactElement} from "react";
import {TaskProvider} from "@/src/demo/components/apps/tasklist/context/task-context";

export default function AppLayout({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  return <TaskProvider>{children}</TaskProvider>;
}
