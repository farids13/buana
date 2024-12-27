import type { ReactElement } from "react";
import React from "react";
import { HiInformationCircle } from "react-icons/hi";
import { MdContactPhone, MdOutlineSecurity } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";

export default function HelpPage(): ReactElement {
  return (
    <div className="card bg-purple-50 tw-space-y-3 tw-min-h-[calc(100vh-4rem)] tw-flex tw-flex-col p-3">
      <div className="card !tw-bg-[#33479833] tw-space-y-3">
        <h2 className="tw-text-center p-2">How Can We Help?</h2>
        <div className="tw-border-b-2 tw-border-dark-purple tw-mx-10" />
        <div className="tw-flex tw-flex-col tw-items-center">
          <HiInformationCircle color="#4343BF" size={100} />
          <h4>Information</h4>
          <p className="tw-w-2/3 tw-text-center">
            Learn more about Notulensia, the advanced solution for schedule and meeting management. Discover how we streamline your experience in planning and organizing events and meetings.
          </p>
        </div>
      </div>
      <div className="tw-flex tw-space-x-16">
        <div className="tw-flex tw-flex-col tw-items-center tw-space-y-1">
          <div className="tw-rounded-full tw-bg-[#72C2D980] tw-p-3">
            <MdContactPhone color="#4343BF" size={60} />
          </div>
          <h4>Contact</h4>
          <p className="tw-text-center">
            All you need to know about contacting Notulensia Support and Sales
          </p>
        </div>
        <div className="tw-flex tw-flex-col tw-items-center tw-space-y-1">
          <div className="tw-rounded-full tw-bg-[#72C2D980] tw-p-3">
            <RiShutDownLine color="#4343BF" size={60} />
          </div>
          <h4>Getting Start</h4>
          <p className="tw-text-center">
            Understand how Notulensia works efficiently to simplify your daily tasks. With structured meeting governance and seamless integration, we elevate your management experience to the next level.
          </p>
        </div>
        <div className="tw-flex tw-flex-col tw-items-center tw-space-y-1">
          <div className="tw-rounded-full tw-bg-[#72C2D980] tw-p-3">
            <MdOutlineSecurity color="#4343BF" size={60} />
          </div>
          <h4>Security</h4>
          <p className="tw-text-center">
            Read about our security policies and our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
}
