const priceFormatter = new Intl.NumberFormat("nb-NO", {
  style: "currency",
  currency: "NOK",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

export function calculateDiscountPercentage(
  price: number,
  discountedPrice: number,
): number {
  if (price <= 0 || discountedPrice >= price) {
    return 0;
  }

  return Math.round(((price - discountedPrice) / price) * 100);
}
