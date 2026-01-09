"use client";

import { useEffect, useState, PropsWithChildren, FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const AppShell: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Homepage has its own layout - render children directly
  const isHomepage = pathname === "/";

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Homepage uses its own full-screen layout
  if (isHomepage) {
    return <>{children}</>;
  }

  // Projects page has dark background, blogs has light background
  const isProjectsPage = pathname === "/projects";
  const isDarkBg = isProjectsPage;

  return (
    <div id="app" className="min-h-screen">
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-end md:justify-between items-start px-6 py-4">
        <Link
          href="/"
          className="bg-white hover:bg-gray-50 transition-colors hidden md:block"
          style={{
            padding: "4px",
            border: "2px solid #1a1a1a",
          }}
        >
          <span
            style={{
              display: "block",
              writingMode: "vertical-rl",
              textOrientation: "upright",
              letterSpacing: "0.15em",
              padding: "10px 6px",
              border: "2px solid #1a1a1a",
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "#1a1a1a",
            }}
          >
            コーン
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 pt-2">
          <Link
            href="/"
            className={`text-sm transition-colors ${
              pathname === "/"
                ? isDarkBg ? "text-white font-semibold" : "text-slate-800 font-semibold"
                : isDarkBg ? "text-white/80 hover:text-white" : "text-slate-700/70 hover:text-slate-800"
            }`}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className={`text-sm transition-colors ${
              pathname === "/projects"
                ? isDarkBg ? "text-white font-semibold" : "text-slate-800 font-semibold"
                : isDarkBg ? "text-white/80 hover:text-white" : "text-slate-700/70 hover:text-slate-800"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/blogs"
            className={`text-sm transition-colors ${
              pathname === "/blogs" || pathname.startsWith("/blogs/")
                ? isDarkBg ? "text-white font-semibold" : "text-slate-800 font-semibold"
                : isDarkBg ? "text-white/80 hover:text-white" : "text-slate-700/70 hover:text-slate-800"
            }`}
          >
            Blogs
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className={`w-6 h-6 ${isDarkBg ? "text-white" : "text-slate-800"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`fixed top-14 right-4 z-50 md:hidden rounded-lg shadow-lg ${isDarkBg ? "bg-gray-800" : "bg-white"}`}>
          <nav className="flex flex-col py-2">
            <Link
              href="/"
              className={`px-6 py-3 text-sm transition-colors ${
                pathname === "/"
                  ? isDarkBg ? "text-white font-semibold bg-gray-700" : "text-slate-800 font-semibold bg-gray-100"
                  : isDarkBg ? "text-white/80 hover:bg-gray-700" : "text-slate-700 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={`px-6 py-3 text-sm transition-colors ${
                pathname === "/projects"
                  ? isDarkBg ? "text-white font-semibold bg-gray-700" : "text-slate-800 font-semibold bg-gray-100"
                  : isDarkBg ? "text-white/80 hover:bg-gray-700" : "text-slate-700 hover:bg-gray-100"
              }`}
            >
              Projects
            </Link>
            <Link
              href="/blogs"
              className={`px-6 py-3 text-sm transition-colors ${
                pathname === "/blogs" || pathname.startsWith("/blogs/")
                  ? isDarkBg ? "text-white font-semibold bg-gray-700" : "text-slate-800 font-semibold bg-gray-100"
                  : isDarkBg ? "text-white/80 hover:bg-gray-700" : "text-slate-700 hover:bg-gray-100"
              }`}
            >
              Blogs
            </Link>
          </nav>
        </div>
      )}

      {/* Overlay to close menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export default AppShell;
