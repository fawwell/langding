"""수강생(Student) API 엔드포인트."""

from datetime import datetime

from fastapi import APIRouter, status

from app.models.common import APIResponse
from app.models.student import Student, StudentCreate, StudentUpdate

router = APIRouter(prefix="/students", tags=["students"])

# 임시 mock 데이터
_MOCK_STUDENT = Student(
    id="student-001",
    name="이영희",
    phone="010-1234-5678",
    email="younghee@example.com",
    birth_date="2000-05-15",
    coach_id="coach-001",
    enrolled_at=datetime(2025, 1, 10, 9, 0, 0),
    status="active",
)


@router.get(
    "/",
    response_model=APIResponse[list[Student]],
    summary="수강생 목록 조회",
)
async def list_students() -> APIResponse[list[Student]]:
    """등록된 수강생 목록을 반환합니다."""
    return APIResponse(
        success=True,
        data=[_MOCK_STUDENT],
        message="수강생 목록 조회 성공",
    )


@router.get(
    "/{student_id}",
    response_model=APIResponse[Student],
    summary="수강생 상세 조회",
)
async def get_student(student_id: str) -> APIResponse[Student]:
    """특정 수강생의 상세 정보를 반환합니다."""
    return APIResponse(
        success=True,
        data=_MOCK_STUDENT,
        message="수강생 조회 성공",
    )


@router.post(
    "/",
    response_model=APIResponse[Student],
    status_code=status.HTTP_201_CREATED,
    summary="수강생 등록",
)
async def create_student(body: StudentCreate) -> APIResponse[Student]:
    """새 수강생을 등록합니다."""
    created = Student(
        id="student-new",
        enrolled_at=datetime.now(),
        **body.model_dump(),
    )
    return APIResponse(
        success=True,
        data=created,
        message="수강생 등록 성공",
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
    updates = body.model_dump(exclude_unset=True)
    merged = {**_MOCK_STUDENT.model_dump(), **updates}
    updated = Student(**merged)
    return APIResponse(
        success=True,
        data=updated,
        message="수강생 정보 수정 성공",
    )


@router.delete(
    "/{student_id}",
    response_model=APIResponse[None],
    summary="수강생 삭제",
)
async def delete_student(student_id: str) -> APIResponse[None]:
    """수강생을 삭제합니다."""
    return APIResponse(
        success=True,
        data=None,
        message="수강생 삭제 성공",
    )
