import Button from "@/components/ui/Button";

const EAP_FEATURES = [
  {
    title: "체형분석 건강검진",
    description: "AI 기반 체형분석으로 임직원의 근골격계 건강 상태를 정밀 진단",
    iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    title: "맞춤 운동 프로그램",
    description: "분석 결과 기반 개인별 운동 처방 및 그룹 프로그램 설계",
    iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    title: "출장 운동 서비스",
    description: "사내 피트니스 공간 또는 회의실에서 진행하는 찾아가는 운동 서비스",
    iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "건강 리포트",
    description: "기업 단위 건강 통계 분석 및 분기별 개선 현황 리포트 제공",
    iconPath: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
] as const;

const EAP_STATS = [
  { value: "120+", label: "파트너 기업" },
  { value: "99%", label: "재계약률" },
  { value: "35%", label: "근골격계 통증 감소" },
] as const;

export default function EAPSection() {
  return (
    <section id="eap" className="py-20 sm:py-28 bg-gradient-to-b from-slate-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 좌측 텍스트 */}
          <div>
            <span className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">
              Corporate Wellness (EAP)
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
              기업 맞춤
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                임직원 건강관리
              </span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              12년간 축적된 B2B 건강관리 노하우로 임직원의 체형 관리와
              근골격계 건강을 케어합니다. 기업 규모와 니즈에 맞는
              커스텀 프로그램을 설계해 드립니다.
            </p>

            {/* 통계 */}
            <div className="flex gap-8 mb-10">
              {EAP_STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25"
            >
              기업 상담 신청
            </Button>
          </div>

          {/* 우측 피처 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {EAP_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={feature.iconPath}
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
