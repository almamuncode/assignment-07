import type { Metadata } from "next";
import Providers from "@/components/providers";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "বাজার দর | BazarDor", template: "%s | বাজার দর" },
  description: "চাল, ডাল, তেল, সবজি, মাছ ও মাংসের আজকের দাম এবং বাজারভিত্তিক তুলনা।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="bn" data-theme="light"><body className="flex min-h-screen flex-col">
    <Providers>{children}<Footer /></Providers>
  </body></html>;
}
