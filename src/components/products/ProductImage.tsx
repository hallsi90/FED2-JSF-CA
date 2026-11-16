import { useState } from "react";
import type { ProductImage as ProductImageData } from "../../types/product";

interface ProductImageProps {
  image: ProductImageData;
  title: string;
  className?: string;
  loading?: "eager" | "lazy";
}

function ProductImage({
  image,
  title,
  className = "",
  loading = "eager",
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!image.url.trim() || hasError) {
    return (
      <div
        role="img"
        aria-label={`Image unavailable for ${title}`}
        className={`flex items-center justify-center bg-slate-100 text-center text-slate-600 ${className}`}
      >
        <span aria-hidden="true">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={image.url}
      alt={image.alt.trim() || title}
      onError={() => setHasError(true)}
      className={className}
      loading={loading}
    />
  );
}

export default ProductImage;
