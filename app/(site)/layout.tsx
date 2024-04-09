"use client";

import { Inter } from "next/font/google";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          {children}
          <ProgressBar
            height="4px"
            color="#0000FF"
            options={{ showSpinner: false }}
            shallowRouting
          />
        </QueryClientProvider>
      </body>
    </html>
  );
}
