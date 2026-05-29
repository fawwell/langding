"""의존성 주입 (Dependency Injection)."""

from supabase import create_client, Client

from app.core.config import Settings, settings


def get_settings() -> Settings:
    """설정 객체를 반환하는 의존성."""
    return settings


def get_supabase_client() -> Client:
    """Supabase 클라이언트를 반환합니다."""
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
