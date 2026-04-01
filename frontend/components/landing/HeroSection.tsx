import Button from "@/components/ui/Button";

const STATS = [
  { value: "12년+", label: "B2B 건강관리 노하우" },
  { value: "99%", label: "고객 만족도" },
  { value: "4개", label: "직영 센터" },
  { value: "5,000+", label: "누적 회원" },
] as const;

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
      </div>

      {/* 그리드 패턴 오버레이 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* 뱃지 */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            AI 체형분석 기반 과학적 운동 처방
          </span>

          {/* 메인 타이틀 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            체형분석 데이터로
            <br />
            설계하는{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              맞춤 운동
            </span>
          </h1>

          {/* 부제목 */}
          <p className="max-w-xl text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed">
            12년 B2B 건강관리 노하우와 AI 체형분석 기술을 결합한
            <br className="hidden sm:block" />
            과학적 운동 처방 솔루션을 경험하세요.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 px-8"
            >
              무료 체형분석 신청
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-500 text-slate-200 hover:bg-white/5 hover:border-slate-400"
            >
              프로그램 둘러보기
            </Button>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-20 pt-12 border-t border-white/10">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
