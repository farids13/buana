import type {ReactElement} from "react";
import React from "react";
import type {ChildContainerProps} from "@/types/types";
import AppMailSidebar from "./app-mail-sidebar";
import {MailProvider} from "./context/mail-context";

export default function AppMailLayout({
  children,
}): ReactElement<ChildContainerProps> {
  return (
    <MailProvider>
      <div className="card">
        <div className="flex flex-column md:flex-row gap-4">
          <div className="w-full md:w-3 xl:w-2 xl:p-3">
            <AppMailSidebar />
          </div>
          <div className="md:w-9 xl:w-10 xl:p-3">{children}</div>
        </div>
      </div>
    </MailProvider>
  );
}
