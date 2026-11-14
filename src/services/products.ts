import type {
  Product,
  ProductListResponse,
  ProductResponse,
} from "../types/product";
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

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`${PRODUCTS_URL}/${encodeURIComponent(id)}`);

  if (response.status === 404) {
    throw new Error("Product not found.");
  }

  if (!response.ok) {
    throw new Error(`Unable to fetch product (${response.status}).`);
  }

  const result: ProductResponse = await response.json();

  return result.data;
}
