import { Link } from "react-router";
import ProductImage from "../components/products/ProductImage";
import { useCartStore } from "../stores/useCartStore";
import { formatPrice } from "../utils/price";

function CartPage() {
  const items = useCartStore((state) => state.items);

  return (
    <section>
      <h1 className="text-3xl font-bold">Shopping cart</h1>

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
                    className="size-20 shrink-0 rounded-md object-contain sm:size-28"
                  />

                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold">
                      <Link
                        to={`/products/${encodeURIComponent(item.product.id)}`}
                        className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
                      >
                        {item.product.title}
                      </Link>
                    </h2>

                    <p className="mt-2 font-semibold">
                      {formatPrice(sellingPrice)}
                      <span className="ml-1 text-sm font-normal text-slate-600">
                        per item
                      </span>
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

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
