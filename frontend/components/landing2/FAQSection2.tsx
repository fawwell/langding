"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "./useScrollReveal";

const FAQS = [
  {
    q: "프로그램 도입 비용은 어떻게 되나요?",
    a: "기업 규모, 참여 인원, 프로그램 종류에 따라 맞춤 견적을 제공합니다. 무료 상담을 통해 최적의 플랜을 제안받으실 수 있습니다.",
  },
  {
    q: "최소 참여 인원이 있나요?",
    a: "1:1 프로그램은 1명부터, 단체 프로그램은 5명 이상부터 진행 가능합니다. 소규모 기업도 부담 없이 시작할 수 있습니다.",
  },
  {
    q: "어떤 공간이 필요한가요?",
    a: "사무실 의자에서 진행하는 프로그램부터 별도 공간이 필요한 프로그램까지 다양합니다. 공간 환경에 맞춰 프로그램을 설계해 드립니다.",
  },
  {
    q: "전문가는 어떻게 검증하나요?",
    a: "자격증 보유 여부, 현장 경력, 수업 평가를 거쳐 상위 등급 전문가만 배정합니다. 안전 교육 이수와 보험 가입도 필수입니다.",
  },
  {
    q: "무료 파일럿 프로그램이 있나요?",
    a: "네, 도입 전 무료 파일럿을 통해 우리 기업에 맞는지 확인하실 수 있습니다. 파일럿 후 만족하셔야 정식 계약으로 진행됩니다.",
  },
  {
    q: "프로그램 효과를 어떻게 측정하나요?",
    a: "AI 체형분석, 통증 지수(VAS), 유연성 검사 등 객관적 데이터로 Before/After를 비교합니다. 분기별 리포트를 통해 ROI를 확인하실 수 있습니다.",
  },
] as const;

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base font-medium text-slate-900 pr-4 group-hover:text-blue-600 transition-colors">
          {faq.q}
        </span>
        <svg
          className={cn(
            "w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300",
            isOpen && "rotate-180 text-blue-600"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-48 pb-5" : "max-h-0"
        )}
      >
        <p className="text-slate-600 leading-relaxed">{faq.a}</p>
      </div>
    </div>
  );
}

export default function FAQSection2() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white">
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "text-center mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            자주 묻는 질문
          </h2>
        </div>

        <div
          className={cn(
            "bg-white rounded-2xl border border-slate-200 px-6 sm:px-8 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.q}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
