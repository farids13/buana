"use client";
import type { SignInFormValues } from "@/lib/validations/auth";
import { authSchema } from "@/lib/validations/auth";
import Link from "next/link";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@/lib/api/auth/sign-in";
import { errorMessages } from "@/lib/error";
import { useSignInGoogle } from "@/lib/api/auth/sign-in-google";
import Input from "../ui/input";
import { useTranslation } from "react-i18next";
import { getAccessToken } from "@/utils/oauth-utils";



export default function SignInForm(): ReactElement {
  const { mutate, isPending, isError, error } = useSignIn();
  const { mutate: google, isError: isErrorGoogle, error: googleError, isPending: isPendingGoogle } = useSignInGoogle();
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorState, setIsErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isError || isErrorGoogle) {
      setIsErrorState(true);
      setIsLoading(false);
      setErrorMessage("Email atau password salah");
    }
    const timeoutId = setTimeout(() => {
      setIsErrorState(false);
      setErrorMessage("");
    }, 5000);
    return () => { clearTimeout(timeoutId); }
  }, [isError, isErrorGoogle]);

  const methods = useForm<SignInFormValues>({
    resolver: zodResolver(authSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    mutate({ ...data });
  });

  const hash = typeof window !== 'undefined' ? window.location.hash : null;
  const hashParams = hash !== null ? new URLSearchParams(hash.slice(1)) : null;
  const ssoToken = hashParams !== null ? hashParams.get('access_token') : null;

  useEffect(() => {
    if (ssoToken) { google({ token: ssoToken }); setIsLoading(true) };
  }, [ssoToken]);

  useEffect(() => {
    if (isErrorGoogle || googleError) setIsLoading(false);
  }, [isErrorGoogle]);

  const handleGoogleAuth = () => {
    const redirectUri = "/auth/sign-in";
    const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
    getAccessToken({ redirectUri, scope, inWindow: true });
    setIsLoading(true);
  };

  const { t } = useTranslation();

  return (
    <div
      className="tw-p-24 max-md:tw-p-10 tw-rounded-[20px] tw-w-full tw-bg-gradient-to-br tw-from-[#8F4AD7] tw-to-[#DF3B9A] "
      style={{
        background: isErrorState
          ? "linear-gradient(to bottom, white, #d13080 70%)"
          : "linear-gradient(30deg, #8F4AD7 50%, #DF3B9A)",
      }}
    >
      <h2 className="tw-text-white tw-text-center">{t('Sign In')}</h2>
      <p className="p-error tw-text-center tw-mt-1" id="email-error">
        {isErrorState ? errorMessage : null}
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
            <Input float icon="pi pi-at" id="email" label="Email" type="email" />
            <Input float id="password" label="Password" type="password" />
          </div>


          <Button
            className="w-full !tw-p-4 !tw-mt-8"
            label={t('Login')}
            loading={isPending || isLoading}
            severity="secondary"
            type="submit"
          />
        </form>
      </FormProvider>
      <Button
        className="w-full !tw-p-4 !tw-mt-8"
        icon="pi pi-google"
        label={t('Login With Google')}
        loading={isPendingGoogle}
        onClick={handleGoogleAuth}
        type="button"
      />
      <div className="tw-mt-4 tw-text-center">
        <span className="tw-text-white">{t('Don\'t have an account?')} </span>
        <Link href="/auth/sign-up" className="tw-text-white tw-font-bold hover:tw-underline">
          {t('Register')}
        </Link>
      </div>
    </div>
  );
}
