import ProductCard from "../components/products/ProductCard";
import { useProducts } from "../hooks/useProducts";

function HomePage() {
  const { products, isLoading, error } = useProducts();

  return (
    <section>
      <h1 className="text-3xl font-bold">Products</h1>

      {isLoading && <p role="status">Loading products...</p>}

      {error && <p role="alert">{error}</p>}

      {!isLoading && !error && (
        <div className="mt-6 space-y-6">
          {products.map((product) => (
            <div key={product.id} className="max-w-sm">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default HomePage;
