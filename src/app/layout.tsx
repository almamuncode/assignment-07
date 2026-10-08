import { Suspense } from "react";
import { connection } from "next/server";
import Header from "@/components/header";
import type { Metadata } from "next";
import Providers from "@/components/providers";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "বাজার দর | BazarDor", template: "%s | বাজার দর" },
  description: "চাল, ডাল, তেল, সবজি, মাছ ও মাংসের আজকের দাম এবং বাজারভিত্তিক তুলনা।",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await connection();
  return <html lang="bn" data-theme="light"><body className="flex min-h-screen flex-col">
    <Providers><Suspense fallback={<div className="skeleton h-40 w-full" />}><Header /></Suspense>{children}<Footer /></Providers>
  </body></html>;
}
