import AudienceGroupForm from "@/components/forms/audience-group-form";
import type { ReactElement } from "react";
import React from "react";

export default function EditAudienceGroupPage(): ReactElement {
  return (
    <div className="card bg-purple-50 tw-space-y-3 tw-min-h-[calc(100vh-4rem)]">
      <h2>Edit Audience Group</h2>
      <div className="tw-border-b-2 tw-border-dark-purple" />
      <AudienceGroupForm edit />
    </div>
  );
}
