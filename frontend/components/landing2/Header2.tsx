"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const NAV_ITEMS = [
  { label: "서비스", href: "#services" },
  { label: "프로그램", href: "#programs" },
  { label: "성과", href: "#stats" },
  { label: "도입 프로세스", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "문의", href: "#cta" },
] as const;

export default function Header2() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <a href="/main2" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span
              className={cn(
                "text-xl font-bold tracking-tight transition-colors",
                scrolled ? "text-slate-900" : "text-white"
              )}
            >
              Sport<span className="text-blue-500">Coach</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                  scrolled
                    ? "text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant={scrolled ? "ghost" : "outline"}
              size="sm"
              className={
                scrolled
                  ? ""
                  : "border-white/30 text-white hover:bg-white/10"
              }
            >
              로그인
            </Button>
            <Button variant="primary" size="sm">
              무료 상담 신청
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled
                ? "text-slate-600 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-white/10">
            <div className="flex flex-col gap-1 pt-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "py-3 px-3 rounded-lg font-medium transition-colors",
                    scrolled
                      ? "text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex gap-3 mt-3 pt-3 border-t border-slate-100/20">
                <Button variant="outline" size="sm" className="flex-1">
                  로그인
                </Button>
                <Button variant="primary" size="sm" className="flex-1">
                  무료 상담
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
