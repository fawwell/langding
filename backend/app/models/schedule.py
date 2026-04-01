"""스케줄(Schedule) 모델."""

from datetime import datetime

from pydantic import BaseModel, Field


class ScheduleBase(BaseModel):
    """스케줄 공통 필드."""

    coach_id: str = Field(..., description="지도사 ID")
    title: str = Field(..., min_length=1, max_length=200, description="수업 제목")
    start_time: datetime = Field(..., description="시작 시간")
    end_time: datetime = Field(..., description="종료 시간")
    recurring: bool = Field(False, description="반복 여부")
    location: str | None = Field(None, max_length=300, description="수업 장소")


class ScheduleCreate(ScheduleBase):
    """스케줄 생성 요청."""

    pass


class ScheduleUpdate(BaseModel):
    """스케줄 수정 요청 (부분 업데이트)."""

    coach_id: str | None = None
    title: str | None = Field(None, min_length=1, max_length=200)
    start_time: datetime | None = None
    end_time: datetime | None = None
    recurring: bool | None = None
    location: str | None = Field(None, max_length=300)


class Schedule(ScheduleBase):
    """스케줄 응답 모델 (DB에서 반환)."""

    id: str = Field(..., description="고유 ID")
