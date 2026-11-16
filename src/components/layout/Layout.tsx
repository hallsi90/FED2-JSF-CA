import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

      <main className="mx-auto w-full max-w-300 flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet context={{ isSearchOpen }} />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
