"use client";

import type {ReactElement} from "react";
import {ChatProvider} from "@/src/demo/components/apps/chat/context/chat-context";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({children}: ChatLayoutProps): ReactElement {
  return <ChatProvider>{children}</ChatProvider>;
}
