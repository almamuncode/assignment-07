"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { safeReturnTo } from "@/lib/navigation";

export default function AuthForm({ mode, notice, next, oauthError }: { mode: "signin" | "signup"; notice?: string; next?: string; oauthError?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const signup = mode === "signup";
  // Only local product/profile destinations are accepted from the URL.
  const destination = safeReturnTo(next);
  useEffect(() => {
    if (notice === "protected") toast.error("বিস্তারিত দেখতে আগে সাইন ইন করুন।", { id: "protected-route" });
    if (oauthError) toast.error("সোশ্যাল সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।", { id: "oauth-error" });
  }, [notice, oauthError]);
  function fail(message: string) { setError(message); toast.error(message); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    if (signup && name.length < 2) return fail("নাম অন্তত ২ অক্ষরের হতে হবে।");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("সঠিক ইমেইল লিখুন।");
    if (password.length < 8 || password.length > 128) return fail("পাসওয়ার্ড ৮ থেকে ১২৮ অক্ষরের হতে হবে।");
    if (signup && password !== form.get("confirm")) return fail("দুটি পাসওয়ার্ড মিলছে না।");
    setPending(true);
    try {
      const result = signup ? await authClient.signUp.email({ name, email, password }) : await authClient.signIn.email({ email, password });
      if (result.error) { fail(result.error.message || "অনুরোধ সম্পন্ন করা যায়নি।"); return; }
      toast.success(signup ? "অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।" : "সফলভাবে সাইন ইন হয়েছে।");
      router.push(signup ? "/signin" : destination); router.refresh();
    } catch { fail("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।"); }
    finally { setPending(false); }
  }
  async function social(provider: "google" | "github") {
    setPending(true); setError("");
    try {
      const callbackURL = `${destination}${destination.includes("?") ? "&" : "?"}auth=success`;
      const result = await authClient.signIn.social({ provider, callbackURL, errorCallbackURL: "/signin?error=oauth" });
      if (result.error) { fail(result.error.message || "সোশ্যাল সাইন ইন এখন চালু নেই।"); setPending(false); }
    } catch { fail("সোশ্যাল সাইন ইন সম্পন্ন করা যায়নি।"); setPending(false); }
  }
  return <main className="mx-auto w-full max-w-md px-4 py-10 pb-16">
    <h1 className="text-3xl font-bold">{signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}</h1>
    <p className="mb-6 mt-2 text-sm leading-6 text-muted">{signup ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।" : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে সাইন ইন করুন।"}</p>
    <div className="surface p-6">
      <form onSubmit={submit} noValidate className="space-y-4">
        {signup && <label className="block text-sm font-medium">নাম<input className="input mt-2" name="name" autoComplete="name" maxLength={100} required disabled={pending} placeholder="আপনার নাম" /></label>}
        <label className="block text-sm font-medium">ইমেইল<input className="input mt-2" name="email" type="email" autoComplete="email" required disabled={pending} placeholder="you@example.com" /></label>
        <label className="block text-sm font-medium">পাসওয়ার্ড<input className="input mt-2" name="password" type="password" autoComplete={signup ? "new-password" : "current-password"} minLength={8} maxLength={128} required disabled={pending} placeholder="কমপক্ষে ৮ অক্ষর" /></label>
        {signup && <label className="block text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন<input className="input mt-2" name="confirm" type="password" autoComplete="new-password" required disabled={pending} /></label>}
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button className="btn btn-brand w-full" type="submit" disabled={pending}>{pending && <span className="loading loading-spinner loading-xs" />}{signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}</button>
      </form>
      <div className="divider text-xs text-muted">অথবা</div>
      <div className="grid grid-cols-2 gap-3"><button className="btn btn-soft" disabled={pending} onClick={() => social("google")}>Google</button><button className="btn btn-soft" disabled={pending} onClick={() => social("github")}>GitHub</button></div>
      <p className="mt-5 text-center text-sm text-muted">{signup ? "অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}<Link className="font-medium text-green-800 underline" href={signup ? "/signin" : "/signup"}>{signup ? "সাইন ইন করুন" : "সাইন আপ করুন"}</Link></p>
    </div>
    <Link className="mt-6 block text-center text-sm text-muted" href="/">← হোম পেজে ফিরে যান</Link>
  </main>;
}
