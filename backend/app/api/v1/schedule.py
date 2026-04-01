"""스케줄(Schedule) API 엔드포인트."""

from datetime import datetime

from fastapi import APIRouter, status

from app.models.common import APIResponse
from app.models.schedule import Schedule, ScheduleCreate, ScheduleUpdate

router = APIRouter(prefix="/schedules", tags=["schedules"])

# 임시 mock 데이터
_MOCK_SCHEDULE = Schedule(
    id="schedule-001",
    coach_id="coach-001",
    title="초급 수영 A반",
    start_time=datetime(2026, 3, 20, 10, 0, 0),
    end_time=datetime(2026, 3, 20, 11, 0, 0),
    recurring=True,
    location="올림픽수영장 3레인",
)


@router.get(
    "/",
    response_model=APIResponse[list[Schedule]],
    summary="스케줄 목록 조회",
)
async def list_schedules() -> APIResponse[list[Schedule]]:
    """등록된 스케줄 목록을 반환합니다."""
    return APIResponse(
        success=True,
        data=[_MOCK_SCHEDULE],
        message="스케줄 목록 조회 성공",
    )


@router.post(
    "/",
    response_model=APIResponse[Schedule],
    status_code=status.HTTP_201_CREATED,
    summary="스케줄 등록",
)
async def create_schedule(body: ScheduleCreate) -> APIResponse[Schedule]:
    """새 스케줄을 등록합니다."""
    created = Schedule(id="schedule-new", **body.model_dump())
    return APIResponse(
        success=True,
        data=created,
        message="스케줄 등록 성공",
    )


@router.put(
    "/{schedule_id}",
    response_model=APIResponse[Schedule],
    summary="스케줄 수정",
)
async def update_schedule(
    schedule_id: str, body: ScheduleUpdate
) -> APIResponse[Schedule]:
    """스케줄 정보를 수정합니다."""
    updates = body.model_dump(exclude_unset=True)
    merged = {**_MOCK_SCHEDULE.model_dump(), **updates}
    updated = Schedule(**merged)
    return APIResponse(
        success=True,
        data=updated,
        message="스케줄 수정 성공",
    )


@router.delete(
    "/{schedule_id}",
    response_model=APIResponse[None],
    summary="스케줄 삭제",
)
async def delete_schedule(schedule_id: str) -> APIResponse[None]:
    """스케줄을 삭제합니다."""
    return APIResponse(
        success=True,
        data=None,
        message="스케줄 삭제 성공",
    )
