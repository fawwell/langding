interface Center {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly phone: string;
  readonly hours: string;
  readonly description: string;
  readonly tags: readonly string[];
}

const CENTERS: readonly Center[] = [
  {
    id: "center-1",
    name: "영등포 본점",
    address: "서울시 영등포구 당산로 171, 3층",
    phone: "02-2678-1234",
    hours: "월~금 06:00~22:00 / 토 08:00~18:00",
    description:
      "플래그십 센터로 최신 체형분석 장비와 넓은 운동 공간을 갖추고 있습니다. 전문 트레이너 8명 상주.",
    tags: ["본점", "AI 체형분석", "그룹 클래스"],
  },
  {
    id: "center-2",
    name: "강남점",
    address: "서울시 강남구 테헤란로 152, B1층",
    phone: "02-555-5678",
    hours: "월~금 07:00~23:00 / 토·일 09:00~18:00",
    description:
      "강남 중심부에 위치한 프리미엄 센터. 1:1 전용 개인 트레이닝룸과 필라테스 스튜디오 완비.",
    tags: ["프리미엄", "1:1 트레이닝", "필라테스"],
  },
  {
    id: "center-3",
    name: "동탄점",
    address: "경기도 화성시 동탄반석로 166, 2층",
    phone: "031-613-9012",
    hours: "월~금 06:00~22:00 / 토 08:00~17:00",
    description:
      "동탄 신도시의 가족 친화형 센터. 키즈 운동 프로그램과 산전산후 케어 전문.",
    tags: ["가족 친화", "키즈 프로그램", "재활"],
  },
  {
    id: "center-4",
    name: "여의도점",
    address: "서울시 영등포구 여의대로 108, 5층",
    phone: "02-784-3456",
    hours: "월~금 06:30~22:00 / 토 08:00~17:00",
    description:
      "직장인 특화 센터. 점심시간 속성 프로그램, 기업 EAP 연계 서비스 제공.",
    tags: ["직장인 특화", "EAP 연계", "속성 클래스"],
  },
];

function CenterCard({ center }: { readonly center: Center }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 group">
      {/* 이미지 placeholder */}
      <div className="aspect-[16/10] bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{center.name}</h3>
        </div>
        {/* 지도 아이콘 */}
        <svg
          className="w-12 h-12 text-slate-300 group-hover:text-blue-300 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>

      <div className="p-6">
        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {center.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 설명 */}
        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          {center.description}
        </p>

        {/* 정보 */}
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <svg
              className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-slate-600">{center.address}</span>
          </div>

          <div className="flex items-start gap-3">
            <svg
              className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-slate-600">{center.hours}</span>
          </div>

          <div className="flex items-start gap-3">
            <svg
              className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a
              href={`tel:${center.phone}`}
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              {center.phone}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CenterSection() {
  return (
    <section id="center" className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Our Centers
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            피지컬케어 직영 센터
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            체형분석 데이터 기반의 기능성 운동 전문 센터.
            <br className="hidden sm:block" />
            가까운 센터에서 1:1 맞춤 관리를 받으세요.
          </p>
        </div>

        {/* 센터 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CENTERS.map((center) => (
            <CenterCard key={center.id} center={center} />
          ))}
        </div>
      </div>
    </section>
  );
}
