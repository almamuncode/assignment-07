import Image from "next/image";
import { banglaDate } from "@/lib/format";
export default function Hero() {
  return <section className="surface flex flex-col items-center justify-between gap-6 p-6 sm:p-8 md:flex-row">
    <div className="max-w-xl">
      <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">{banglaDate()}</p>
      <h1 className="text-3xl font-bold leading-snug sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
      <p className="mt-4 leading-7 text-muted">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন–সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।</p>
      <a href="#সব-পণ্য" className="btn btn-brand btn-sm mt-6 sm:btn-md">সব পণ্য দেখুন</a>
    </div>
    <Image src="/bazar-hero.svg" width={315} height={263} alt="তাজা সবজিতে ভরা বাজারের ঝুড়ি" priority className="h-auto max-w-full shrink-0" />
  </section>;
}
