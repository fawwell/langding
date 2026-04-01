"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

const STATS = [
  { value: 12, suffix: "년+", label: "B2B 건강관리 노하우" },
  { value: 120, suffix: "+", label: "파트너 기업" },
  { value: 99, suffix: "%", label: "고객 만족도" },
  { value: 5000, suffix: "+", label: "누적 관리 회원" },
] as const;

function AnimatedCounter({
  target,
  suffix,
  isVisible,
}: {
  target: number;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span>
      {isVisible ? count.toLocaleString() : "0"}
      {suffix}
    </span>
  );
}

export default function HeroSection2() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/5 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
        <div
          className={`max-w-3xl transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            AI 체형분석 기반 과학적 운동 처방
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6 tracking-tight">
            임직원 건강을
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              데이터로 설계
            </span>
            합니다
          </h1>

          <p className="max-w-xl text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed">
            12년 B2B 건강관리 노하우와 AI 체형분석 기술로
            <br className="hidden sm:block" />
            기업 맞춤 건강 프로그램을 제공합니다.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 px-8"
            >
              무료 상담 신청하기
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-500 text-slate-200 hover:bg-white/5 hover:border-slate-400"
            >
              도입 사례 보기
            </Button>
          </div>
        </div>

        {/* 통계 */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-20 pt-12 border-t border-white/10 transition-all duration-1000 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={visible}
                />
              </p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
