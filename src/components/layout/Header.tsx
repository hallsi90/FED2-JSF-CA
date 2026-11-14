import { Link } from "react-router";

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-300 items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          aria-label="Veya home"
          className="text-3xl font-bold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D28D9]"
        >
          veya
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search products"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md px-3 text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D28D9]"
          >
            Search
          </button>
          <Link
            to="/cart"
            aria-label="View cart"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md px-3 text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D28D9]"
          >
            Cart
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
