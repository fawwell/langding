"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";
import { cn } from "@/lib/utils";

const PRESS_IMAGES = [
  { src: "/images/articles/1.jpg", alt: "언론 보도 1" },
  { src: "/images/articles/2.png", alt: "언론 보도 2" },
  { src: "/images/articles/3.jpg", alt: "언론 보도 3" },
  { src: "/images/articles/4.jpg", alt: "언론 보도 4" },
  { src: "/images/articles/5.jpg", alt: "언론 보도 5" },
  { src: "/images/articles/6.png", alt: "언론 보도 6" },
  { src: "/images/articles/7.jpg", alt: "언론 보도 7" },
  { src: "/images/articles/8.jpg", alt: "언론 보도 8" },
  { src: "/images/articles/9.png", alt: "언론 보도 9" },
] as const;

const RESULTS = [
  { value: 120, suffix: "+", label: "파트너 기업", description: "다양한 업종의 기업 고객사" },
  { value: 99, suffix: "%", label: "재계약률", description: "압도적인 고객사 유지율" },
  { value: 35, suffix: "%", label: "통증 감소", description: "근골격계 통증 평균 감소율" },
  { value: 98, suffix: "%", label: "만족도", description: "임직원 프로그램 만족도" },
] as const;

function Counter({
  target,
  suffix,
  active,
}: {
  target: number;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let current = 0;
    const steps = 50;
    const inc = target / steps;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <>
      {active ? count : 0}
      {suffix}
    </>
  );
}

export default function ResultsSection2() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section
      id="results"
      className="py-24 sm:py-32 bg-gradient-to-b from-slate-900 to-blue-950 text-white"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
            Results
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
            데이터로 증명하는{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              프로그램 효과
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            SportCoach와 함께한 기업들의 실제 성과입니다.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {RESULTS.map((r, i) => (
            <div
              key={r.label}
              className={cn(
                "text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-700",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}
            >
              <p className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-2">
                <Counter target={r.value} suffix={r.suffix} active={isVisible} />
              </p>
              <p className="text-blue-300 font-semibold mb-1">{r.label}</p>
              <p className="text-sm text-slate-400">{r.description}</p>
            </div>
          ))}
        </div>

        {/* 세부 지표 */}
        <div
          className={cn(
            "mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-4">근골격계 지표 개선</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">불편함(ROM) 감소</span>
                  <span className="text-blue-400 font-semibold">47% ↓</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000 delay-700"
                    style={{ width: isVisible ? "47%" : "0%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">유연성/가동성(VAS) 상승</span>
                  <span className="text-cyan-400 font-semibold">74% ↑</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-1000 delay-900"
                    style={{ width: isVisible ? "74%" : "0%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-4">직무 스트레스 감소</h3>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-sm text-slate-400 mb-1">Before</p>
                <p className="text-3xl font-bold text-slate-300">5.2<span className="text-base">점</span></p>
              </div>
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400 mb-1">After</p>
                <p className="text-3xl font-bold text-blue-400">2.4<span className="text-base">점</span></p>
              </div>
              <div className="ml-auto text-center">
                <p className="text-2xl font-bold text-cyan-400">53.8%</p>
                <p className="text-sm text-slate-400">스트레스 감소</p>
              </div>
            </div>
          </div>
        </div>

        {/* 언론 보도 */}
        <div
          className={cn(
            "mt-20 transition-all duration-700 delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h3 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
            Media & Press
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRESS_IMAGES.map((img, i) => (
              <div
                key={img.src}
                className="relative aspect-[16/10] rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10"
                style={{ transitionDelay: isVisible ? `${800 + i * 80}ms` : "0ms" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain p-1"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
