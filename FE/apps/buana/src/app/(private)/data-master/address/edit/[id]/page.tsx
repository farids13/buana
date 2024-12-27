import EventAddressForm from "@/components/forms/event-address-form";
import type { ReactElement } from "react";
import React from "react";

export default function EditEventAddress(): ReactElement {
  return (
    <div className="card bg-purple-50 tw-space-y-3">
      <h2>Edit Event Address</h2>
      <div className="tw-border-b-2 tw-border-dark-purple" />
      <EventAddressForm edit />
    </div>
  );
}
