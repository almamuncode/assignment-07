import Link from "next/link";
import { requireSession } from "@/lib/session";
import { SignOutButton } from "@/components/auth-buttons";
export const metadata = { title: "আমার প্রোফাইল" };
export default async function Profile() {
  const { user } = await requireSession("/profile");
  return <main className="mx-auto w-full max-w-3xl px-4 py-10 pb-16">
    <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1><p className="mb-6 mt-2 text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
    <section className="surface flex flex-wrap items-center gap-4 p-6">
      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-green-100 text-2xl font-bold text-green-800" aria-hidden="true">{user.name.slice(0, 1)}</div>
      <div className="min-w-0 flex-1"><h2 className="break-words text-xl font-bold">{user.name}</h2><p className="mt-1 break-all text-sm text-muted">{user.email}</p></div>
      <SignOutButton />
    </section>
    <section className="surface mt-6 p-6"><h2 className="text-xl font-bold">অ্যাকাউন্টের তথ্য</h2>
      <dl className="my-5 space-y-4"><div><dt className="text-sm text-muted">নাম</dt><dd className="mt-1 break-words">{user.name}</dd></div><div><dt className="text-sm text-muted">ইমেইল</dt><dd className="mt-1 break-all">{user.email}</dd></div></dl>
      <Link className="btn btn-brand" href="/profile/edit">তথ্য আপডেট করুন</Link>
    </section>
  </main>;
}
