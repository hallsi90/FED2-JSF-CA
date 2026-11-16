import { Link } from "react-router";
import type { Product } from "../../types/product";
import { calculateDiscountPercentage, formatPrice } from "../../utils/price";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountedPrice < product.price;
  const discountPercentage = calculateDiscountPercentage(
    product.price,
    product.discountedPrice,
  );

  return (
    <article className="h-full">
      <Link
        to={`/products/${encodeURIComponent(product.id)}`}
        className="block h-full overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
      >
        <div className="relative">
          <img
            src={product.image.url}
            alt={product.image.alt.trim() || product.title}
            loading="lazy"
            className="aspect-square w-full object-contain p-4"
          />

          {hasDiscount && (
            <span className="absolute left-3 top-3 rounded bg-red-700 px-2 py-1 text-sm font-semibold text-white">
              {discountPercentage}% off
            </span>
          )}
        </div>

        <div className="space-y-3 p-4">
          <h2 className="text-lg font-semibold">{product.title}</h2>

          <p className="text-sm text-slate-600">Rating: {product.rating} / 5</p>

          <div className="flex flex-wrap items-baseline gap-2">
            {hasDiscount && (
              <del className="text-sm text-slate-600">
                <span className="sr-only">Original price: </span>
                {formatPrice(product.price)}
              </del>
            )}

            <p
              className={`font-semibold ${
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
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
