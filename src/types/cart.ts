import type { Product } from "./product";

export type CartProduct = Pick<
  Product,
  "id" | "title" | "price" | "discountedPrice" | "image"
>;

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface CartActions {
  addItem: (product: CartProduct) => void;
  removeItem: (productId: CartProduct["id"]) => void;
  setQuantity: (productId: CartProduct["id"], quantity: number) => void;
  clearCart: () => void;
}

export type CartStore = CartState & CartActions;
