"use client";

import { useScrollAnimation } from "./useScrollAnimation";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const PROGRAMS = [
  {
    tag: "인기",
    title: "오피스 피트니스",
    description: "사무실에서 진행하는 소규모 그룹 운동. 목/어깨/허리 통증 예방과 체력 증진에 최적화된 프로그램.",
    duration: "주 2~3회 / 50분",
    capacity: "5~15명",
    color: "from-blue-500 to-blue-600",
  },
  {
    tag: "추천",
    title: "임원 PT",
    description: "C-Level 임원을 위한 프리미엄 1:1 퍼스널 트레이닝. 바쁜 일정에 맞춘 효율적 운동 설계.",
    duration: "주 2~4회 / 60분",
    capacity: "1:1 전담",
    color: "from-cyan-500 to-blue-500",
  },
  {
    tag: "기업 복지",
    title: "건강증진 프로그램",
    description: "전 임직원 대상 건강검진 + 맞춤 운동 + 건강 교육 패키지. 복리후생 및 건강증진 활동 지원.",
    duration: "분기/반기 단위",
    capacity: "전 임직원",
    color: "from-violet-500 to-blue-500",
  },
  {
    tag: "신규",
    title: "재활 운동",
    description: "근골격계 질환 예방 및 재활을 위한 전문 프로그램. 물리치료사 협업 기반 운동 처방.",
    duration: "주 2~3회 / 50분",
    capacity: "3~8명",
    color: "from-blue-600 to-cyan-400",
  },
] as const;

function ProgramCard({
  program,
  index,
}: {
  readonly program: (typeof PROGRAMS)[number];
  readonly index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-2xl bg-white overflow-hidden border border-gray-100",
        "hover:shadow-xl transition-all duration-500 group",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className={cn("h-2 bg-gradient-to-r", program.color)} />
      <div className="p-7">
        <span
          className={cn(
            "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-gradient-to-r text-white",
            program.color
          )}
        >
          {program.tag}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">{program.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {program.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {program.capacity}
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
          자세히 보기
        </Button>
      </div>
    </div>
  );
}

export default function Programs2() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="programs" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={cn(
            "text-center max-w-2xl mx-auto mb-16",
            "transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">Programs</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-4">
            기업 맞춤 프로그램
          </h2>
          <p className="text-gray-500 text-lg">
            기업 규모와 목적에 따라 최적화된 프로그램을 선택하세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMS.map((program, i) => (
            <ProgramCard key={program.title} program={program} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
