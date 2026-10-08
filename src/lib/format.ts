import type { Product } from "@/types";

export function bnNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function banglaDate(date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export const units: Record<Product["unit"], string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export type SortOrder = "default" | "asc" | "desc";

export function sortProducts(products: Product[], order: SortOrder): Product[] {
  if (order === "default") return [...products];
  return [...products].sort((a, b) =>
    order === "asc" ? a.today - b.today : b.today - a.today,
  );
}

export function topMovers(products: Product[], direction: "up" | "down") {
  return products
    .filter((product) => product.change.dir === direction)
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);
}
