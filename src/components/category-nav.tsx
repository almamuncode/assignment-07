"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types";
export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  return <nav aria-label="পণ্যের বিভাগ" className="page-container flex gap-1 overflow-x-auto py-2">
    {categories.map(category => {
      const active = pathname === `/category/${category.slug}`;
      return <Link key={category.id} href={`/category/${category.slug}`} aria-current={active ? "page" : undefined}
        className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium ${active ? "bg-green-100 text-green-800" : "hover:bg-[var(--page)]"}`}>
        <span aria-hidden="true">{category.icon}</span> {category.nameBn}
      </Link>;
    })}
  </nav>;
}
