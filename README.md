# SportCoach

스포츠 관리 및 지도사 플랫폼 - 랜딩페이지 및 웹사이트

## 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS |
| Backend | FastAPI + Python 3.11 |
| Database | Supabase (PostgreSQL) |
| AI | Claude API (Anthropic) |
| Deploy | Vercel (Frontend) + Railway/Fly.io (Backend) |

## 프로젝트 구조

```
sportcoach/
├── frontend/          # Next.js 14 App Router
│   ├── app/
│   │   ├── (landing)/ # 랜딩페이지 (공개)
│   │   └── (dashboard)/ # 대시보드 (로그인 필요)
│   ├── components/
│   │   ├── landing/   # 랜딩페이지 컴포넌트
│   │   ├── dashboard/ # 대시보드 컴포넌트
│   │   └── ui/        # 공통 UI 컴포넌트
│   └── lib/           # 유틸리티
├── backend/           # FastAPI 서버
│   ├── app/
│   │   ├── api/v1/    # API 엔드포인트
│   │   ├── services/  # 비즈니스 로직
│   │   ├── models/    # Pydantic 모델
│   │   └── core/      # 설정, 의존성
│   └── tests/
└── CLAUDE.md
```

## 시작하기

### Frontend

```bash
cd frontend
npm install
npm run dev
# http://localhost:3000
```

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# http://localhost:8000
```

## 주요 기능

- **랜딩페이지**: 서비스 소개, 지도사 프로필, 프로그램, 후기, 문의
- **대시보드**: 수강생 관리, 스케줄링, 출석, 수업 노트
- **인증**: Supabase Auth 기반 소셜 로그인
- **API**: RESTful API (FastAPI)

## 환경변수

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (`backend/.env`)
```
APP_NAME=SportCoach
DEBUG=true
CORS_ORIGINS=http://localhost:3000
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
SECRET_KEY=your-secret-key
```
