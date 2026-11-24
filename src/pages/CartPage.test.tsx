import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, expect, test } from "vitest";
import Header from "../components/layout/Header";
import { useCartStore } from "../stores/useCartStore";
import { useToastStore } from "../stores/useToastStore";
import type { CartProduct } from "../types/cart";
import CartPage from "./CartPage";
import CheckoutSuccessPage from "./CheckoutSuccessPage";

const toyCar: CartProduct = {
  id: "toy-car",
  title: "Toy car",
  price: 99.99,
  discountedPrice: 79.99,
  image: { url: "/toy-car.jpg", alt: "Toy car" },
};

beforeEach(() => {
  useCartStore.getState().clearCart();
  useToastStore.getState().clearToast();
});

function renderCart() {
  render(
    <MemoryRouter initialEntries={["/cart"]}>
      <Header isSearchOpen={false} onToggleSearch={() => {}} />
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

test("adds the same product twice as one cart line with quantity two", () => {
  const { addItem } = useCartStore.getState();

  addItem(toyCar);
  addItem(toyCar);
  renderCart();

  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  const quantity = screen.getByRole<HTMLInputElement>("textbox");

  expect(quantity.value).toBe("2");
});

test("updates the discounted total and header count when quantity changes or an item is removed", () => {
  useCartStore.getState().addItem(toyCar);
  renderCart();

  fireEvent.click(
    screen.getByRole("button", { name: "Increase quantity for Toy car" }),
  );

  const cartLink = screen.getByRole("link", { name: "View cart, 2 items" });

  expect(cartLink.textContent).toBe("2");
  expect(screen.getByText(/^159,98\s*kr$/)).toBeTruthy();

  fireEvent.click(
    screen.getByRole("button", { name: "Decrease quantity for Toy car" }),
  );

  expect(screen.getByRole("link", { name: "View cart, 1 item" })).toBeTruthy();

  fireEvent.click(
    screen.getByRole("button", { name: "Remove Toy car from cart" }),
  );

  expect(screen.getByText("Your cart is empty.")).toBeTruthy();
  expect(screen.getByRole("link", { name: "View cart, 0 items" })).toBeTruthy();
});

test("clears the cart when checkout is completed", () => {
  useCartStore.getState().addItem(toyCar);
  renderCart();

  fireEvent.click(screen.getByRole("button", { name: "Checkout" }));

  expect(
    screen.getByRole("heading", { name: "Checkout complete" }),
  ).toBeTruthy();
  fireEvent.click(screen.getByRole("link", { name: "View cart, 0 items" }));
  expect(screen.getByText("Your cart is empty.")).toBeTruthy();
});
