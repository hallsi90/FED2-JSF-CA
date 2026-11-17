import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";
import { useProduct } from "../hooks/useProducts";
import { useCartStore } from "../stores/useCartStore";
import { useToastStore } from "../stores/useToastStore";
import { calculateDiscountPercentage, formatPrice } from "../utils/price";
import ProductImage from "../components/products/ProductImage";

function ProductDetails({ id }: { id: string }) {
  const { product, isLoading, error } = useProduct(id);
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = headingRef.current;

    if (heading && document.activeElement === heading.closest("main")) {
      heading.focus();
    }
  }, [product, error]);

  if (isLoading) {
    return (
      <>
        <title>Loading product | Veya</title>
        <p role="status">Loading product. Please wait...</p>
      </>
    );
  }

  if (error) {
    return (
      <div>
        <title>Unable to load product | Veya</title>
        <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-bold">Unable to load product</h1>
        <p role="alert" className="mt-4">
          {error}
        </p>
        <Link to="/" className="mt-4 inline-block underline">
          Back to products
        </Link>
      </div>
    );
  }

  if (!product) {
    return <p>No product available.</p>;
  }

  const hasDiscount = product.discountedPrice < product.price;
  const discountPercentage = calculateDiscountPercentage(
    product.price,
    product.discountedPrice,
  );

  function handleAddToCart() {
    if (!product) {
      return;
    }

    if (!addItem(product)) {
      showToast(`Maximum cart quantity reached for ${product.title}.`);
      return;
    }

    const cartItem = useCartStore
      .getState()
      .items.find((item) => item.product.id === product.id);

    if (cartItem) {
      showToast(
        `${product.title} added to cart. Quantity: ${cartItem.quantity}.`,
      );
    }
  }

  return (
    <article>
      <title>{`${product.title} | Veya`}</title>
      <Link to="/" className="inline-block underline">
        Back to products
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-lg bg-white">
          <ProductImage
            key={product.image.url}
            image={product.image}
            title={product.title}
            className="aspect-square w-full object-contain p-6"
          />

          {hasDiscount && (
            <span className="absolute left-4 top-4 rounded bg-red-700 px-2 py-1 text-sm font-semibold text-white">
              {discountPercentage}% off
            </span>
          )}
        </div>

        <div>
          <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-bold">{product.title}</h1>

          <p className="mt-4 text-slate-600">Rating: {product.rating} / 5</p>

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            {hasDiscount && (
              <del className="text-slate-600">
                <span className="sr-only">Original price: </span>
                {formatPrice(product.price)}
              </del>
            )}

            <p
              className={`text-2xl font-semibold ${
                hasDiscount ? "text-red-700" : "text-slate-900"
              }`}
            >
              <span className="sr-only">
                {hasDiscount ? "Discounted price: " : "Price: "}
              </span>
              {formatPrice(
                hasDiscount ? product.discountedPrice : product.price,
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-6 min-h-12 w-full rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700 sm:w-auto"
          >
            Add to cart
          </button>

          <p className="mt-6 whitespace-pre-line leading-relaxed">
            {product.description}
          </p>

          {product.tags.length > 0 && (
            <ul aria-label="Product tags" className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-slate-200 px-3 py-1 text-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <section className="mt-12" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="text-2xl font-bold">
          Customer reviews
        </h2>

        {product.reviews.length > 0 ? (
          <ul className="mt-6 space-y-4">
            {product.reviews.map((review) => (
              <li
                key={review.id}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <h3 className="font-semibold">{review.username}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Rating: {review.rating} / 5
                </p>
                <p className="mt-3 whitespace-pre-line">{review.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-slate-600">No customer reviews yet.</p>
        )}
      </section>
    </article>
  );
}

function ProductPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <h1 className="text-3xl font-bold">Product not found</h1>;
  }

  return <ProductDetails key={id} id={id} />;
}

export default ProductPage;
