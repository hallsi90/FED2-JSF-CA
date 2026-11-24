import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Toast from "../feedback/Toast";
import { useToastStore } from "../../stores/useToastStore";

function Layout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isCartPage = useMatch("/cart") !== null;
  const message = useToastStore((state) => state.message);
  const toastId = useToastStore((state) => state.toastId);
  const clearToast = useToastStore((state) => state.clearToast);

  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (previousPath.current === location.pathname) {
      return;
    }

    previousPath.current = location.pathname;
    const main = mainRef.current;

    // Keep focus placed by the search input or the checkout confirmation.
    if (main && !main.contains(document.activeElement)) {
      const heading = main.querySelector("h1");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus();
      } else {
        main.focus();
      }
    }
  }, [location.pathname]);

  // Keep the same timer when the toast changes position during navigation.
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(clearToast, 8000);

    return () => window.clearTimeout(timeoutId);
  }, [message, toastId, clearToast]);

  function toggleSearch() {
    if (location.pathname !== "/") {
      setIsSearchOpen(true);
      navigate("/");
      return;
    }

    setIsSearchOpen((isOpen) => !isOpen);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        isSearchOpen={location.pathname === "/" && isSearchOpen}
        onToggleSearch={toggleSearch}
      />

      <main
        ref={mainRef}
        tabIndex={-1}
        className="mx-auto w-full max-w-300 flex-1 px-4 py-8 sm:px-6 lg:px-8"
      >
        <Outlet context={{ isSearchOpen }} />
      </main>

      <Footer />
      {!isCartPage && <Toast />}
    </div>
  );
}

export default Layout;
