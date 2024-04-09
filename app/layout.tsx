import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "Sorry, the page you are looking for does not exist.",
  authors: [
    {
      name: "Ritvik Shukla",
    },
  ],
  category: "Weather Forecasting",
  keywords: ["Weather", "Forecasting", "Not Found"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
