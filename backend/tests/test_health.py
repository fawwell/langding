"""헬스체크 및 기본 엔드포인트 테스트."""

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.fixture
def anyio_backend():
    return "asyncio"


@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest.mark.anyio
async def test_health_check(client: AsyncClient) -> None:
    """GET /health 가 healthy 상태를 반환하는지 확인."""
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


@pytest.mark.anyio
async def test_root(client: AsyncClient) -> None:
    """GET / 가 API 정보를 반환하는지 확인."""
    response = await client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "SportCoach API"
    assert data["version"] == "0.1.0"


@pytest.mark.anyio
async def test_coaches_list(client: AsyncClient) -> None:
    """GET /api/v1/coaches/ 가 성공 응답을 반환하는지 확인."""
    response = await client.get("/api/v1/coaches/")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert isinstance(data["data"], list)


@pytest.mark.anyio
async def test_students_list(client: AsyncClient) -> None:
    """GET /api/v1/students/ 가 성공 응답을 반환하는지 확인."""
    response = await client.get("/api/v1/students/")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True


@pytest.mark.anyio
async def test_schedules_list(client: AsyncClient) -> None:
    """GET /api/v1/schedules/ 가 성공 응답을 반환하는지 확인."""
    response = await client.get("/api/v1/schedules/")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True


@pytest.mark.anyio
async def test_auth_me(client: AsyncClient) -> None:
    """GET /api/v1/auth/me 가 사용자 정보를 반환하는지 확인."""
    response = await client.get("/api/v1/auth/me")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["role"] == "coach"
