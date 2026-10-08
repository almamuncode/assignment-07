"use client";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types";
import { bnNumber, sortProducts, type SortOrder } from "@/lib/format";
import { ProductGrid } from "./product-card";
export default function CategoryProducts({ products }: { products: Product[] }) {
  const [order, setOrder] = useState<SortOrder>("default");
  return <>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-muted">মোট {bnNumber(products.length)}টি পণ্য দেখানো হচ্ছে</p>
      <label className="flex items-center gap-3 text-sm">সাজান:
        <select className="select select-sm w-auto" value={order} onChange={event => setOrder(event.target.value as SortOrder)}>
          <option value="default">ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </label>
    </div>
    {products.length ? <ProductGrid products={sortProducts(products, order)} /> : <div className="surface p-10 text-center">
      <p className="text-3xl font-bold">কোনো পণ্য পাওয়া যায়নি</p><p className="my-4 text-muted">এই বিভাগে এখন কোনো পণ্য নেই।</p>
      <Link href="/" className="btn btn-brand">হোম পেজে ফিরে যান</Link>
    </div>}
  </>;
}
