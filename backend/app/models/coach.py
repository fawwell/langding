"""지도사(Coach) 모델."""

from pydantic import BaseModel, Field


class CoachBase(BaseModel):
    """지도사 공통 필드."""

    name: str = Field(..., min_length=1, max_length=100, description="지도사 이름")
    photo_url: str | None = Field(None, description="프로필 사진 URL")
    specialty: str = Field(..., min_length=1, max_length=200, description="전문 분야")
    bio: str | None = Field(None, max_length=2000, description="자기소개")
    experience_years: int = Field(0, ge=0, description="경력 연수")
    certifications: list[str] = Field(default_factory=list, description="자격증 목록")


class CoachCreate(CoachBase):
    """지도사 생성 요청."""

    pass


class CoachUpdate(BaseModel):
    """지도사 수정 요청 (부분 업데이트)."""

    name: str | None = Field(None, min_length=1, max_length=100)
    photo_url: str | None = None
    specialty: str | None = Field(None, min_length=1, max_length=200)
    bio: str | None = Field(None, max_length=2000)
    experience_years: int | None = Field(None, ge=0)
    certifications: list[str] | None = None


class Coach(CoachBase):
    """지도사 응답 모델 (DB에서 반환)."""

    id: str = Field(..., description="고유 ID")
