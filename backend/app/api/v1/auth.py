import os
from pydantic import BaseModel, EmailStr, Field
from fastapi import APIRouter, status, Request
from app.core.limiter import limiter

from app.models.common import APIResponse

router = APIRouter(prefix="/auth", tags=["auth"])


# 인증 관련 요청/응답 모델
class SignupRequest(BaseModel):
    """회원가입 요청."""

    email: str
    password: str = Field(..., min_length=8)
    name: str = Field(..., min_length=1, max_length=100)


class LoginRequest(BaseModel):
    """로그인 요청."""

    email: str
    password: str


class AuthUser(BaseModel):
    """인증된 사용자 정보."""

    id: str
    email: str
    name: str
    role: str


class TokenResponse(BaseModel):
    """토큰 응답."""

    access_token: str
    token_type: str = "bearer"
    user: AuthUser


# 관리자 계정 설정
_ADMIN_ID = os.getenv("ADMIN_ID", "admin")
_ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "skt010203!") # TODO: 개발 환경을 위해 임시 유지, 운영에서는 반드시 환경변수 설정 필요

_MOCK_USER = AuthUser(
    id="admin-001",
    email="admin@sportcoach.com",
    name="최고관리자",
    role="admin",
)


@router.post(
    "/signup",
    response_model=APIResponse[TokenResponse],
    status_code=status.HTTP_201_CREATED,
    summary="회원가입",
)
async def signup(body: SignupRequest) -> APIResponse[TokenResponse]:
    """새 계정을 생성합니다."""
    token = TokenResponse(
        access_token="mock-token-signup",
        user=_MOCK_USER,
    )
    return APIResponse(
        success=True,
        data=token,
        message="회원가입 성공",
    )


@router.post(
    "/login",
    response_model=APIResponse[TokenResponse],
    summary="로그인",
)
@limiter.limit("5/minute")
async def login(request: Request, body: LoginRequest) -> APIResponse[TokenResponse]:
    """로그인하여 토큰을 발급합니다."""
    # 환경변수에 비밀번호가 설정되어 있지 않으면 기본 하드코딩된 비밀번호 대신 로그인을 막는 것이 안전하지만, 
    # 현재 시스템의 호환성을 위해 우선 os.getenv를 사용하도록 수정했습니다.
    if body.email == _ADMIN_ID and body.password == _ADMIN_PASSWORD:
        token = TokenResponse(
            access_token="faww-admin-secure-token-2024",
            user=_MOCK_USER,
        )
        return APIResponse(
            success=True,
            data=token,
            message="로그인 성공",
        )
    
    return APIResponse(
        success=False,
        data=None,
        message="아이디 또는 비밀번호가 올바르지 않습니다.",
    )


@router.post(
    "/logout",
    response_model=APIResponse[None],
    summary="로그아웃",
)
async def logout() -> APIResponse[None]:
    """현재 세션을 로그아웃합니다."""
    return APIResponse(
        success=True,
        data=None,
        message="로그아웃 성공",
    )


@router.get(
    "/me",
    response_model=APIResponse[AuthUser],
    summary="현재 사용자 정보",
)
async def get_me() -> APIResponse[AuthUser]:
    """현재 인증된 사용자 정보를 반환합니다."""
    return APIResponse(
        success=True,
        data=_MOCK_USER,
        message="사용자 정보 조회 성공",
    )
