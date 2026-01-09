"use client";

import { useEffect, PropsWithChildren, FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const AppShell: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  // Homepage has its own layout - render children directly
  const isHomepage = pathname === "/";

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    AOS.refresh();
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
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-start px-6 py-4">
        <Link
          href="/"
          className="bg-white hover:bg-gray-50 transition-colors"
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
        <nav className="flex gap-6 pt-2">
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
      </header>

      {/* Main Content */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export default AppShell;
