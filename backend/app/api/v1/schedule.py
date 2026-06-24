"""스케줄(Schedule) API 엔드포인트."""

from fastapi import APIRouter, status

from app.core.deps import get_supabase_client
from app.models.common import APIResponse
from app.models.schedule import Schedule, ScheduleCreate, ScheduleUpdate

router = APIRouter(prefix="/schedules", tags=["schedules"])


@router.get(
    "/",
    response_model=APIResponse[list[Schedule]],
    summary="스케줄 목록 조회",
)
async def list_schedules(
    coach_id: str | None = None,
    start_date: str | None = None,
    end_date: str | None = None
) -> APIResponse[list[Schedule]]:
    """등록된 스케줄 목록을 반환합니다."""
    supabase = get_supabase_client()
    try:
        query = supabase.table("schedules").select("*").order("start_time")
        if coach_id:
            query = query.eq("coach_id", coach_id)
        if start_date:
            query = query.gte("start_time", start_date)
        if end_date:
            query = query.lte("start_time", end_date)
        
        result = query.execute()
        return APIResponse(
            success=True,
            data=result.data,
            message="스케줄 목록 조회 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"스케줄 목록 조회 실패: {str(e)}",
        )


@router.post(
    "/",
    response_model=APIResponse[Schedule],
    status_code=status.HTTP_201_CREATED,
    summary="스케줄 등록",
)
async def create_schedule(body: ScheduleCreate) -> APIResponse[Schedule]:
    """새 스케줄을 등록합니다."""
    supabase = get_supabase_client()
    try:
        result = supabase.table("schedules").insert(body.model_dump()).execute()
        return APIResponse(
            success=True,
            data=result.data[0],
            message="스케줄 등록 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"스케줄 등록 실패: {str(e)}",
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
    supabase = get_supabase_client()
    try:
        updates = body.model_dump(exclude_unset=True)
        result = supabase.table("schedules").update(updates).eq("id", schedule_id).execute()
        return APIResponse(
            success=True,
            data=result.data[0],
            message="스케줄 수정 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"스케줄 수정 실패: {str(e)}",
        )


@router.delete(
    "/{schedule_id}",
    response_model=APIResponse[None],
    summary="스케줄 삭제",
)
async def delete_schedule(schedule_id: str) -> APIResponse[None]:
    """스케줄을 삭제합니다."""
    supabase = get_supabase_client()
    try:
        supabase.table("schedules").delete().eq("id", schedule_id).execute()
        return APIResponse(
            success=True,
            data=None,
            message="스케줄 삭제 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"스케줄 삭제 실패: {str(e)}",
        )
