import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { bnNumber, units } from "@/lib/format";
import { requireSession } from "@/lib/session";
import { ChangeBadge } from "@/components/product-card";
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  await requireSession(`/product/${product.slug}`);
  const min = product.markets.length ? Math.min(...product.markets.map(market => market.min)) : product.today;
  const max = product.markets.length ? Math.max(...product.markets.map(market => market.max)) : product.today;
  const average = product.markets.length
    ? product.markets.reduce((total, market) => total + (market.min + market.max) / 2, 0) / product.markets.length
    : product.today;
  return <main className="page-container space-y-6 py-10 pb-16">
    <Link href={`/category/${product.category}`} className="text-sm text-muted">← {product.categoryNameBn} বিভাগের সব পণ্য</Link>
    <section className="surface p-6 sm:p-8">
      <div className="flex items-start gap-4"><span className="product-emoji h-16 w-16 text-4xl" aria-hidden="true">{product.image}</span>
        <div><h1 className="text-3xl font-bold">{product.nameBn}</h1><p className="mt-2 leading-6 text-muted">আজকের বাজারদর, দামের পরিসর এবং বিভিন্ন বাজারের তুলনা।</p>
          <div className="mt-3 flex flex-wrap gap-2"><Link href={`/category/${product.category}`} className="badge badge-outline">{product.categoryIcon} {product.categoryNameBn}</Link><span className="badge badge-outline">প্রতি {units[product.unit]}</span></div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4"><p>আজকের দাম: <strong className="text-2xl">{bnNumber(product.today)} টাকা</strong></p><ChangeBadge change={product.change} /></div>
    </section>
    <section aria-label="দামের সারসংক্ষেপ" className="grid gap-4 sm:grid-cols-3">
      {[{ label: "সর্বনিম্ন দাম", value: min }, { label: "সর্বোচ্চ দাম", value: max }, { label: "গড় দাম", value: average }].map(item => <div className="surface p-6" key={item.label}>
        <h2 className="text-sm text-muted">{item.label}</h2><p className="mt-3 text-2xl font-bold">{bnNumber(item.value, item.label === "গড় দাম" ? 1 : 0)} টাকা</p><p className="mt-1 text-xs text-muted">প্রতি {units[product.unit]}</p>
      </div>)}
    </section>
    <section className="surface overflow-hidden" aria-labelledby="market-prices"><h2 id="market-prices" className="p-6 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
      <div className="overflow-x-auto"><table className="table min-w-[560px]"><caption className="sr-only">{product.nameBn} — বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম</caption>
        <thead className="bg-[var(--page)]"><tr><th scope="col">বাজার</th><th scope="col">বিভাগ</th><th scope="col">সর্বনিম্ন দাম</th><th scope="col">সর্বোচ্চ দাম</th></tr></thead>
        <tbody>{product.markets.map(market => <tr key={`${market.division}-${market.market}`}><th scope="row" className="font-medium">{market.market}</th><td>{market.division}</td><td>{bnNumber(market.min)} টাকা</td><td>{bnNumber(market.max)} টাকা</td></tr>)}</tbody>
      </table></div>
      {!product.markets.length && <p className="p-6 text-muted">এই পণ্যের বাজারভিত্তিক তথ্য এখন পাওয়া যাচ্ছে না।</p>}
    </section>
  </main>;
}
