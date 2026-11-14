import type { Product, ProductListResponse } from "../types/product";
import { PRODUCTS_URL } from "./api";

export async function fetchProductsPage(
  page: number = 1,
): Promise<ProductListResponse> {
  const response = await fetch(`${PRODUCTS_URL}?page=${page}`);

  if (!response.ok) {
    throw new Error(`Unable to fetch products (${response.status}).`);
  }

  const result: ProductListResponse = await response.json();

  return result;
}

export async function fetchProducts(): Promise<Product[]> {
  const products: Product[] = [];
  let page: number | null = 1;

  while (page !== null) {
    const result = await fetchProductsPage(page);

    products.push(...result.data);
    page = result.meta.nextPage;
  }

  return products;
}
