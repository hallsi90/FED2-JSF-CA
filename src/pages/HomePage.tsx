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
