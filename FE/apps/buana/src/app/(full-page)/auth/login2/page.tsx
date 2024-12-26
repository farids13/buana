"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import type { ReactElement } from "react";
import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import Image from "next/image";
import { useLoginForm } from "@/src/components/auth/login-form";

export default function Login2(): ReactElement {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, errors, onSubmit } = useLoginForm();

  const handleLogin = async (data: any) => {
    setLoading(true);
    try {
      await onSubmit(data);
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-primary-reverse bg-primary-50">
      <div className="flex justify-content-center">
        <div className="w-full lg:w-5 h-screen text-center flex justify-content-center align-items-start">
          <div
            className="z-5 w-full lg:w-8 px-6 text-center mt-8"
            style={{maxWidth: "400px"}}
          >
            <div className="w-full flex align-items-center justify-content-center relative">
              <Image
                alt="avalon-layout"
                className="w-6rem h-6rem"
                height={0}
                sizes="100vw"
                src="/layout/images/pages/login/icon-login.svg"
                width={0}
              />
            </div>
            <h1 className="text-4xl font-light mt-4 text-primary-500">
              Sign in to Avalon
            </h1>
            <p>Welcome, please use the form to sign-in Avalon network</p>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mt-5 text-left">
                <label
                  className="block mb-2"
                  htmlFor="email"
                  style={{color: "#4c566a"}}
                >
                  Email
                </label>
                <span className="p-input-icon-right block">
                  <i className="pi pi-user" />
                  <InputText
                    className="w-full"
                    id="email"
                    type="text"
                    disabled={loading}
                    {...register("email")}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </span>

                <label
                  className="block mb-2 mt-3"
                  htmlFor="password"
                  style={{color: "#4c566a"}}
                >
                  Password
                </label>
                <span className="p-input-icon-right block">
                  <i className="pi pi-lock" />
                  <InputText
                    className="w-full"
                    type="password"
                    disabled={loading}
                    {...register("password")}
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </span>

                <div className="flex align-items-center justify-content-between mt-5">
                  <div className="flex align-items-center">
                    <Checkbox
                      checked={checked}
                      className="mr-2"
                      id="rememberme1"
                      disabled={loading}
                      onChange={(e) => {
                        setChecked(e.checked ?? false);
                      }}
                    />
                    <label htmlFor="rememberme1">Remember me</label>
                  </div>
                </div>

                <div className="flex align-items-center justify-content-between mt-4 gap-3">
                  <Button
                    className="w-10rem"
                    label="Login"
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  />
                  <a className="text-primary secondary-button" href="#">
                    Forgot Password?
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>

        <svg
          className="absolute bottom-0 w-screen"
          viewBox="0 0 1440 250"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <linearGradient id="c" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary-200)" />
              <stop offset="99.052%" stopColor="var(--primary-300)" />
            </linearGradient>
            <path
              d="M0 202c142.333-66.667 249-90 320-70 106.5 30 122 83.5 195 83.5h292c92.642-106.477 190.309-160.81 293-163 102.691-2.19 216.025 47.643 340 149.5v155.5H0V202z"
              id="b"
            />
            <filter
              filterUnits="objectBoundingBox"
              height="124.3%"
              id="a"
              width="105.1%"
              x="-2.6%"
              y="-12.8%"
            >
              <feOffset dy="-2" in="SourceAlpha" result="shadowOffsetOuter1" />
              <feGaussianBlur
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
                stdDeviation="12"
              />
              <feColorMatrix
                in="shadowBlurOuter1"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"
              />
            </filter>
            <linearGradient id="d" x1="50%" x2="50%" y1="0%" y2="99.142%">
              <stop offset="0%" stopColor="var(--primary-300)" />
              <stop offset="100%" stopColor="var(--primary-500)" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(0 .5)">
              <use fill="#000" filter="url(#a)" xlinkHref="#b" />
              <use fill="url(#c)" xlinkHref="#b" />
            </g>
            <path
              d="M0 107c225.333 61.333 364.333 92 417 92 79 0 194-79.5 293-79.5S914 244 1002 244s156-45 195-68.5c26-15.667 107-74.167 243-175.5v357.5H0V107z"
              fill="url(#d)"
              transform="translate(0 .5)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
