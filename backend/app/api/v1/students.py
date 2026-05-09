"""수강생(Student) API 엔드포인트."""

from datetime import datetime
from fastapi import APIRouter, status

from app.core.deps import get_supabase_client
from app.models.common import APIResponse
from app.models.student import Student, StudentCreate, StudentUpdate

router = APIRouter(prefix="/students", tags=["students"])


@router.get(
    "/",
    response_model=APIResponse[list[Student]],
    summary="수강생 목록 조회",
)
async def list_students(coach_id: str | None = None) -> APIResponse[list[Student]]:
    """등록된 수강생 목록을 반환합니다."""
    supabase = get_supabase_client()
    try:
        query = supabase.table("students").select("*").order("name")
        if coach_id:
            query = query.eq("coach_id", coach_id)
        result = query.execute()
        return APIResponse(
            success=True,
            data=result.data,
            message="수강생 목록 조회 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"수강생 목록 조회 실패: {str(e)}",
        )


@router.get(
    "/{student_id}",
    response_model=APIResponse[Student],
    summary="수강생 상세 조회",
)
async def get_student(student_id: str) -> APIResponse[Student]:
    """특정 수강생의 상세 정보를 반환합니다."""
    supabase = get_supabase_client()
    try:
        result = supabase.table("students").select("*").eq("id", student_id).single().execute()
        return APIResponse(
            success=True,
            data=result.data,
            message="수강생 조회 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"수강생 조회 실패: {str(e)}",
        )


@router.post(
    "/",
    response_model=APIResponse[Student],
    status_code=status.HTTP_201_CREATED,
    summary="수강생 등록",
)
async def create_student(body: StudentCreate) -> APIResponse[Student]:
    """새 수강생을 등록합니다."""
    supabase = get_supabase_client()
    try:
        data = body.model_dump()
        data["enrolled_at"] = datetime.now().isoformat()
        result = supabase.table("students").insert(data).execute()
        return APIResponse(
            success=True,
            data=result.data[0],
            message="수강생 등록 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"수강생 등록 실패: {str(e)}",
        )


@router.put(
    "/{student_id}",
    response_model=APIResponse[Student],
    summary="수강생 정보 수정",
)
async def update_student(
    student_id: str, body: StudentUpdate
) -> APIResponse[Student]:
    """수강생 정보를 수정합니다."""
    supabase = get_supabase_client()
    try:
        updates = body.model_dump(exclude_unset=True)
        result = supabase.table("students").update(updates).eq("id", student_id).execute()
        return APIResponse(
            success=True,
            data=result.data[0],
            message="수강생 정보 수정 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"수강생 정보 수정 실패: {str(e)}",
        )


@router.delete(
    "/{student_id}",
    response_model=APIResponse[None],
    summary="수강생 삭제",
)
async def delete_student(student_id: str) -> APIResponse[None]:
    """수강생을 삭제합니다."""
    supabase = get_supabase_client()
    try:
        supabase.table("students").delete().eq("id", student_id).execute()
        return APIResponse(
            success=True,
            data=None,
            message="수강생 삭제 성공",
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message=f"수강생 삭제 실패: {str(e)}",
        )
