import { useRef } from "react";
import { Link } from "react-router";
import CartQuantity from "../components/cart/CartQuantity";
import ProductImage from "../components/products/ProductImage";
import { useCartStore } from "../stores/useCartStore";
import { useToastStore } from "../stores/useToastStore";
import type { CartProduct } from "../types/cart";
import { calculateCartTotal } from "../utils/cart";
import { formatPrice } from "../utils/price";

function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const showToast = useToastStore((state) => state.showToast);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const total = calculateCartTotal(items);

  function handleRemoveItem(product: CartProduct) {
    removeItem(product.id);
    headingRef.current?.focus();
    showToast(`${product.title} removed from cart.`);
  }

  return (
    <section>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="rounded text-3xl font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
      >
        Shopping cart
      </h1>

      {items.length === 0 ? (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6">
          <p className="text-lg font-semibold">Your cart is empty.</p>

          <p className="mt-2 text-slate-600">
            Find something you like and add it to your cart.
          </p>

          <Link
            to="/"
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <ul aria-label="Cart items" className="mt-6 space-y-4">
            {items.map((item) => {
              const sellingPrice = Math.min(
                item.product.price,
                item.product.discountedPrice,
              );

              return (
                <li
                  key={item.product.id}
                  className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:gap-6 sm:p-6"
                >
                  <ProductImage
                    key={item.product.image.url}
                    image={item.product.image}
                    title={item.product.title}
                    loading="lazy"
                    className="size-16 shrink-0 rounded-md object-contain sm:size-28"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="min-w-0 wrap-break-word text-lg font-semibold">
                        <Link
                          to={`/products/${encodeURIComponent(item.product.id)}`}
                          className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
                        >
                          {item.product.title}
                        </Link>
                      </h2>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.product)}
                        aria-label={`Remove ${item.product.title} from cart`}
                        className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.75}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="size-5"
                        >
                          <path d="M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14M10 10v6M14 10v6" />
                        </svg>
                      </button>
                    </div>

                    <p className="mt-2 font-semibold">
                      {formatPrice(sellingPrice)}
                      <span className="ml-1 text-sm font-normal text-slate-600">
                        per item
                      </span>
                    </p>

                    <CartQuantity item={item} />
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 sm:p-6">
            <p
              role="status"
              aria-atomic="true"
              className="flex flex-wrap items-baseline justify-between gap-3 text-xl font-bold"
            >
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </p>
          </div>

          <Link
            to="/"
            className="mt-6 inline-flex min-h-12 items-center rounded px-2 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
          >
            Continue shopping
          </Link>
        </>
      )}
    </section>
  );
}

export default CartPage;
