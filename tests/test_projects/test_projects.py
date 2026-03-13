import pytest
@pytest.mark.api
class TestProjectsSuccess:
    async def test_create_project_returns_201(self, client, auth_headers, project_payload):
        payload = project_payload
        response = await client.post("/api/projects", json=payload, headers=auth_headers)
        assert response.status_code == 201
    async def test_list_projects_returns_200(self, client, auth_headers, user_project):
        response = await client.get("/api/projects", headers=auth_headers)
        assert response.status_code == 200
    async def test_list_projects_returns_only_user_projects(
        self, client, auth_headers, user_project, second_user_project
    ):
        response = await client.get("/api/projects", headers=auth_headers)
        assert len(response.json()) == 1
    async def test_get_project_returns_200(self, client, auth_headers, user_project):
        response = await client.get(f"/api/projects/{user_project.id}", headers=auth_headers)
        assert response.status_code == 200
    async def test_delete_project_returns_204(self, client, auth_headers, user_project):
        response = await client.delete(f"/api/projects/{user_project.id}", headers=auth_headers)
        assert response.status_code == 204

@pytest.mark.api
class TestProjectsValidation:
    @pytest.mark.parametrize("invalid_project_payload", ["empty_name", "too_long_name"], indirect=True)
    async def test_create_project_returns_422(
        self, client, auth_headers, invalid_project_payload
    ):
        payload = invalid_project_payload
        response = await client.post("/api/projects", json=payload, headers=auth_headers)
        assert response.status_code == 422

@pytest.mark.api
class TestProjectsUnauthorized:
    async def test_create_project_without_auth_returns_401(self, client, project_payload):
        payload = project_payload
        response = await client.post("/api/projects", json=payload)
        assert response.status_code == 401
    async def test_list_projects_without_auth_returns_401(self, client):
        response = await client.get("/api/projects")
        assert response.status_code == 401

@pytest.mark.api
class TestProjectsNotFound:
    async def test_get_project_not_found_returns_404(self, client, auth_headers):
        response = await client.get("/api/projects/99999", headers=auth_headers)
        assert response.status_code == 404
    async def test_get_other_user_project_returns_404(
        self, client, auth_headers, second_user_project
    ):
        response = await client.get(f"/api/projects/{second_user_project.id}", headers=auth_headers)
        assert response.status_code == 404
    async def test_delete_project_not_found_returns_404(self, client, auth_headers):
        response = await client.delete("/api/projects/99999", headers=auth_headers)
        assert response.status_code == 404
