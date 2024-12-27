"use client"
import type { ReactElement } from "react";
import React from "react";

export default function LandingPage(): ReactElement {
  return (
    <main className="tw-flex tw-min-h-screen w-full tw-items-center tw-justify-center tw-bg-white">
      <div className="tw-text-center">
        <h1 className="tw-text-4xl tw-font-bold tw-text-base-purple tw-mb-4">
          Buana Test
        </h1>
        <p className="tw-text-xl tw-text-gray-600 tw-mb-6">
          Selamat datang di halaman uji coba Buana
        </p>
        <a
          href="auth/sign-in"
          className="tw-bg-base-purple tw-text-white tw-px-6 tw-py-2 tw-rounded-md tw-font-medium hover:tw-bg-purple-700 tw-transition-colors"
        >
          Masuk ke Aplikasi
        </a>
      </div>
    </main>
  );
}
