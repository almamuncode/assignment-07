import { cache } from "react";
import type { Category, Product } from "@/types";

const API_BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export const API_ENDPOINTS = {
  categories: `${API_BASE_URL}/categories`,
  products: `${API_BASE_URL}/products`,
};

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });

  if (!response.ok) {
    throw new Error(
      `Market API request failed (${response.status} ${response.statusText}): ${url}`,
    );
  }

  return response.json();
}

export const getCategories = cache(async (): Promise<Category[]> =>
  request<Category[]>(API_ENDPOINTS.categories),
);

export const getProducts = cache(async (category?: string): Promise<Product[]> =>
  request<Product[]>(
    category
      ? `${API_ENDPOINTS.products}?category=${encodeURIComponent(category)}`
      : API_ENDPOINTS.products,
  ),
);

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  const summary = products.find((product) => product.slug === slug);
  if (!summary) return undefined;
  return request<Product>(`${API_ENDPOINTS.products}/${summary.id}`);
}
