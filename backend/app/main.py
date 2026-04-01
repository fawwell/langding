"""SportCoach API 메인 애플리케이션."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import router as v1_router
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    description="스포츠 지도사 관리 플랫폼 API",
    debug=settings.DEBUG,
)

# CORS 미들웨어
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# v1 라우터 등록
app.include_router(v1_router, prefix="/api/v1")


@app.get("/", tags=["root"])
async def root() -> dict:
    """API 기본 정보를 반환합니다."""
    return {
        "name": settings.APP_NAME,
        "version": "0.1.0",
        "docs": "/docs",
    }


@app.get("/health", tags=["health"])
async def health_check() -> dict:
    """헬스체크 엔드포인트."""
    return {"status": "healthy"}
