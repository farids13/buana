import type { ReactElement } from "react";
import React from "react";
import Image from "next/image";
import SettingForm from "@/components/forms/setting-form";

export default function SettingsPage(): ReactElement {
  return (
    <div className="card bg-purple-50 tw-space-y-3 tw-min-h-[calc(100vh-4rem)] tw-flex tw-flex-col p-5">
      <h2>Settings</h2>
      <div className="tw-border-b-2 tw-border-dark-purple" />
      <div className="tw-flex tw-flex-row tw-space-x-16 tw-flex-1">
        <Image
          alt="setting logo"
          className="tw-aspect-square tw-h-full tw-my-auto"
          height={490}
          src="/img/setting.png"
          width={490}
        />
        <SettingForm />
      </div>
    </div>
  );
}
