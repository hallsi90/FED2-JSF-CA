import { z } from "zod";
import type { CartState } from "../types/cart";

const cartProductSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  price: z.number().nonnegative(),
  discountedPrice: z.number().nonnegative(),
  image: z.object({
    url: z.string(),
    alt: z.string(),
  }),
});

const cartItemSchema = z.object({
  product: cartProductSchema,
  quantity: z.int().positive(),
});

export const persistedCartSchema: z.ZodType<CartState> = z.object({
  items: z
    .array(cartItemSchema)
    .refine(
      (items) =>
        new Set(items.map((item) => item.product.id)).size === items.length,
      {
        message: "Each product must have a unique cart line.",
      },
    ),
});
