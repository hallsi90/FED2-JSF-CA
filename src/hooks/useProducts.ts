import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { fetchProduct, fetchProducts } from "../services/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchProducts();

        if (!ignore) {
          setProducts(data);
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error ? error.message : "Unable to load products.",
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      ignore = true;
    };
  }, [retryCount]);

  function retry() {
    setRetryCount((count) => count + 1);
  }

  return { products, isLoading, error, retry };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadProduct() {
      setIsLoading(true);
      setError(null);
      setProduct(null);

      try {
        const data = await fetchProduct(id);

        if (!ignore) {
          setProduct(data);
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error ? error.message : "Unable to load product.",
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      ignore = true;
    };
  }, [id]);

  return { product, isLoading, error };
}
