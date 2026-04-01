"""지도사 서비스 (비즈니스 로직 placeholder)."""

from app.models.coach import Coach, CoachCreate, CoachUpdate


async def get_all_coaches() -> list[Coach]:
    """모든 지도사를 조회합니다. (placeholder)"""
    # TODO: Supabase 연동 후 실제 구현
    return []


async def get_coach_by_id(coach_id: str) -> Coach | None:
    """ID로 지도사를 조회합니다. (placeholder)"""
    # TODO: Supabase 연동 후 실제 구현
    return None


async def create_coach(data: CoachCreate) -> Coach:
    """새 지도사를 생성합니다. (placeholder)"""
    # TODO: Supabase 연동 후 실제 구현
    return Coach(id="placeholder", **data.model_dump())


async def update_coach(coach_id: str, data: CoachUpdate) -> Coach | None:
    """지도사 정보를 수정합니다. (placeholder)"""
    # TODO: Supabase 연동 후 실제 구현
    return None
