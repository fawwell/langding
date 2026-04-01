"""공통 응답 모델."""

from typing import Any, Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class APIResponse(BaseModel, Generic[T]):
    """통일된 API 응답 래퍼."""

    success: bool
    data: T | None = None
    message: str = ""
