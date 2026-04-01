"use client";

import { useScrollReveal } from "./useScrollReveal";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: "01",
    title: "무료 상담",
    description: "기업 규모, 업종, 니즈를 파악하여 최적의 프로그램을 제안합니다.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    step: "02",
    title: "건강 분석",
    description: "AI 체형분석과 설문을 통해 임직원의 건강 상태를 진단합니다.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    step: "03",
    title: "프로그램 설계",
    description: "분석 결과를 바탕으로 기업 맞춤 프로그램을 설계합니다.",
    icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
  },
  {
    step: "04",
    title: "운영 & 관리",
    description: "전문가 파견부터 리포트까지, 운영 전 과정을 책임집니다.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
] as const;

export default function ProcessSection2() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="process" className="py-24 sm:py-32 bg-slate-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Process
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            도입 절차
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            건강 복지의 시작부터 끝까지, 기업에 알맞는 프로그램 맞춤 설계
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* 연결선 (데스크톱) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-blue-100" />

          {STEPS.map((step, i) => (
            <div
              key={step.step}
              className={cn(
                "relative text-center transition-all duration-700",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}
            >
              <div className="relative z-10 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/20">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={step.icon}
                  />
                </svg>
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Step {step.step}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
