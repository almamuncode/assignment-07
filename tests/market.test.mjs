import assert from "node:assert/strict";
import test from "node:test";
import { bnNumber, banglaDate, sortProducts, topMovers } from "../src/lib/format.ts";
import { safeReturnTo } from "../src/lib/navigation.ts";

const product = (id, price, direction = "flat", percentage = 0) => ({
  id, today: price, change: { dir: direction, pct: percentage },
});

test("prices use Bengali grouping and percentage decimals", () => {
  assert.equal(bnNumber(1850), "১,৮৫০");
  assert.equal(bnNumber(2.1, 1), "২.১");
  assert.equal(bnNumber(0, 1), "০.০");
});

test("date uses the Bangladesh timezone across a UTC day boundary", () => {
  const date = banglaDate(new Date("2026-10-07T20:00:00Z"));
  assert.ok(date.includes("৮ অক্টোবর"));
});

test("sorting compares numeric prices and preserves the original default order", () => {
  const products = [product(1, 1850), product(2, 99), product(3, 148)];
  assert.deepEqual(sortProducts(products, "asc").map(p => p.today), [99, 148, 1850]);
  assert.deepEqual(sortProducts(products, "desc").map(p => p.today), [1850, 148, 99]);
  assert.deepEqual(sortProducts(products, "default").map(p => p.today), [1850, 99, 148]);
  assert.deepEqual(products.map(p => p.today), [1850, 99, 148]);
});

test("top movers select six products by percentage and exclude the other directions", () => {
  const products = [product(0, 100, "down", 50), ...Array.from({ length: 8 }, (_, i) => product(i + 1, 100, "up", i + 1))];
  assert.deepEqual(topMovers(products, "up").map(p => p.id), [8, 7, 6, 5, 4, 3]);
  assert.equal(products[0].id, 0);
  assert.deepEqual(topMovers([], "up"), []);
});

test("fallers rank by change magnitude even when percentages are negative", () => {
  assert.deepEqual(topMovers([product(1, 100, "down", -3), product(2, 100, "down", -12)], "down").map(p => p.id), [2, 1]);
});

test("post-login destinations reject external URLs and unexpected paths", () => {
  for (const input of [undefined, ["/profile"], "https://example.com", "//example.com", "/api/auth/sign-out", "/product/../profile", "/profile?next=https://example.com"]) {
    assert.equal(safeReturnTo(input), "/");
  }
  for (const input of ["/profile", "/profile/edit", "/product/sorno-machi-chal"]) {
    assert.equal(safeReturnTo(input), input);
  }
});
