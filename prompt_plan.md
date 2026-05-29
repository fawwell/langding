# SportCoach - 구현 계획

## Phase 1: 프로젝트 셋업
- [ ] Next.js 14 프로젝트 초기화 (App Router, TypeScript, Tailwind CSS)
- [ ] FastAPI 프로젝트 초기화 (Python 3.11, 가상환경)
- [ ] Supabase 프로젝트 연동 및 환경변수 설정
- [ ] ESLint, Prettier 설정
- [ ] 디렉토리 구조 생성

## Phase 2: 랜딩페이지 (Frontend)
- [ ] 공통 레이아웃 (Header, Footer)
- [ ] Hero 섹션 컴포넌트
- [ ] About 서비스 소개 섹션
- [ ] Coaches 지도사 소개 섹션
- [ ] Programs 프로그램 목록 섹션
- [ ] Testimonials 수강 후기 섹션
- [ ] Contact Form 섹션 (폼 유효성 검사 포함)
- [ ] 반응형 디자인 적용
- [ ] SEO 메타태그 설정

## Phase 3: 백엔드 API 기초
- [ ] FastAPI 프로젝트 구조 설정 (라우터, 서비스, 모델)
- [ ] Supabase 클라이언트 연동
- [ ] DB 스키마 설계 및 마이그레이션
- [ ] Contact Form API 엔드포인트
- [ ] CORS 설정

## Phase 4: 인증 시스템
- [ ] Supabase Auth 설정
- [ ] 로그인/회원가입 페이지
- [ ] 소셜 로그인 (Google, Kakao)
- [ ] 미들웨어: 인증 체크
- [ ] 역할 기반 접근 제어

## Phase 5: 대시보드
- [ ] 대시보드 레이아웃 (사이드바, 헤더)
- [ ] 지도사 프로필 관리 페이지
- [ ] 수강생 관리 CRUD
- [ ] 스케줄/캘린더 관리
- [ ] 출석 체크 기능
- [ ] 수업 노트 기능

## Phase 6: 배포
- [ ] Vercel 배포 (Frontend)
- [ ] Railway/Fly.io 배포 (Backend)
- [ ] 도메인 설정
- [ ] CI/CD 파이프라인

## 의존성
- Phase 2는 Phase 1 완료 후 진행
- Phase 3는 Phase 1 완료 후 진행 (Phase 2와 병렬 가능)
- Phase 4는 Phase 3 완료 후 진행
- Phase 5는 Phase 4 완료 후 진행
- Phase 6는 Phase 2~5 완료 후 진행
