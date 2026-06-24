"""지도사(Coach) API 엔드포인트."""

from fastapi import APIRouter, status

from app.core.deps import get_supabase_client
from app.models.coach import Coach, CoachCreate, CoachUpdate
from app.models.common import APIResponse

router = APIRouter(prefix="/coaches", tags=["coaches"])


@router.get(
    "/",
    response_model=APIResponse[list[Coach]],
    summary="지도사 목록 조회",
)
async def list_coaches() -> APIResponse[list[Coach]]:
    """등록된 지도사 목록을 반환합니다."""
    supabase = get_supabase_client()
    try:
        result = supabase.table("coaches").select("*").order("name").execute()
        return APIResponse(
            success=True,
            data=result.data,
            message="지도사 목록 조회 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"지도사 목록 조회 실패: {str(e)}",
        )


@router.get(
    "/{coach_id}",
    response_model=APIResponse[Coach],
    summary="지도사 상세 조회",
)
async def get_coach(coach_id: str) -> APIResponse[Coach]:
    """특정 지도사의 상세 정보를 반환합니다."""
    supabase = get_supabase_client()
    try:
        result = supabase.table("coaches").select("*").eq("id", coach_id).single().execute()
        return APIResponse(
            success=True,
            data=result.data,
            message="지도사 조회 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"지도사 조회 실패: {str(e)}",
        )


@router.post(
    "/",
    response_model=APIResponse[Coach],
    status_code=status.HTTP_201_CREATED,
    summary="지도사 등록",
)
async def create_coach(body: CoachCreate) -> APIResponse[Coach]:
    """새 지도사를 등록합니다."""
    supabase = get_supabase_client()
    try:
        result = supabase.table("coaches").insert(body.model_dump()).execute()
        return APIResponse(
            success=True,
            data=result.data[0],
            message="지도사 등록 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"지도사 등록 실패: {str(e)}",
        )


@router.put(
    "/{coach_id}",
    response_model=APIResponse[Coach],
    summary="지도사 정보 수정",
)
async def update_coach(coach_id: str, body: CoachUpdate) -> APIResponse[Coach]:
    """지도사 정보를 수정합니다."""
    supabase = get_supabase_client()
    try:
        updates = body.model_dump(exclude_unset=True)
        result = supabase.table("coaches").update(updates).eq("id", coach_id).execute()
        return APIResponse(
            success=True,
            data=result.data[0],
            message="지도사 정보 수정 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"지도사 정보 수정 실패: {str(e)}",
        )


@router.delete(
    "/{coach_id}",
    response_model=APIResponse[None],
    summary="지도사 삭제",
)
async def delete_coach(coach_id: str) -> APIResponse[None]:
    """지도사를 삭제합니다."""
    supabase = get_supabase_client()
    try:
        supabase.table("coaches").delete().eq("id", coach_id).execute()
        return APIResponse(
            success=True,
            data=None,
            message="지도사 삭제 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"지도사 삭제 실패: {str(e)}",
        )
