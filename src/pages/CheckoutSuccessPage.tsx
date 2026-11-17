import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";

function CheckoutSuccessPage() {
  const location = useLocation();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const navigationState: unknown = location.state;

  const checkoutComplete =
    typeof navigationState === "object" &&
    navigationState !== null &&
    "checkoutComplete" in navigationState &&
    navigationState.checkoutComplete === true;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
      <title>
        {checkoutComplete ? "Checkout complete | Veya" : "No checkout to confirm | Veya"}
      </title>
      {checkoutComplete && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
          className="mb-5 size-12 text-emerald-700"
        >
          <circle cx="12" cy="12" r="9" />
          <path
            d="m8 12 3 3 5-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      <h1
        ref={headingRef}
        tabIndex={-1}
        className="rounded text-3xl font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
      >
        {checkoutComplete ? "Checkout complete" : "No checkout to confirm"}
      </h1>

      <p className="mt-4 leading-relaxed text-slate-600">
        {checkoutComplete
          ? "Thank you for your purchase!"
          : "Complete checkout from your shopping cart to see a confirmation."}
      </p>

      <Link
        to={checkoutComplete ? "/" : "/cart"}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
      >
        {checkoutComplete ? "Continue shopping" : "View cart"}
      </Link>
    </section>
  );
}

export default CheckoutSuccessPage;
