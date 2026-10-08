import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import CategoryProducts from "@/components/category-products";
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = (await getCategories()).find(category => category.slug === slug);
  if (!category) notFound();
  const products = await getProducts(category.slug);
  return <main className="page-container py-10 pb-16">
    <h1 className="mb-6 flex items-center gap-3 text-3xl font-bold"><span aria-hidden="true">{category.icon}</span>{category.nameBn}</h1>
    <CategoryProducts products={products} />
  </main>;
}
