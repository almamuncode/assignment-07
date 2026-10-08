"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="page-container py-20 text-center" role="alert">
    <p className="text-5xl" aria-hidden="true">🛒</p><h1 className="mt-5 text-2xl font-bold">তথ্য লোড করা যায়নি</h1>
    <p className="mt-3 text-muted">সংযোগে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।</p>
    <div className="mt-6 flex flex-wrap justify-center gap-3"><button className="btn btn-brand" onClick={reset}>আবার চেষ্টা করুন</button><Link className="btn btn-soft" href="/">হোম পেজে ফিরে যান</Link></div>
  </main>;
}
