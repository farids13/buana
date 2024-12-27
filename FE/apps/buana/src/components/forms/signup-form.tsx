import type { SignUpFormValues } from "@/lib/validations/auth";
import { registerSchema } from "@/lib/validations/auth";
import Link from "next/link";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorMessages } from "@/lib/error";
import Input from "../ui/input";
import { useTranslation } from "react-i18next";
import { useSignUp } from "@/lib/api/auth/sign-up";

export default function SignUpForm(): ReactElement {
  const { mutate, isPending, isError, error } = useSignUp();
  const [isErrorState, setIsErrorState] = useState(false);

  useEffect(() => {
    if (isError) setIsErrorState(true);
    const timeoutId = setTimeout(() => {
      setIsErrorState(false);
    }, 5000);
    return () => { clearTimeout(timeoutId); }
  }, [isError]);

  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(registerSchema),
  });
  
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    mutate({ ...data });
  });

  const { t } = useTranslation();

  return (
    <div
      className="tw-p-24 max-md:tw-p-10 tw-rounded-[20px] tw-w-full tw-bg-gradient-to-br tw-from-[#8F4AD7] tw-to-[#DF3B9A]"
      style={{
        background: isErrorState
          ? "linear-gradient(to bottom, white, #d13080 70%)"
          : "linear-gradient(30deg, #8F4AD7 50%, #DF3B9A)",
      }}
    >
      <h2 className="tw-text-white tw-text-center">{t('Register')}</h2>
      <p className="p-error tw-text-center tw-mt-1">
        {isErrorState ? errorMessages(error) : null}
      </p>
      <FormProvider {...methods}>
        <form
          className="tw-space-y-4 tw-mt-8"
          onSubmit={(event) => {
            event.preventDefault();
            void onSubmit();
          }}
        >
          <div className="tw-flex tw-flex-col tw-space-y-12">
            <Input float id="name" label={t('Name')} type="text" />
            <Input float icon="pi pi-at" id="email" label="Email" type="email" />
            <Input float id="password" label="Password" type="password" />
          </div>

          <Button
            className="w-full !tw-p-4 !tw-mt-8"
            label={t('Register')}
            loading={isPending}
            severity="secondary"
            type="submit"
          />
        </form>
      </FormProvider>

      <div className="tw-mt-4 tw-text-center">
        <span className="tw-text-white">{t('Already have an account?')} </span>
        <Link href="/auth/sign-in" className="tw-text-white tw-font-bold hover:tw-underline">
          {t('Sign In')}
        </Link>
      </div>
    </div>
  );
} 