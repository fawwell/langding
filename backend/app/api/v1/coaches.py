"""지도사(Coach) API 엔드포인트."""

from fastapi import APIRouter, status

from app.models.coach import Coach, CoachCreate, CoachUpdate
from app.models.common import APIResponse

router = APIRouter(prefix="/coaches", tags=["coaches"])

# 임시 mock 데이터
_MOCK_COACH = Coach(
    id="coach-001",
    name="김철수",
    photo_url=None,
    specialty="수영",
    bio="수영 전문 지도사입니다.",
    experience_years=10,
    certifications=["생활체육지도사 2급", "수상안전강사"],
)


@router.get(
    "/",
    response_model=APIResponse[list[Coach]],
    summary="지도사 목록 조회",
)
async def list_coaches() -> APIResponse[list[Coach]]:
    """등록된 지도사 목록을 반환합니다."""
    return APIResponse(
        success=True,
        data=[_MOCK_COACH],
        message="지도사 목록 조회 성공",
    )


@router.get(
    "/{coach_id}",
    response_model=APIResponse[Coach],
    summary="지도사 상세 조회",
)
async def get_coach(coach_id: str) -> APIResponse[Coach]:
    """특정 지도사의 상세 정보를 반환합니다."""
    return APIResponse(
        success=True,
        data=_MOCK_COACH,
        message="지도사 조회 성공",
    )


@router.post(
    "/",
    response_model=APIResponse[Coach],
    status_code=status.HTTP_201_CREATED,
    summary="지도사 등록",
)
async def create_coach(body: CoachCreate) -> APIResponse[Coach]:
    """새 지도사를 등록합니다."""
    # 불변 패턴: body를 변경하지 않고 새 객체 생성
    created = Coach(id="coach-new", **body.model_dump())
    return APIResponse(
        success=True,
        data=created,
        message="지도사 등록 성공",
    )


@router.put(
    "/{coach_id}",
    response_model=APIResponse[Coach],
    summary="지도사 정보 수정",
)
async def update_coach(coach_id: str, body: CoachUpdate) -> APIResponse[Coach]:
    """지도사 정보를 수정합니다."""
    # 불변 패턴: 기존 데이터와 업데이트를 병합해서 새 객체 생성
    updates = body.model_dump(exclude_unset=True)
    merged = {**_MOCK_COACH.model_dump(), **updates}
    updated = Coach(**merged)
    return APIResponse(
        success=True,
        data=updated,
        message="지도사 정보 수정 성공",
    )
