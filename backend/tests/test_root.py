import pytest


@pytest.mark.api
class TestRoot:
    async def test_root_returns_200(self, client):
        response = await client.get("/")
        assert response.status_code == 200

    async def test_root_post_returns_405(self, client):
        response = await client.post("/")
        assert response.status_code == 405

    async def test_health_returns_200(self, client):
        response = await client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}
