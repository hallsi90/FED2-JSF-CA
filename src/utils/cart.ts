import type { CartItem } from "../types/cart";

export function calculateCartTotal(items: readonly CartItem[]): number {
  const totalInOre = items.reduce((total, item) => {
    const sellingPrice = Math.min(
      item.product.price,
      item.product.discountedPrice,
    );

    // Calculate with whole øre before converting back to kroner.
    const unitPriceInOre = Math.round(sellingPrice * 100);

    return total + unitPriceInOre * item.quantity;
  }, 0);

  return totalInOre / 100;
}
