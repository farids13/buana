import EventForm from "@/components/forms/events/event-form";
import type { ReactElement } from "react";
import React from "react";

export default function EditEvent(): ReactElement {
  return (
    <div className="card bg-purple-50 tw-space-y-3">
      <h2>Edit Event</h2>
      <div className="tw-border-b-2 tw-border-dark-purple" />
      <EventForm edit />
    </div>
  );
}
