-- 1. 피지컬케어 지점(Centers) 테이블 생성
CREATE TABLE IF NOT EXISTS centers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT DEFAULT '',
    philosophy TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    experts TEXT[] DEFAULT '{}',
    map_url TEXT DEFAULT '',
    reserve_url TEXT DEFAULT '',
    address TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 초기 시드 데이터 삽입
INSERT INTO centers (id, name, tagline, philosophy, image_url, experts, address)
VALUES 
('center-ydp', '피지컬케어 영등포 센터', '영등포 정밀 체형분석 센터', '최첨단 장비를 활용한 정밀 분석', '/images/physical-care/001.jpg', ARRAY['김은주 원장', '박서준 수석 코치'], '서울특별시 영등포구 도신로 232'),
('center-yyd', '피지컬케어 여의도 센터', '여의도 오피스 케어 지점', '직장인 맞춤형 솔루션', '', ARRAY['이민우 체형교정 전문가', '최윤아 책임 테라피스트'], '서울특별시 영등포구 국제금융로 10'),
('center-gn', '피지컬케어 강남 센터', '강남 프리미엄 프라이빗 센터', '1:1 VIP 케어', '', ARRAY['정재희 재활의학 전문의', '한지환 시니어 코치'], '서울특별시 강남구 강남대로 364'),
('center-sc', '피지컬케어 서초 센터', '서초 전문 스포츠 재활 센터', '스포츠 과학 기반 케어', '', ARRAY['송민혁 스포츠 사이언스 석사', '백지원 메디컬 트레이너'], '서울특별시 서초구 서초대로 314')
ON CONFLICT (id) DO NOTHING;

-- 2. 고객 만족도 후기(Client Reviews) 테이블 생성
CREATE TABLE IF NOT EXISTS client_reviews (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL DEFAULT 'b2b',
    stars TEXT NOT NULL DEFAULT '★★★★★',
    text TEXT NOT NULL,
    reviewer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 초기 후기 데이터 삽입
INSERT INTO client_reviews (type, stars, text, reviewer)
VALUES
('b2b', '★★★★★', '"수업 끝나고 사무실로 복귀할 때 벌써 변화를 체감합니다. 발바닥, 종아리, 허벅지 움직임부터가 다르네요. 최고입니다!"', 'S사 운영팀'),
('b2b', '★★★★★', '"늘어나는 산재 발생이 큰 고민이었는데 업무 시작 전 사고를 예방하는 프로그램을 진행하면서 눈에 띄게 줄었어요."', 'H사 안전환경팀'),
('school', '★★★★☆', '"모든 학생이 형평성 있게 검진을 이용할 수 있다는 점이 좋았어요. 체계적인 데이터 리포트 덕분에 학부모님들 만족도도 높습니다."', 'OO고등학교 보건교사')
ON CONFLICT DO NOTHING;

-- 3. 미디어 보도 자료(Media Reports) 테이블 생성
CREATE TABLE IF NOT EXISTS media_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    url TEXT DEFAULT '',
    thumbnail_url TEXT DEFAULT '',
    content TEXT DEFAULT '',
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 도입 제안 및 제휴 문의(Proposals) 테이블 생성
CREATE TABLE IF NOT EXISTS proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    manager TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    scale TEXT DEFAULT '',
    inquiry TEXT DEFAULT '',
    title TEXT DEFAULT '',
    modules TEXT[] DEFAULT '{}',
    parts JSONB DEFAULT '{}',
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 지도사(Coaches) 테이블 생성
CREATE TABLE IF NOT EXISTS coaches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    photo TEXT DEFAULT '',
    specialty TEXT DEFAULT '',
    bio TEXT DEFAULT '',
    experience_years INTEGER DEFAULT 0,
    certifications TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 수강생(Students) 테이블 생성
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT DEFAULT '',
    email TEXT DEFAULT '',
    birth_date DATE,
    coach_id UUID REFERENCES coaches(id) ON DELETE SET NULL,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'active'
);

-- 7. 스케줄(Schedules) 테이블 생성
CREATE TABLE IF NOT EXISTS schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    coach_id UUID REFERENCES coaches(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    recurring BOOLEAN DEFAULT FALSE,
    location TEXT DEFAULT ''
);

-- 8. 출석체크(Attendances) 테이블 생성
CREATE TABLE IF NOT EXISTS attendances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'present',
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. 수업 노트(Class Notes) 테이블 생성
CREATE TABLE IF NOT EXISTS class_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE,
    coach_id UUID REFERENCES coaches(id) ON DELETE CASCADE,
    content TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
