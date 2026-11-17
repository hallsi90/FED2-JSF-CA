import { create } from "zustand";
import type { CartStore } from "../types/cart";

export const useCartStore = create<CartStore>()((set) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            product: {
              id: product.id,
              title: product.title,
              price: product.price,
              discountedPrice: product.discountedPrice,
              image: { ...product.image },
            },
            quantity: 1,
          },
        ],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),

  setQuantity: (productId, quantity) => {
    // Keep quantities as positive whole numbers.
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    }));
  },

  clearCart: () => set({ items: [] }),
}));
