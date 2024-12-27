import type { ReactElement } from "react";
import React from "react";
import SignInForm from "@/components/forms/signin-form";

export default function SignInPage(): ReactElement {
  return (
    <div className="tw-flex tw-justify-center tw-items-center" style={{zIndex : 0}}>
      <div className="tw-bg-white tw-h-[295px] tw-fixed  tw-w-full tw-top-0 tw-left-0 tw-shadow-lg" style={{zIndex: 1}}/>
      <div className="tw-flex tw-flex-col tw-items-center tw-space-y-20 tw-mt-40" style={{zIndex : 2}}>
        <div className="tw-rounded-3xl xl:tw-w-[40rem] md:tw-w-[30rem] sm: tw-w-[20rem] tw-shadow-2xl"
          style={
            {
              boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.3)',
            }
        }>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
