import type { ReactElement } from "react";
import React from "react";
import Calendar from "@/components/ui/calendar";

export default function CalendarPage(): ReactElement {
  return (
    <div className="tw-space-y-8">
      <div className="bg-purple-50 tw-p-6 tw-rounded-xl tw-min-h-[calc(100vh-9rem)]">
        <Calendar />
      </div>
    </div>
  );
}
