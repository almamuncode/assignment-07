"use client";
import AuthNotice from "./auth-notice";
import { Toaster } from "react-hot-toast";
export default function Providers({ children }: { children: React.ReactNode }) {
  return <><AuthNotice />{children}<Toaster position="top-right" toastOptions={{ duration: 4500 }} /></>;
}
