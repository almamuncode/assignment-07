import { requireSession } from "@/lib/session";
import ProfileForm from "@/components/profile-form";
export const metadata = { title: "তথ্য আপডেট" };
export default async function EditProfile() {
  const { user } = await requireSession("/profile/edit");
  return <main className="mx-auto w-full max-w-xl px-4 py-10 pb-16"><h1 className="text-3xl font-bold">তথ্য আপডেট করুন</h1><p className="mt-2 text-muted">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p><ProfileForm name={user.name} /></main>;
}
