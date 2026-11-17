import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { persistedCartSchema } from "../schemas/cartSchema";
import type { CartStore } from "../types/cart";

const CART_STORAGE_KEY = "veya-cart";

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),

      // Persist data only, keeping actions defined in code.
      partialize: (state) => ({
        items: state.items,
      }),

      merge: (persistedState, currentState) => {
        const result = persistedCartSchema.safeParse(persistedState);

        return {
          ...currentState,
          items: result.success ? result.data.items : [],
        };
      },

      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          // Discard unreadable JSON and keep the initial empty cart.
          try {
            localStorage.removeItem(CART_STORAGE_KEY);
          } catch {
            // The cart still works in memory if storage is unavailable.
          }
        }
      },
    },
  ),
);
