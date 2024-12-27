import EventCategoryForm from "@/components/forms/event-category-form";
import type { ReactElement } from "react";
import React from "react";

export default function AddEventCategory(): ReactElement {
  return (
    <div className="card bg-purple-50 tw-space-y-3 tw-min-h-[calc(100vh-4rem)]">
      <h2>Add Event Category</h2>
      <div className="tw-border-b-2 tw-border-dark-purple" />
      <EventCategoryForm />
    </div>
  );
}
