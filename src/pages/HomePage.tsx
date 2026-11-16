import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import ProductCard from "../components/products/ProductCard";
import { useProducts } from "../hooks/useProducts";

function HomePage() {
  const { products, isLoading, error, retry } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const { isSearchOpen } = useOutletContext<{
    isSearchOpen: boolean;
  }>();

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  return (
    <section>
      <h1 className="text-3xl font-bold">Products</h1>

      {isSearchOpen && (
        <div className="mt-6 max-w-xl">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>

          <input
            ref={searchInputRef}
            id="product-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search products"
            className="mt-2 w-full rounded-lg border border-slate-400 bg-white px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
          />
        </div>
      )}

      {isLoading && (
        <p role="status" className="mt-6">
          Loading products. Please wait...
        </p>
      )}

      {!isLoading && error && (
        <div className="mt-6">
          <p role="alert">
            We couldn&apos;t load the products. Please try again.
          </p>

          <button
            type="button"
            onClick={retry}
            className="mt-4 rounded bg-purple-700 px-4 py-3 font-semibold text-white hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && products.length === 0 && (
        <p role="status" className="mt-6">
          No products are available right now. Please check back later.
        </p>
      )}

      {!isLoading && !error && products.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default HomePage;
