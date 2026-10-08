"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  async function signOut() {
    setPending(true);
    try {
      const { error } = await authClient.signOut();
      if (error) { toast.error(error.message || "সাইন আউট করা যায়নি।"); return; }
      toast.success("সফলভাবে সাইন আউট হয়েছে।");
      router.push("/"); router.refresh();
    } catch { toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।"); }
    finally { setPending(false); }
  }
  return <button className="btn btn-soft btn-sm sm:btn-md" disabled={pending} onClick={signOut}>
    {pending ? <span className="loading loading-spinner loading-xs" /> : "সাইন আউট"}
  </button>;
}

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) return <div className="skeleton h-9 w-40" role="status" aria-label="অ্যাকাউন্ট লোড হচ্ছে" />;
  if (session) return <div className="flex items-center gap-2">
    <Link className="btn btn-soft btn-sm max-w-40 truncate sm:btn-md" href="/profile">{session.user.name}</Link>
    <SignOutButton />
  </div>;
  return <div className="flex gap-2">
    <Link className="btn btn-soft btn-sm sm:btn-md" href="/signin">সাইন ইন</Link>
    <Link className="btn btn-brand btn-sm sm:btn-md" href="/signup">সাইন আপ</Link>
  </div>;
}
