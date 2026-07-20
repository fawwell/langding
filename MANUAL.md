# 📘 FaWW 플랫폼 시스템 연동 & 운영 매뉴얼 (Operation Manual)

본 매뉴얼은 FaWW(파우) 플랫폼의 **Supabase 클라우드 데이터베이스 연동, 로컬 및 배포 환경 설정, 관리자 센터 이용법, 문제 해결(Troubleshooting)** 지침을 다룹니다. 나중에 환경 재설정이나 오류 발생 시 본 문서를 참조하십시오.

---

## 📑 목차
1. [핵심 환경 변수 설정 (Environment Variables)](#1-핵심-환경-변수-설정-environment-variables)
2. [서버 구동 방법 (Run Server)](#2-서버-구동-방법-run-server)
3. [Supabase DB 테이블 스키마 구조](#3-supabase-db-테이블-스키마-구조)
4. [관리자 센터 이용 가이드](#4-관리자-센터-이용-가이드)
5. [자주 발생하는 문제 및 해결 (Troubleshooting)](#5-자주-발생하는-문제-및-해결-troubleshooting)

---

## 1. 🔑 핵심 환경 변수 설정 (Environment Variables)

프로젝트가 데이터베이스(Supabase) 및 API 서버와 정상 통신하려면 다음 환경 변수 파일들이 올바르게 배치되어야 합니다.

### ⓐ 백엔드 환경 변수: `backend/.env`
```env
APP_NAME=SportCoach API
DEBUG=true
CORS_ORIGINS=http://localhost:3000,https://faww.co.kr

# Supabase 클라우드 연결 정보
SUPABASE_URL=https://enteglcxrtbglcnifdeg.supabase.co
SUPABASE_KEY=sb_publishable_7V0NKNdoGsMlwpR7vuM2BQ_yfH9HpLi

# 관리자 인증 시크릿
SECRET_KEY=faww-secret-key-2024
```

### ⓑ 프론트엔드 환경 변수: `frontend/.env.local`
```env
# Supabase 클라이언트 접속 키
NEXT_PUBLIC_SUPABASE_URL=https://enteglcxrtbglcnifdeg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_7V0NKNdoGsMlwpR7vuM2BQ_yfH9HpLi
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_7V0NKNdoGsMlwpR7vuM2BQ_yfH9HpLi

# FastAPI 백엔드 API 주소 (로컬: http://localhost:8000 / 배포: 실제 백엔드 URL)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> ⚠️ **배포 주의사항 (Vercel / Railway)**  
> Vercel이나 Railway 등 클라우드에 배포할 때는 위의 환경 변수값들을 해당 서비스의 **Project Settings -> Environment Variables** 메뉴에 동일하게 등록하셔야 합니다.

---

## 2. 🚀 서버 구동 방법 (Run Server)

### 백엔드 (FastAPI) 구동
```bash
cd backend
# 가상환경 활성화 후 실행
.\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- API 접속 문서(Swagger): `http://localhost:8000/docs`

### 프론트엔드 (Next.js) 구동
```bash
cd frontend
npm run dev
```
- 사용자 메인 웹사이트: `http://localhost:3000`
- 관리자 통합 센터: `http://localhost:3000/admin`

---

## 3. 🗄️ Supabase DB 테이블 스키마 구조

현재 Supabase 클라우드 프로젝트(`enteglcxrtbglcnifdeg.supabase.co`)에 구성된 핵심 테이블 및 역할입니다.

| 테이블명 | 주요 컬럼 | 설명 |
| :--- | :--- | :--- |
| **`media_reports`** | `id`, `title`, `url`, `thumbnail_url`, `content`, `published_at`, `created_at` | 언론 보도 기사 목록 (총 19건) |
| **`client_reviews`** | `id`, `type`, `stars`, `text`, `reviewer`, `created_at` | 고객 만족도 후기 (총 163건, 엑셀 일괄 등록 지원) |
| **`centers`** | `id`, `name`, `tagline`, `philosophy`, `image_url`, `experts`, `map_url`, `address` | 영등포, 여의도, 강남, 서초 지점 정보 |
| **`proposals`** | `id`, `company`, `manager`, `phone`, `email`, `scale`, `inquiry`, `status`, `created_at` | 고객 맞춤 솔루션 문의 접수 내역 |

---

## 4. 🔐 관리자 센터 이용 가이드

- **접속 주소**: `http://localhost:3000/admin`
- **로그인 아이디**: `admin`
- **비밀번호**: `skt010203!` (또는 관리자 패스워드)

### 주요 기능
1. **📰 미디어 보도 관리 (`/admin/media`)**:
   - 기사 링크(URL)를 입력하고 **[기사 정보 자동 불러오기]** 버튼을 누르면 기사 제목, 썸네일, 요약 내용이 자동 추출됩니다.
2. **⭐ 고객 후기 관리 (`/admin/reviews`)**:
   - 개별 후기 수동 입력 및 **[엑셀(.xlsx) 파일 일괄 등록]**을 지원합니다. (성함 마스킹 자동 적용)
3. **🏢 피지컬 센터 관리 (`/admin/centers`)**:
   - 네이버 지도 링크 입력 시 센터명/주소 자동 파싱 및 지점별 대표 원장/전문가 정보 수정 가능.

---

## 5. 🛠️ 자주 발생하는 문제 및 해결 (Troubleshooting)

### Q1. 화면이나 관리자 페이지에서 데이터가 안 보이고 비어있어요!
- **원인**: 백엔드 서버가 꺼져 있거나 환경 변수(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_API_URL`)가 적용되지 않은 경우.
- **해결책**:
  1. `backend` 폴더의 uvicorn 서버가 실행 중인지 확인하십시오.
  2. `frontend/.env.local` 파일이 존재하고 Supabase URL/KEY가 올바른지 체크하십시오.

### Q2. 엑셀 후기 일괄 등록 시 에러가 나요!
- **원인**: 엑셀 파일의 열(Column) 이름이 매핑되지 않거나 후기 내용이 너무 짧은 경우.
- **해결책**:
  - 엑셀 파일의 열 이름에 `'성함'`, `'직장명'`, `'내용'` 키워드가 포함되어 있어야 합니다.
  - 후기 내용(`text`)이 46자 이상인 정성스러운 후기만 선별 등록됩니다.

### Q3. 배포(Vercel) 후 최신 데이터가 반영이 안 돼요!
- **원인**: Next.js의 정적 캐싱(Static Generation Cache) 때문입니다.
- **해결책**:
  - `app/page.tsx` 및 주요 관리자 페이지 상단에 `export const dynamic = 'force-dynamic';` 이 추가되어 있는지 확인하고 Vercel에서 Redeploy 하십시오.
