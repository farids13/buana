"use client";
import {PrimeReactProvider} from "primereact/api";
import "@/styles/layout/layout.scss";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "@/styles/demo/Demos.scss";
import type {ReactElement} from "react";
import {LayoutProvider} from "@/src/layout/context/layout-context";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ToastContainer} from "react-toastify";
import { getErrorMessage } from "../lib/error";
import "react-toastify/dist/ReactToastify.css";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 1000 * 60 * 2,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log("Error dari query cache:", error);
      if (error instanceof ZodError) {
        error.issues.forEach((issue) =>
          toast.error(`${issue.path.toString()}: ${issue.message}`)
        );
        return;
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: () => {
      toast.success("Berhasil menyimpan data");
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  }),
});

export default function RootLayout({children}): ReactElement {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link
          href="/theme/theme-light/blue/theme.css"
          id="theme-link"
          rel="stylesheet"
        />
      </head>
      <body>
        <PrimeReactProvider>
          <QueryClientProvider client={queryClient}>
            <LayoutProvider>{children}</LayoutProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </QueryClientProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
