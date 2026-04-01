import Button from "@/components/ui/Button";

interface Program {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly duration: string;
  readonly schedule: string;
  readonly features: readonly string[];
  readonly badge: string;
  readonly iconPath: string;
}

const PROGRAMS: readonly Program[] = [
  {
    id: "program-1",
    title: "스포츠지도사 2급",
    subtitle: "국가자격 취득 과정",
    description:
      "생활스포츠지도사 2급 실기·구술 시험 대비 과정. 현직 심사위원 출신 강사진의 체계적인 커리큘럼.",
    duration: "8주 과정",
    schedule: "주 2회 (화·목)",
    features: [
      "실기 시험 완벽 대비",
      "구술 시험 모의고사 3회",
      "소규모 정원 (12명 이내)",
      "합격 시까지 재수강 무료",
    ],
    badge: "합격률 94%",
    iconPath:
      "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  },
  {
    id: "program-2",
    title: "PTS 실무 과정",
    subtitle: "퍼스널 트레이닝 전문가",
    description:
      "현장 중심의 퍼스널 트레이닝 실무 과정. 체형분석, 운동 처방, 고객 관리까지 트레이너 실무 전반을 학습.",
    duration: "12주 과정",
    schedule: "주 3회 (월·수·금)",
    features: [
      "AI 체형분석 시스템 실습",
      "실제 회원 대상 실습",
      "취업 연계 (직영 센터 우선 채용)",
      "수료 후 6개월 멘토링",
    ],
    badge: "취업연계",
    iconPath:
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    id: "program-3",
    title: "체형분석 전문가",
    subtitle: "AI 기반 분석 자격",
    description:
      "AI 체형분석 시스템을 활용한 자세 평가 및 운동 처방 전문가 과정. 데이터 기반 트레이닝 설계 역량 강화.",
    duration: "6주 과정",
    schedule: "주 2회 (토·일)",
    features: [
      "AI 분석 장비 운용 실습",
      "케이스 스터디 10건+",
      "자격증 발급 (민간자격)",
      "분석 리포트 작성법",
    ],
    badge: "NEW",
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
];

function ProgramCard({ program }: { readonly program: Program }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col">
      {/* 상단 */}
      <div className="p-6 sm:p-8 flex-grow">
        <div className="flex items-start justify-between mb-4">
          {/* 아이콘 */}
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d={program.iconPath}
              />
            </svg>
          </div>
          {/* 뱃지 */}
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {program.badge}
          </span>
        </div>

        <p className="text-sm text-blue-600 font-semibold mb-1">
          {program.subtitle}
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          {program.title}
        </h3>

        {/* 기간/일정 */}
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-sm text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {program.duration}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {program.schedule}
          </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {program.description}
        </p>

        {/* 특징 */}
        <ul className="space-y-2.5">
          {program.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
              <svg
                className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* 하단 CTA */}
      <div className="px-6 sm:px-8 pb-6 sm:pb-8">
        <Button variant="primary" size="md" className="w-full">
          수강 신청하기
        </Button>
      </div>
    </article>
  );
}

export default function ProgramsSection() {
  return (
    <section id="education" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Education
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            전문 교육 과정
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            국가자격 취득부터 실무 역량 강화까지.
            <br className="hidden sm:block" />
            현장 경험 풍부한 강사진의 체계적인 교육 프로그램.
          </p>
        </div>

        {/* 프로그램 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
