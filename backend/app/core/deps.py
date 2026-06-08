"""의존성 주입 (Dependency Injection)."""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase_wrapper import create_client, Client

from app.core.config import Settings, settings

security = HTTPBearer()

def get_settings() -> Settings:
    """설정 객체를 반환하는 의존성."""
    return settings


def get_supabase_client() -> Client:
    """Supabase 클라이언트를 반환합니다."""
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


def verify_admin_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """헤더의 Bearer 토큰을 검증합니다."""
    token = credentials.credentials
    expected_token = "faww-admin-secure-token-2024"
    if token != expected_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="유효하지 않은 관리자 토큰입니다."
        )
    return token
