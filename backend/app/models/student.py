"""수강생(Student) 모델."""

from datetime import date, datetime

from pydantic import BaseModel, EmailStr, Field


class StudentBase(BaseModel):
    """수강생 공통 필드."""

    name: str = Field(..., min_length=1, max_length=100, description="수강생 이름")
    phone: str | None = Field(None, max_length=20, description="전화번호")
    email: EmailStr | None = Field(None, description="이메일")
    birth_date: date | None = Field(None, description="생년월일")
    coach_id: str = Field(..., description="담당 지도사 ID")
    status: str = Field("active", description="상태 (active, inactive, paused)")


class StudentCreate(StudentBase):
    """수강생 등록 요청."""

    pass


class StudentUpdate(BaseModel):
    """수강생 수정 요청 (부분 업데이트)."""

    name: str | None = Field(None, min_length=1, max_length=100)
    phone: str | None = Field(None, max_length=20)
    email: EmailStr | None = None
    birth_date: date | None = None
    coach_id: str | None = None
    status: str | None = None


class Student(StudentBase):
    """수강생 응답 모델 (DB에서 반환)."""

    id: str = Field(..., description="고유 ID")
    enrolled_at: datetime = Field(..., description="등록 일시")
