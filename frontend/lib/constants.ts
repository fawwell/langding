export const B2B_QUESTIONS = [
    "우리 팀원들은 무거운 물건을 나르거나, 똑같은 동작을 계속 반복하는 육체 노동 비중이 높다.",
    "일하다 보면 '어깨 아프다', '허리 아프다', '손목 시큰거린다'고 호소하는 직원들이 꽤 많다.",
    "현장에서 크고 작은 신체 부상이나 안전사고가 일어날 위험이 있어서 늘 조심해야 하는 환경이다.",
    "우리 직원들은 하루 일과의 80% 이상을 모니터 앞 의자에 꼼짝 않고 앉아서 보낸다.",
    "사무실을 둘러보면 거북목이나 라운드숄더처럼 자세가 구부정한 직원들이 흔하게 보인다.",
    "일하다가 중간에 자리에서 일어나 가볍게 스트레칭을 하거나 몸을 풀 만한 분위기나 여유가 부족하다.",
    "최근 부서 분위기가 전체적으로 좀 가라앉아 있고, 다들 피곤하고 지쳐 보일 때가 많다.",
    "업무 스트레스나 감정 노동, 혹은 교대 근무 때문에 번아웃을 호소하는 직원들이 종종 있다.",
    "다 같이 모여서 머리를 식히고, 몸을 움직이면서 스트레스도 풀고 팀워크를 다질 수 있는 활동이 절실하다.",
    "조직 내 중장년층 비율이 높거나, 건강검진에서 혈압·혈당 수치가 높게 나오는 직원들이 꽤 있다.",
    "부서 회식이 잦거나, 야근하며 야식을 자주 먹는 등 직원들의 평소 식습관이나 음주 패턴이 불규칙하다.",
    "최근 들어 유독 뱃살(복부 비만)이 나오거나 체력이 급격히 떨어져서 힘들어하는 직원들이 눈에 띈다."
];

export const B2C_QUESTIONS = [
    "몸 어딘가가 뻐근하고 아프면, 신경이 쓰여서 하던 일에 집중하기가 힘들다.",
    "평소와 다르게 몸이 불편한 느낌이 들면, 원인을 찾거나 신경 쓰느라 다른 일을 제때 못 한 적이 있다.",
    "내 몸의 아픈 곳이 갑자기 더 안 좋아질까 봐 자주 불안하거나 걱정된다.",
    "하루를 돌아보면, 잠자는 시간 외에는 대부분 의자에 앉아 있거나 누워서 보낸다.",
    "최근 일주일 동안 땀이 날 정도의 운동이나 근력 운동을 한 날이 하루 이하(0~1일)다.",
    "평소에 목이나 어깨, 허리가 자주 뻣뻣하게 굳는 느낌이 들고, 자세가 구부정해진다.",
    "유튜브 쇼츠, 인스타그램 릴스 같은 짧은 영상을 한 번 보면 시간 가는 줄 모르고 계속 보게 된다.",
    "예전보다 일상이나 업무에서 재미를 느끼기 어렵고, 자주 피곤하거나 만사가 귀찮아진다.",
    "스트레스를 받거나 헛헛할 때, 무심코 스마트폰을 들여다보거나 맵고 짠 음식, 단것(야식)을 찾게 된다.",
    "나 혹은 직계 가족 중에 혈압이나 혈당이 높거나, 심혈관 질환을 겪은 분이 있다.",
    "현재 담배를 피우고 있거나, 일주일에 2~3회 이상 술자리를 갖는 편이다.",
    "20대 시절과 비교했을 때 체중이 10kg 이상 늘었거나, 최근 뱃살(복부 비만)이 부쩍 고민이다."
];

export const DEFAULT_CENTERS = [
    { 
        id: 'center-ydp', name: '피지컬케어 영등포 센터', tagline: '영등포 정밀 체형분석 센터', philosophy: '최첨단 장비를 활용한 정밀 분석', image_url: '', experts: ['전문의 A', '전문가 B'], map_url: '', reserve_url: '', address: '서울특별시 영등포구 도신로 232',
        stats: { visits: '3,284', scans: '1,492', satisfaction: '94.2%' },
        equipments: ['3D AI Body Scanner', 'Infrared Thermography', 'EMS Physical Care System']
    },
    { 
        id: 'center-yyd', name: '피지컬케어 여의도 센터', tagline: '여의도 오피스 케어 지점', philosophy: '직장인 맞춤형 솔루션', image_url: '', experts: ['전문가 C'], map_url: '', reserve_url: '', address: '서울특별시 영등포구 국제금융로 10',
        stats: { visits: '2,150', scans: '842', satisfaction: '92.8%' },
        equipments: ['AI Mobility Analysis', 'Posture Correction Bed', 'Stress Relief Therapy']
    },
    { 
        id: 'center-gn', name: '피지컬케어 강남 센터', tagline: '강남 프리미엄 프라이빗 센터', philosophy: '1:1 VIP 케어', image_url: '', experts: ['전문의 D', '전문가 E'], map_url: '', reserve_url: '', address: '서울특별시 강남구 강남대로 364',
        stats: { visits: '4,582', scans: '2,104', satisfaction: '96.5%' },
        equipments: ['Premium 3D Scan V2', 'Private Care Suite', 'Neuro-Muscular Reactivator']
    },
    { 
        id: 'center-sc', name: '피지컬케어 서초 센터', tagline: '서초 전문 스포츠 재활 센터', philosophy: '스포츠 과학 기반 케어', image_url: '', experts: ['전문가 F', '전문가 G'], map_url: '', reserve_url: '', address: '서울특별시 서초구 서초대로 314',
        stats: { visits: '1,850', scans: '642', satisfaction: '91.5%' },
        equipments: ['Isokinetic dynamometer', 'Cryotherapy', 'High-speed Camera Analysis']
    }
];
