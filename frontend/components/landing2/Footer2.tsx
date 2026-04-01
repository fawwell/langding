const FOOTER_LINKS = [
  {
    title: "서비스",
    links: [
      { label: "AI 체형분석", href: "#services" },
      { label: "맞춤 운동 프로그램", href: "#programs" },
      { label: "출장 건강관리", href: "#services" },
      { label: "데이터 리포트", href: "#results" },
    ],
  },
  {
    title: "프로그램",
    links: [
      { label: "1:1 근골격계 케어", href: "#programs" },
      { label: "단체 스트레칭", href: "#programs" },
      { label: "체력증진 프로그램", href: "#programs" },
      { label: "산재복귀 재활", href: "#programs" },
    ],
  },
  {
    title: "고객지원",
    links: [
      { label: "무료 상담 신청", href: "#contact" },
      { label: "자주 묻는 질문", href: "#faq" },
      { label: "이용약관", href: "#" },
      { label: "개인정보처리방침", href: "#" },
    ],
  },
];

export default function Footer2() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">SC</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                SportCoach
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              체형분석 데이터와 과학적 운동 처방을 결합한 기업 건강관리 솔루션.
              12년의 B2B 노하우로 임직원 건강을 책임집니다.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                02-2678-1234
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@sportcoach.kr
              </span>
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="text-white font-semibold text-sm mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>&copy; 2026 SportCoach. All rights reserved.</p>
            <p>
              주식회사 스포츠코치 | 대표: 홍길동 | 사업자등록번호: 000-00-00000
              <span className="hidden sm:inline"> | </span>
              <br className="sm:hidden" />
              서울시 영등포구 당산로 171, 3층
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
