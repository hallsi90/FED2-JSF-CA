import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import ProductImage from "./ProductImage";

test("uses the product name when image alternative text is empty", () => {
  render(
    <ProductImage image={{ url: "/toy-car.jpg", alt: "" }} title="Toy car" />,
  );

  const image = screen.getByRole("img", { name: "Toy car" });
  expect(image).toBeInstanceOf(HTMLImageElement);
});
