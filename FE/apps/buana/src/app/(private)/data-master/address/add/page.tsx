import EventAddressForm from "@/components/forms/event-address-form";
import type { ReactElement } from "react";
import React from "react";

export default function AddEventAddress(): ReactElement {
  return (
    <div className="card bg-purple-50 tw-space-y-3 tw-min-h-[calc(100vh-4rem)]">
      <h2>Add Event Address</h2>
      <div className="tw-border-b-2 tw-border-dark-purple" />
      <EventAddressForm />
    </div>
  );
}
