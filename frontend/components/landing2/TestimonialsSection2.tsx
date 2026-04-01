"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "./useScrollReveal";

const SATISFACTION_IMAGES = Array.from({ length: 12 }, (_, i) => ({
  src: `/images/satisfaction/${String(i + 1).padStart(3, "0")}.jpg`,
  alt: `만족도 조사 결과 ${i + 1}`,
}));

const TESTIMONIALS = [
  {
    name: "김도현 대리",
    role: "IT기업 HR 담당",
    content:
      "회사 복지로 EAP 프로그램을 도입했는데, 임직원 만족도가 매우 높습니다. 출장 운동 서비스 덕분에 점심시간에도 부담 없이 참여할 수 있어 좋아요.",
    rating: 5,
  },
  {
    name: "박선영 과장",
    role: "제조업 안전보건 담당",
    content:
      "늘어나는 산재 발생이 큰 고민이었는데 업무 시작 전 사고를 예방하는 스트레칭 수업을 진행하면서 눈에 띄게 줄었어요. 제 고민이 한번에 해결되었습니다.",
    rating: 5,
  },
  {
    name: "이서진",
    role: "직장인",
    content:
      "돌처럼 굳었던 목이 마술처럼 움직이고 시야도 밝아진 느낌이었습니다. 눈앞이 밝아지니 없던 야근의욕까지 샘솟네요~ 감사합니다!",
    rating: 5,
  },
  {
    name: "정하윤 팀장",
    role: "금융사 복지 담당",
    content:
      "여러 업체 다 알아봤는데, 홈핏 코치분들이 가장 전문적이었어요. 실제로 도입 후에 통증이 줄어들었다는 직원 분들이 많아졌어요.",
    rating: 5,
  },
  {
    name: "오수빈",
    role: "개발자",
    content:
      "팀 단위로 복지 프로그램을 진행했는데, 개발팀 팀원 분들 목과 어깨 통증이 많이 줄어들었다고 합니다. 코드 집중력도 올라간 느낌!",
    rating: 5,
  },
] as const;

export default function TestimonialsSection2() {
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  const next = useCallback(
    () => setCurrent((v) => (v + 1) % TESTIMONIALS.length),
    []
  );

  const prev = useCallback(
    () =>
      setCurrent(
        (v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
      ),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            임직원 98% 이상이 추천하는 프로그램
          </h2>
        </div>

        <div
          className={cn(
            "max-w-3xl mx-auto transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* 큰따옴표 장식 */}
          <div className="text-center mb-8">
            <svg
              className="w-12 h-12 text-blue-200 mx-auto"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
            </svg>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="w-full flex-shrink-0 px-4">
                  <blockquote className="text-center">
                    <p className="text-xl sm:text-2xl text-slate-700 leading-relaxed font-medium">
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <footer className="mt-8">
                      <div className="flex items-center justify-center gap-1 mb-3">
                        {Array.from({ length: t.rating }, (_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="font-semibold text-slate-900">
                        {t.name}
                      </p>
                      <p className="text-sm text-slate-500">{t.role}</p>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* 네비게이션 */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              type="button"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    i === current
                      ? "bg-blue-600 w-6"
                      : "bg-slate-300 hover:bg-slate-400 w-2.5"
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 만족도 조사 결과 갤러리 */}
        <div
          className={cn(
            "mt-20 transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h3 className="text-center text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Satisfaction Survey
          </h3>
          <p className="text-center text-slate-500 text-sm mb-8">
            실제 임직원 만족도 조사 결과입니다
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SATISFACTION_IMAGES.map((img) => (
              <div
                key={img.src}
                className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-slate-50"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={800}
                  className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
