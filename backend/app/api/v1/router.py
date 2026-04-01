"""v1 API 라우터 통합."""

from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.coaches import router as coaches_router
from app.api.v1.schedule import router as schedule_router
from app.api.v1.students import router as students_router

router = APIRouter()

router.include_router(auth_router)
router.include_router(coaches_router)
router.include_router(students_router)
router.include_router(schedule_router)
