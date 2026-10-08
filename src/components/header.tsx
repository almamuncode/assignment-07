import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import { banglaDate, bnNumber, units } from "@/lib/format";
import AuthButtons from "./auth-buttons";
import CategoryNav from "./category-nav";
import { ChangeBadge } from "./product-card";

export default async function Header() {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []), getProducts().catch(() => []),
  ]);
  return <header className="bg-white">
    <div className="page-container flex flex-wrap items-center justify-between gap-3 py-4">
      <Link href="/" className="flex items-center gap-3" aria-label="বাজার দর হোম পেজ">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--brand)] text-xl" aria-hidden="true">🛒</span>
        <div><p className="text-xl font-bold">বাজার দর</p><p className="mt-1 text-xs text-muted">{banglaDate()}</p></div>
      </Link>
      <AuthButtons />
    </div>
    <div className="border-y border-[var(--line)]"><CategoryNav categories={categories} /></div>
    <div className="ticker overflow-hidden border-b border-[var(--line)] bg-[#f8fbf9] py-2" role="region" aria-label="আজকের বাজারের দাম" tabIndex={0}>
      {products.length ? <div className="ticker-track">
        {[0, 1].map(copy => <div className="flex shrink-0 items-center" key={copy} aria-hidden={copy === 1 ? true : undefined}>
          {products.map(product => <span key={product.id} className="flex items-center gap-2 px-5 text-xs">
            <span>{product.image} {product.nameBn}</span>
            <span>{bnNumber(product.today)} টাকা/{units[product.unit]}</span><ChangeBadge change={product.change} />
          </span>)}
        </div>)}
      </div> : <p className="page-container text-xs text-muted">বাজারের দাম এখন লোড করা যাচ্ছে না।</p>}
    </div>
  </header>;
}
