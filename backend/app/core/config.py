"""애플리케이션 설정 (환경변수 기반)."""

from pydantic_settings import BaseSettings, SettingsConfigDict


import os

class Settings(BaseSettings):
    """환경변수에서 로드하는 앱 설정."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )

    # 앱 기본 설정
    APP_NAME: str = os.getenv("APP_NAME", "SportCoach API")
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

    # CORS 허용 오리진 (쉼표 구분)
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:3000")

    # Supabase 연결
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")

    # 보안
    SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me-in-production")

    @property
    def cors_origins_list(self) -> list[str]:
        """CORS 오리진 문자열을 리스트로 변환."""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]


# 싱글턴 설정 인스턴스
settings = Settings()
