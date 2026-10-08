"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function ProfileForm({ name }: { name: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function update(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const newName = String(new FormData(event.currentTarget).get("name") || "").trim();
    if (newName.length < 2 || newName.length > 100) {
      const message = "নাম ২ থেকে ১০০ অক্ষরের হতে হবে।";
      setError(message); toast.error(message); return;
    }
    setPending(true);
    try {
      const result = await authClient.updateUser({ name: newName });
      if (result.error) { const message = result.error.message || "তথ্য আপডেট করা যায়নি।"; setError(message); toast.error(message); return; }
      await authClient.getSession({ query: { disableCookieCache: true } });
      toast.success("আপনার নাম আপডেট হয়েছে।"); router.push("/profile"); router.refresh();
    } catch { const message = "সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।"; setError(message); toast.error(message); }
    finally { setPending(false); }
  }
  return <form className="surface mt-6 space-y-5 p-6" onSubmit={update} noValidate>
    <label className="block font-medium">নাম<input className="input mt-2" name="name" defaultValue={name} autoComplete="name" maxLength={100} disabled={pending} required /></label>
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    <div className="flex flex-wrap gap-3"><button className="btn btn-brand" disabled={pending}>{pending && <span className="loading loading-spinner loading-xs" />}তথ্য আপডেট করুন</button><Link className="btn btn-soft" href="/profile">ফিরে যান</Link></div>
  </form>;
}
