# SportCoach - 기능 명세

## Feature 1: 랜딩페이지

### 요구사항
1. 히어로 섹션: 서비스 핵심 가치 전달 (CTA 버튼 포함)
2. 지도사 소개 섹션: 지도사 프로필 카드 (사진, 이름, 전문 분야, 경력)
3. 프로그램 소개: 제공하는 프로그램/커리큘럼 목록
4. 수강 후기: 수강생 리뷰 캐러셀
5. 문의하기: Contact Form (이름, 이메일, 메시지)
6. 반응형 디자인: 모바일/태블릿/데스크톱 대응
7. SEO 최적화: 메타태그, OG 이미지, 구조화된 데이터

### 페이지 구조
```
[Header - 네비게이션]
[Hero - 메인 비주얼 + CTA]
[About - 서비스 소개]
[Coaches - 지도사 프로필]
[Programs - 프로그램 목록]
[Testimonials - 수강 후기]
[Contact - 문의 폼]
[Footer - 연락처, 소셜 링크]
```

### 데이터 모델
- Coach: { id, name, photo, specialty, bio, experience_years, certifications }
- Program: { id, name, description, duration, level, coach_id }
- Testimonial: { id, student_name, content, rating, created_at }
- ContactInquiry: { id, name, email, message, created_at, status }

---

## Feature 2: 인증 시스템

### 요구사항
1. Supabase Auth 기반 로그인/회원가입
2. 소셜 로그인 (Google, Kakao)
3. 역할 기반 접근 제어 (coach, admin)
4. 세션 관리 및 자동 갱신

### API 명세
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자 정보

---

## Feature 3: 지도사 대시보드

### 요구사항
1. 프로필 관리: 지도사 정보 CRUD
2. 수강생 관리: 수강생 등록/수정/삭제, 목록 조회
3. 스케줄 관리: 캘린더 기반 수업 일정 관리
4. 출석 체크: 수업별 출석 기록
5. 수업 노트: 수업 기록 및 메모

### API 명세
- `GET /api/v1/coaches/:id` - 지도사 프로필 조회
- `PUT /api/v1/coaches/:id` - 지도사 프로필 수정
- `GET /api/v1/students` - 수강생 목록
- `POST /api/v1/students` - 수강생 등록
- `PUT /api/v1/students/:id` - 수강생 수정
- `DELETE /api/v1/students/:id` - 수강생 삭제
- `GET /api/v1/schedule` - 스케줄 조회
- `POST /api/v1/schedule` - 스케줄 생성
- `POST /api/v1/attendance` - 출석 기록

### 데이터 모델
- Student: { id, name, phone, email, birth_date, coach_id, enrolled_at, status }
- Schedule: { id, coach_id, title, start_time, end_time, recurring, location }
- Attendance: { id, schedule_id, student_id, status, checked_at }
- ClassNote: { id, schedule_id, coach_id, content, created_at }
