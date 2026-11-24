import { useEffect, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router";
import ProductCard from "../components/products/ProductCard";
import { useProducts } from "../hooks/useProducts";

type SortOrder = "default" | "price-asc" | "price-desc";

function HomePage() {
  const { products, isLoading, error, retry } = useProducts();
  const { isSearchOpen } = useOutletContext<{
    isSearchOpen: boolean;
  }>();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
      searchInputRef.current?.select();
    }
  }, [isSearchOpen]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchingProducts = products.filter((product) =>
    product.title.toLowerCase().includes(normalizedQuery),
  );

  const visibleProducts = isSearchOpen ? matchingProducts : products;

  // Sort a copy to preserve the original product order.
  const sortedProducts = [...visibleProducts];

  if (sortOrder !== "default") {
    sortedProducts.sort((first, second) => {
      const firstPrice = Math.min(first.price, first.discountedPrice);
      const secondPrice = Math.min(second.price, second.discountedPrice);

      return sortOrder === "price-asc"
        ? firstPrice - secondPrice
        : secondPrice - firstPrice;
    });
  }

  const hasProducts = !isLoading && !error && products.length > 0;
  const hasSearchQuery = isSearchOpen && normalizedQuery.length > 0;

  return (
    <section>
      <title>Products | Veya</title>
      <h1 className="text-3xl font-bold">Products</h1>

      {(isSearchOpen || hasProducts) && (
        <div className="mt-6 grid grid-cols-1 items-start gap-3 md:grid-cols-[minmax(0,1fr)_13rem]">
          {isSearchOpen && (
            <div className="min-w-0 md:col-start-1 md:row-start-1">
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
                className="min-h-12 w-full rounded-lg border border-slate-500 bg-white px-4 py-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              />
            </div>
          )}

          {hasProducts && (
            <div className="relative w-52 justify-self-end md:col-start-2 md:row-start-1 md:w-full">
              <label htmlFor="product-sort" className="sr-only">
                Sort products by price
              </label>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-600"
              >
                <path
                  d="M8 4v16m-4-4 4 4 4-4M16 20V4m-4 4 4-4 4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <select
                id="product-sort"
                value={sortOrder}
                onChange={(event) => {
                  const value = event.target.value;

                  if (
                    value === "default" ||
                    value === "price-asc" ||
                    value === "price-desc"
                  ) {
                    setSortOrder(value);
                  }
                }}
                className="min-h-12 w-full appearance-none rounded-lg border border-slate-500 bg-white py-3 pl-9 pr-9 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              >
                <option value="default">Sort</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-600"
              >
                <path
                  d="m6 9 6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {hasProducts && hasSearchQuery && matchingProducts.length > 0 && (
            <section
              aria-labelledby="search-results-heading"
              className="min-w-0 rounded-lg border border-slate-200 bg-white p-1 md:col-start-1 md:row-start-2"
            >
              <h2 id="search-results-heading" className="sr-only">
                Search results
              </h2>

              <ul className="max-h-48 divide-y divide-slate-200 overflow-y-auto p-1">
                {matchingProducts.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/products/${encodeURIComponent(product.id)}`}
                      className="flex min-h-11 items-center rounded px-3 py-2 text-sm hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                    >
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {hasProducts && hasSearchQuery && (
        <p role="status" className="mt-4 text-sm text-slate-600">
          {matchingProducts.length === 0
            ? "No products match your search. Try a different product title."
            : `${matchingProducts.length} ${
                matchingProducts.length === 1 ? "product" : "products"
              } found.`}
        </p>
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

      {!isLoading && !error && sortedProducts.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default HomePage;
