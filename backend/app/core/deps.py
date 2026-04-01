"""의존성 주입 (Dependency Injection)."""

from app.core.config import Settings, settings


def get_settings() -> Settings:
    """설정 객체를 반환하는 의존성."""
    return settings
