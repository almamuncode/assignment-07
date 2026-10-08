"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function AuthNotice() {
  const { data: session } = authClient.useSession();
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("auth") === "success" && session) {
      toast.success("সফলভাবে সাইন ইন হয়েছে।", { id: "social-success" });
      url.searchParams.delete("auth");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }
  }, [session]);
  return null;
}
