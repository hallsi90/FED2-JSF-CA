import { Link } from "react-router";
import { useCartStore } from "../../stores/useCartStore";

interface HeaderProps {
  isSearchOpen: boolean;
  onToggleSearch: () => void;
}

function Header({ isSearchOpen, onToggleSearch }: HeaderProps) {
  const totalQuantity = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  const cartLabel = `View cart, ${totalQuantity} ${
    totalQuantity === 1 ? "item" : "items"
  }`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-300 items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          aria-label="Veya home"
          className="text-3xl font-bold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
        >
          veya
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={isSearchOpen ? "Close search" : "Search products"}
            aria-expanded={isSearchOpen}
            onClick={onToggleSearch}
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md px-3 text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="size-6"
              aria-hidden="true"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 4.5 4.5" strokeLinecap="round" />
            </svg>
          </button>

          <Link
            to="/cart"
            aria-label={cartLabel}
            className="relative inline-flex min-h-12 min-w-12 items-center justify-center rounded-md px-3 text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6"
              aria-hidden="true"
            >
              <path d="M2 3h3l3 12h11l3-9H6" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>

            {totalQuantity > 0 && (
              <span
                aria-hidden="true"
                className="absolute right-0 top-0 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-purple-700 px-1 text-xs font-semibold text-white"
              >
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
