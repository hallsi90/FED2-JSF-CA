import { useId, useState } from "react";
import { useCartStore } from "../../stores/useCartStore";
import type { CartItem } from "../../types/cart";

interface CartQuantityProps {
  item: CartItem;
}

function CartQuantity({ item }: CartQuantityProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  const [draft, setDraft] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const setQuantity = useCartStore((state) => state.setQuantity);

  function saveQuantity() {
    if (draft === null) {
      return;
    }

    const value = draft.trim();
    const quantity = Number(value);

    // Require digits only and a positive, safe whole number.
    if (
      !/^[0-9]+$/.test(value) ||
      !Number.isSafeInteger(quantity) ||
      quantity < 1
    ) {
      setHasError(true);
      return;
    }

    setQuantity(item.product.id, quantity);
    setDraft(null);
    setHasError(false);
  }

  function changeQuantity(change: number) {
    const currentItem = useCartStore
      .getState()
      .items.find((cartItem) => cartItem.product.id === item.product.id);

    if (!currentItem) {
      return;
    }

    const quantity = currentItem.quantity + change;

    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      return;
    }

    setQuantity(item.product.id, quantity);
    setDraft(null);
    setHasError(false);
  }

  const buttonClassName =
    "inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-xl text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white";

  return (
    <div className="mt-4">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-slate-700"
      >
        Quantity
        <span className="sr-only"> for {item.product.title}</span>
      </label>

      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => changeQuantity(-1)}
          disabled={item.quantity <= 1}
          aria-label={`Decrease quantity for ${item.product.title}`}
          className={buttonClassName}
        >
          <span aria-hidden="true">−</span>
        </button>

        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          value={draft ?? String(item.quantity)}
          onChange={(event) => {
            setDraft(event.target.value);
            setHasError(false);
          }}
          onBlur={saveQuantity}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
            }
          }}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={`min-h-12 w-16 min-w-0 rounded-lg border bg-white px-2 py-2 text-center text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 ${
            hasError ? "border-red-700" : "border-slate-300"
          }`}
        />

        <button
          type="button"
          onClick={() => changeQuantity(1)}
          disabled={item.quantity >= Number.MAX_SAFE_INTEGER}
          aria-label={`Increase quantity for ${item.product.title}`}
          className={buttonClassName}
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>

      {hasError && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-red-700">
          Enter a whole number of at least 1. Cart quantity remains{" "}
          {item.quantity}.
        </p>
      )}
    </div>
  );
}

export default CartQuantity;
