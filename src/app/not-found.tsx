import Link from "next/link";
export default function NotFound() {
  return <main className="page-container py-20 text-center">
    <p className="text-6xl font-bold text-green-800">৪০৪</p><h1 className="mt-5 text-2xl font-bold">পণ্য বা পেজটি পাওয়া যায়নি</h1>
    <p className="mt-3 text-muted">লিংকটি ভুল হতে পারে অথবা তথ্যটি এখন পাওয়া যাচ্ছে না।</p>
    <Link className="btn btn-brand mt-6" href="/">হোম পেজে ফিরে যান</Link>
  </main>;
}
