import Hero from "@/components/hero";
import { ProductGrid } from "@/components/product-card";
import { getProducts } from "@/lib/api";
import { bnNumber, topMovers } from "@/lib/format";

export default async function Home() {
  const products = await getProducts();
  const risers = topMovers(products, "up");
  const fallers = topMovers(products, "down");
  return <main className="page-container space-y-10 py-6 pb-16">
    <Hero />
    <section aria-labelledby="risers"><h2 id="risers" className="mb-4 text-xl font-bold"><span className="text-green-700">▲</span> আজ দাম বেড়েছে</h2>
      <ProductGrid products={risers} />{!risers.length && <p className="text-muted">আজ কোনো পণ্যের দাম বাড়েনি।</p>}
    </section>
    <section aria-labelledby="fallers"><h2 id="fallers" className="mb-4 text-xl font-bold"><span className="text-red-600">▼</span> আজ দাম কমেছে</h2>
      <ProductGrid products={fallers} />{!fallers.length && <p className="text-muted">আজ কোনো পণ্যের দাম কমেনি।</p>}
    </section>
    <section id="সব-পণ্য" aria-labelledby="all-products"><h2 id="all-products" className="text-xl font-bold">সব পণ্য</h2>
      <p className="mb-6 mt-2 text-sm text-muted">মোট {bnNumber(products.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={products} />{!products.length && <p className="text-muted">এখন কোনো পণ্য পাওয়া যাচ্ছে না।</p>}
    </section>
  </main>;
}
