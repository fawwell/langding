"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "./useScrollReveal";

const PROGRAMS = [
  {
    id: "care",
    tab: "1:1 케어",
    image: "/images/professional-courses/1.jpg",
    title: "1:1 근골격계 도수케어 + 교정운동",
    description:
      "통증 원인을 파악하고, 근골격계 부담을 개선합니다. 전문 코치가 개인별 상태에 맞춘 도수치료와 교정운동을 제공합니다.",
    tags: ["통증 완화", "유해요인 관리", "산재 예방"],
    features: [
      "전문가 1:1 체형 분석 및 통증 원인 파악",
      "도수치료 + 맞춤 교정운동 결합",
      "개인별 홈 케어 가이드 제공",
      "주기적 개선 현황 리포트",
    ],
  },
  {
    id: "stretch",
    tab: "단체 스트레칭",
    image: "/images/professional-courses/3.jpg",
    title: "단체 스트레칭 프로그램",
    description:
      "근육 긴장 완화와 바른 자세 형성을 돕습니다. 사무실 의자에 앉아서 진행 가능한 프로그램도 준비되어 있습니다.",
    tags: ["가동성 확보", "유연성 개선", "근육 완화"],
    features: [
      "10~50명 단체 진행 가능",
      "공간 맞춤형 프로그램 (회의실/사무실 OK)",
      "점심시간 30분 속성 클래스",
      "VDT 증후군 예방 특화",
    ],
  },
  {
    id: "fitness",
    tab: "체력증진",
    image: "/images/professional-courses/5.jpg",
    title: "단체 체력증진 프로그램",
    description:
      "유산소 및 근력 운동을 통해 체력을 향상합니다. 만성피로 해소, 혈당 조절, 면역력 강화에 효과적입니다.",
    tags: ["만성피로 해소", "혈당 조절", "면역력 강화"],
    features: [
      "레벨별 맞춤 운동 강도 조절",
      "팀 빌딩 효과로 조직문화 개선",
      "운동 전후 체력 측정 및 비교",
      "주 1~3회 유연한 스케줄",
    ],
  },
  {
    id: "rehab",
    tab: "산재복귀 재활",
    image: "/images/professional-courses/7.jpg",
    title: "산재 복귀자 재활 PT 프로그램",
    description:
      "산재 복귀자의 안전하고 건강한 업무 복귀를 돕습니다. 1:1 전문 재활 PT로 기능 회복과 재발 방지를 동시에 케어합니다.",
    tags: ["산재복귀 지원", "기능 회복", "1:1 케어"],
    features: [
      "산재 이력 기반 맞춤 재활 설계",
      "업무 복귀 단계별 프로그램",
      "재발 방지를 위한 자가관리 교육",
      "주치의 소견 연계 가능",
    ],
  },
] as const;

export default function ProgramsSection2() {
  const [active, setActive] = useState(0);
  const { ref, isVisible } = useScrollReveal();
  const program = PROGRAMS[active];

  return (
    <section id="programs" className="py-24 sm:py-32 bg-slate-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "text-center mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Programs
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            임직원 건강 프로그램
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            조직의 니즈에 맞는 다양한 프로그램을 맞춤 설계합니다.
          </p>
        </div>

        {/* 탭 */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {PROGRAMS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                active === i
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              {p.tab}
            </button>
          ))}
        </div>

        {/* 콘텐츠 */}
        <div
          className={cn(
            "bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* 왼쪽: 프로그램 비주얼 */}
            <div className="relative p-8 sm:p-12 flex flex-col justify-center min-h-[300px] lg:min-h-[400px] overflow-hidden">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 to-blue-800/75" />
              <div className="relative z-10 space-y-3 mb-6">
                {program.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block text-xs font-medium text-blue-100 bg-white/15 px-3 py-1 rounded-full mr-2"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <h3 className="relative z-10 text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                {program.title}
              </h3>
              <p className="relative z-10 text-blue-100 leading-relaxed">
                {program.description}
              </p>
            </div>

            {/* 오른쪽: 특징 */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-6">
                프로그램 특징
              </h4>
              <ul className="space-y-4">
                {program.features.map((feature, i) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-slate-700 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
