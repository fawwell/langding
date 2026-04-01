"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly program: string;
  readonly rating: number;
  readonly content: string;
  readonly company: string;
}

const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "review-1",
    name: "이서진",
    program: "1:1 체형교정 트레이닝",
    rating: 5,
    content:
      "체형분석 결과를 기반으로 한 맞춤 프로그램이 인상적이었습니다. 3개월 만에 거북목과 라운드숄더가 눈에 띄게 개선됐고, 만성 어깨 통증도 거의 사라졌어요.",
    company: "직장인 · 강남점",
  },
  {
    id: "review-2",
    name: "정하윤",
    program: "산전산후 케어",
    rating: 5,
    content:
      "출산 후 골반 틀어짐과 허리 통증이 심했는데, 체형분석 후 맞춤 재활 프로그램으로 6개월 만에 출산 전 체형을 되찾았습니다. 데이터로 변화를 확인할 수 있어 좋았어요.",
    company: "주부 · 동탄점",
  },
  {
    id: "review-3",
    name: "김도현 대리",
    program: "기업 EAP 프로그램",
    rating: 5,
    content:
      "회사 복지로 EAP 프로그램을 도입했는데, 임직원 만족도가 매우 높습니다. 출장 운동 서비스 덕분에 점심시간에도 부담 없이 참여할 수 있어 좋아요.",
    company: "IT기업 HR · 여의도점",
  },
  {
    id: "review-4",
    name: "박지훈",
    program: "스포츠지도사 2급",
    rating: 5,
    content:
      "독학으로 3번 떨어졌는데, 여기서 8주 과정 수강 후 실기·구술 모두 한 번에 합격했습니다. 현직 심사위원 출신 강사님의 포인트 짚어주시는 게 결정적이었어요.",
    company: "합격생 · 영등포 본점",
  },
  {
    id: "review-5",
    name: "오수빈",
    program: "PTS 실무 과정",
    rating: 5,
    content:
      "수료 후 바로 직영 센터에 취업했습니다. 실제 회원 대상으로 실습한 경험이 큰 도움이 됐고, AI 체형분석 시스템 활용법을 배운 게 차별화 포인트가 됐어요.",
    company: "트레이너 · 강남점",
  },
];

function StarRating({ rating }: { readonly rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating}점`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={cn(
            "w-4 h-4",
            i < rating ? "text-amber-400" : "text-slate-200"
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  readonly testimonial: Testimonial;
}) {
  return (
    <article className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 flex flex-col min-w-[300px] sm:min-w-[350px]">
      <StarRating rating={testimonial.rating} />

      <p className="mt-4 text-slate-600 text-sm leading-relaxed flex-grow">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-white">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">
            {testimonial.name}
          </p>
          <p className="text-xs text-slate-500">
            {testimonial.program} &middot; {testimonial.company}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, TESTIMONIALS.length - 1);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            회원 후기
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            체형분석 기반 맞춤 프로그램을 경험한 회원들의 실제 후기입니다.
          </p>
        </div>

        {/* 캐러셀 */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 sm:w-1/2 lg:w-1/3"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* 네비게이션 */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm"
              aria-label="이전 후기"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-blue-600 w-6"
                      : "bg-slate-300 hover:bg-slate-400 w-2.5"
                  )}
                  aria-label={`후기 ${index + 1}로 이동`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm"
              aria-label="다음 후기"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
