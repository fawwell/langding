"use client";

import { useScrollReveal } from "./useScrollReveal";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CTASection2() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div
        ref={ref}
        className={cn(
          "relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          임직원 건강관리,
          <br />
          지금 시작하세요
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          무료 파일럿 프로그램으로 우리 기업에 맞는지 먼저 확인해보세요.
          <br className="hidden sm:block" />
          전문 상담사가 맞춤 프로그램을 제안해 드립니다.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg shadow-blue-900/20 px-10 font-bold"
          >
            무료 상담 신청하기
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/40 text-white hover:bg-white/10 px-10"
          >
            02-2678-1234 전화 상담
          </Button>
        </div>
        <p className="mt-6 text-sm text-blue-200">
          ✓ 무료 파일럿 제공 &nbsp;&nbsp; ✓ 맞춤 프로그램 설계 &nbsp;&nbsp; ✓ 24시간 내 답변
        </p>
      </div>
    </section>
  );
}
