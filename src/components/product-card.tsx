import Link from "next/link";
import type { Product } from "@/types";
import { bnNumber, units } from "@/lib/format";

export function ChangeBadge({ change }: { change: Product["change"] }) {
  const arrow = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";
  return <span className={`change-badge change-${change.dir}`} aria-label={`দামের পরিবর্তন ${arrow} ${bnNumber(Math.abs(change.pct), 1)} শতাংশ`}>
    {arrow} {bnNumber(Math.abs(change.pct), 1)}%
  </span>;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="product-card card" prefetch={false}>
      <div className="flex items-center gap-3">
        <span className="product-emoji" aria-hidden="true">{product.image}</span>
        <div className="min-w-0"><h3 className="font-semibold">{product.nameBn}</h3>
          <p className="mt-1 text-xs text-muted">প্রতি {units[product.unit]}</p>
        </div>
      </div>
      <div className="mt-5 flex items-end justify-between gap-2">
        <div><p className="mb-1 text-xs text-muted">আজকের দাম</p>
          <p><strong className="text-xl">{bnNumber(product.today)}</strong> <span className="text-sm">টাকা</span></p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {products.map(product => <ProductCard key={product.id} product={product} />)}
  </div>;
}
