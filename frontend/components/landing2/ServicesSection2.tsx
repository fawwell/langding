"use client";

import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "AI 체형분석 건강검진",
    description:
      "3D 체형측정과 AI 분석으로 임직원의 근골격계 건강 상태를 정밀 진단합니다. 객관적 데이터 기반의 리스크 사전 파악.",
    color: "blue",
  },
  {
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    title: "맞춤 운동 프로그램",
    description:
      "분석 결과 기반 1:1 근골격계 케어, 단체 스트레칭, 체력증진 프로그램까지. 조직 니즈에 맞는 커스텀 설계.",
    color: "cyan",
  },
  {
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    title: "출장 건강관리 서비스",
    description:
      "전문가가 사무실로 직접 방문합니다. 넓은 공간 없이도 의자에서 가능한 프로그램부터 전용 공간 프로그램까지.",
    color: "indigo",
  },
  {
    icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    title: "데이터 리포트",
    description:
      "기업 단위 건강 통계 분석, 분기별 개선 현황, 프로그램 효과 측정 리포트를 제공하여 ROI를 증명합니다.",
    color: "violet",
  },
] as const;

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  blue: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-100" },
  cyan: { bg: "bg-cyan-50", icon: "text-cyan-600", border: "border-cyan-100" },
  indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", border: "border-indigo-100" },
  violet: { bg: "bg-violet-50", icon: "text-violet-600", border: "border-violet-100" },
};

export default function ServicesSection2() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="services" className="py-24 sm:py-32 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Services
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            기업 맞춤 건강관리 솔루션
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            단순한 프로그램 제공이 아니라, 조직에 맞게 설계된 프로그램을 운영합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => {
            const colors = colorMap[service.color];
            return (
              <div
                key={service.title}
                className={cn(
                  "group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-500",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: isVisible ? `${i * 120}ms` : "0ms" }}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
                    colors.bg
                  )}
                >
                  <svg
                    className={cn("w-6 h-6", colors.icon)}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={service.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* 현장 사진 */}
        <div
          className={cn(
            "mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {[
            { src: "/images/physical-care/001.jpg", caption: "출장 피지컬케어 현장" },
            { src: "/images/physical-care/002.jpg", caption: "임직원 건강관리 프로그램" },
          ].map((img) => (
            <div
              key={img.src}
              className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg group"
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-5 text-white font-medium text-sm">
                {img.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
