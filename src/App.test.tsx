import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, test, vi } from "vitest";
import App from "./App";
import { fetchProduct, fetchProducts } from "./services/products";
import { useCartStore } from "./stores/useCartStore";
import type { Product } from "./types/product";

vi.mock("./services/products");

const toyCar: Product = {
  id: "toy-car",
  title: "Toy car",
  description: "A small toy car.",
  price: 100,
  discountedPrice: 80,
  image: { url: "/toy-car.jpg", alt: "Toy car" },
  rating: 0,
  tags: [],
  reviews: [],
};

test("searches for a product and completes checkout with the correct cart totals", async () => {
  useCartStore.getState().clearCart();
  vi.mocked(fetchProducts).mockResolvedValue([
    toyCar,
    { ...toyCar, id: "headphones", title: "Headphones" },
  ]);
  vi.mocked(fetchProduct).mockResolvedValue(toyCar);

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  await screen.findByRole("heading", { name: "Headphones" });
  fireEvent.click(screen.getByRole("button", { name: "Search products" }));
  fireEvent.change(screen.getByRole("searchbox"), {
    target: { value: "toy" },
  });

  const results = screen.getByRole("region", { name: "Search results" });
  expect(within(results).getAllByRole("link")).toHaveLength(1);
  const productLink = within(results).getByRole("link", { name: "Toy car" });
  expect(productLink.getAttribute("href")).toBe("/products/toy-car");
  fireEvent.click(productLink);

  await screen.findByRole("heading", { level: 1, name: "Toy car" });
  expect(fetchProduct).toHaveBeenCalledWith(toyCar.id);
  fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
  fireEvent.click(screen.getByRole("link", { name: "View cart, 1 item" }));

  expect(screen.getByText("Total").parentElement?.textContent).toMatch(
    /^Total80,00\s*kr$/,
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Increase quantity for Toy car" }),
  );

  expect(screen.getByRole("link", { name: "View cart, 2 items" })).toBeTruthy();
  expect(screen.getByText("Total").parentElement?.textContent).toMatch(
    /^Total160,00\s*kr$/,
  );

  fireEvent.click(screen.getByRole("button", { name: "Checkout" }));
  expect(
    screen.getByRole("heading", { name: "Checkout complete" }),
  ).toBeTruthy();

  fireEvent.click(screen.getByRole("link", { name: "View cart, 0 items" }));
  expect(screen.getByText("Your cart is empty.")).toBeTruthy();
});
