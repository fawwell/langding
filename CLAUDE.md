# SportCoach - CLAUDE.md

> 이 파일은 프로젝트의 지식 베이스입니다.
> Claude가 실수할 때마다 여기에 추가하세요!

---

## 🎯 프로젝트 개요

**스포츠 관리 및 지도사 플랫폼** — 랜딩페이지 및 웹사이트

스포츠 지도사를 위한 관리 도구와 소개 웹사이트. 지도사 프로필, 수강생 관리, 스케줄링, 랜딩페이지 등을 포함.

**기술 스택:**
- Backend: FastAPI + Python 3.11
- Frontend: Next.js 14 + TypeScript
- Database: Supabase (PostgreSQL)
- AI: Claude API (Anthropic)
- Styling: Tailwind CSS
- Deployment: Vercel (Frontend) + Railway/Fly.io (Backend)

---

## 📁 프로젝트 구조

```
sportcoach/
├── backend/                # FastAPI 서버
│   ├── app/
│   │   ├── api/v1/         # API 엔드포인트
│   │   │   ├── coaches.py  # 지도사 관련 API
│   │   │   ├── students.py # 수강생 관련 API
│   │   │   ├── schedule.py # 스케줄 관련 API
│   │   │   └── auth.py     # 인증 API
│   │   ├── services/       # 비즈니스 로직
│   │   ├── models/         # DB 모델
│   │   └── core/           # 설정, 의존성
│   ├── tests/              # 테스트
│   └── requirements.txt
├── frontend/               # Next.js 앱
│   ├── app/                # App Router
│   │   ├── (landing)/      # 랜딩페이지 (공개)
│   │   ├── (dashboard)/    # 대시보드 (로그인 필요)
│   │   └── api/            # API Routes
│   ├── components/         # React 컴포넌트
│   │   ├── landing/        # 랜딩페이지 컴포넌트
│   │   ├── dashboard/      # 대시보드 컴포넌트
│   │   └── ui/             # 공통 UI 컴포넌트
│   └── lib/                # 유틸리티
├── .claude/                # Claude Code 설정
└── CLAUDE.md               # 이 파일
```

---

## 🤖 Agents (서브에이전트)

| Agent | 용도 |
|-------|------|
| `planner` | 복잡한 작업 계획 수립 |
| `architect` | 시스템 설계 및 구조 결정 |
| `reviewer` | 코드 리뷰 |
| `code-simplifier` | 코드 정리/단순화 |
| `tdd-guide` | 테스트 작성 가이드 |
| `security-reviewer` | 보안 취약점 점검 |

---

## 📜 Rules (핵심 규칙)

| Rule | 핵심 |
|------|------|
| `golden-principles` | HARD-GATE, 증거 기반 등 |
| `security` | 보안 체크리스트 |
| `git-workflow-v2` | 커밋/PR 워크플로우 |
| `testing` | TDD, 커버리지 80%+ |
| `coding-style` | 코드 스타일 가이드 |

### Golden Principles 핵심
- **HARD-GATE**: 3파일 이상 변경 → `/plan` 필수
- **증거 기반**: 테스트 결과 직접 보여줘야 완료
- **TDD**: RED → GREEN → IMPROVE
- **Surgical Changes**: 요청한 것만 변경. 관련 없는 리팩토링 금지

---

## 🔄 워크플로우

```
1. /plan 으로 시작 (계획 수립)
2. 계획 충분히 다듬기
3. /tdd 로 테스트 먼저 작성
4. 구현 완료
5. /code-review (코드 리뷰)
6. /handoff-verify (검증)
7. /commit-push-pr (PR 생성)
```

---

## 🏗️ 주요 기능

### 랜딩페이지 (공개)
- [ ] 히어로 섹션 (서비스 소개)
- [ ] 지도사 소개 섹션
- [ ] 프로그램/커리큘럼 소개
- [ ] 수강 후기/리뷰
- [ ] 문의하기 (Contact Form)
- [ ] 반응형 디자인 (모바일 최적화)

### 대시보드 (로그인 필요)
- [ ] 지도사 프로필 관리
- [ ] 수강생 관리 (등록/수정/삭제)
- [ ] 스케줄 관리 (캘린더)
- [ ] 출석 체크
- [ ] 수업 기록/노트

### 인증
- [ ] Supabase Auth (소셜 로그인)
- [ ] 역할 기반 접근 제어 (지도사/관리자)

---

## ⚠️ 주의사항 & 실수 기록

### 환경
- WSL2 Ubuntu 환경 (Windows 11)
- Node.js v24, Python 3.11
- Supabase 프로젝트 연동 필요

### 코딩 규칙
- 한국어 주석 OK, 변수명은 영어
- API 응답은 항상 일관된 포맷 사용
- 환경변수는 `.env.local`에 (절대 커밋 금지)
- Tailwind CSS 클래스 사용, 인라인 스타일 금지

### 실수 기록 (여기에 추가!)
<!-- Claude가 실수할 때마다 아래에 추가 -->

---

## 🔗 참고 링크

- [Next.js 14 Docs](https://nextjs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Claude Forge](https://github.com/sangrokjung/claude-forge)
