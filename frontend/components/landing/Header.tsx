"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "센터소개", href: "#center" },
  { label: "프로그램", href: "#programs" },
  { label: "기업케어", href: "#eap" },
  { label: "교육", href: "#education" },
  { label: "문의", href: "#contact" },
] as const;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* 로고 */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-navy-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Sport<span className="text-blue-600">Coach</span>
            </span>
          </a>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href + item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200 rounded-lg hover:bg-blue-50/50"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* 우측 버튼 그룹 */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              회원가입
            </Button>
            <Button variant="primary" size="sm">
              로그인
            </Button>
          </div>

          {/* 모바일 메뉴 토글 */}
          <button
            type="button"
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={handleToggleMenu}
            aria-label="메뉴 열기"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-[500px] pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-slate-100">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href + item.label}
                href={item.href}
                className="text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 font-medium py-3 px-3 rounded-lg transition-colors duration-200"
                onClick={handleCloseMenu}
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-3 mt-3 pt-3 border-t border-slate-100">
              <Button variant="outline" size="sm" className="flex-1">
                회원가입
              </Button>
              <Button variant="primary" size="sm" className="flex-1">
                로그인
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
