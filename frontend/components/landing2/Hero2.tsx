"use client";

import Button from "@/components/ui/Button";
import { useScrollAnimation } from "./useScrollAnimation";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "12+", label: "년 노하우" },
  { value: "99%", label: "고객 만족도" },
  { value: "120+", label: "파트너 기업" },
  { value: "5,000+", label: "누적 회원" },
] as const;

export default function Hero2() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/90 to-slate-900" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6,182,212,0.2) 0%, transparent 50%)",
        }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          <span
            className={cn(
              "inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6",
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            기업 건강관리 솔루션
          </span>

          <h1
            className={cn(
              "text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6",
              "transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            임직원 건강이
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              기업 경쟁력
            </span>
            입니다
          </h1>

          <p
            className={cn(
              "text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed",
              "transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            12년간 쌓아온 전문 노하우로 기업 맞춤 건강관리 프로그램을 제공합니다.
            체형분석부터 운동 처방, 건강 리포트까지 올인원 솔루션.
          </p>

          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 mb-16",
              "transition-all duration-700 delay-300",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-600/25">
              무료 상담 신청
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              서비스 소개서 다운로드
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8",
            "transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
