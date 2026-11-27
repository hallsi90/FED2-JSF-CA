import { Link } from "react-router";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-300 flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-600">© 2026 Veya.</p>
        <nav aria-label="Footer">
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center text-sm font-medium text-slate-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
