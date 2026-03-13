import pytest
@pytest.mark.api
class TestTasksSuccess:
    async def test_create_task_returns_201(self, client, auth_headers, user_project, task_payload):
        payload = task_payload
        response = await client.post(
            f"/api/projects/{user_project.id}/tasks", json=payload, headers=auth_headers
        )
        assert response.status_code == 201

    async def test_list_tasks_returns_200(self, client, auth_headers, user_project):
        response = await client.get(f"/api/projects/{user_project.id}/tasks", headers=auth_headers)
        assert response.status_code == 200

    async def test_list_tasks_returns_project_tasks_only(
        self, client, auth_headers, user_project, project_task
    ):
        response = await client.get(f"/api/projects/{user_project.id}/tasks", headers=auth_headers)
        assert len(response.json()) == 1

    async def test_list_tasks_returns_empty_list_when_none(self, client, auth_headers, user_project):
        response = await client.get(f"/api/projects/{user_project.id}/tasks", headers=auth_headers)
        assert response.status_code == 200
        assert response.json() == []

    async def test_update_task_status_returns_200(
        self, client, auth_headers, user_project, project_task, task_status_payload
    ):
        payload = task_status_payload
        response = await client.patch(
            f"/api/projects/{user_project.id}/tasks/{project_task.id}",
            json=payload,
            headers=auth_headers,
        )
        assert response.status_code == 200

    async def test_delete_task_returns_204(
        self, client, auth_headers, user_project, project_task
    ):
        response = await client.delete(
            f"/api/projects/{user_project.id}/tasks/{project_task.id}", headers=auth_headers
        )
        assert response.status_code == 204


@pytest.mark.api
class TestTasksValidation:
    @pytest.mark.parametrize(
        "invalid_task_payload",
        ["empty_title", "too_long_title", "too_long_description"],
        indirect=True,
    )
    async def test_create_task_returns_422(
        self, client, auth_headers, user_project, invalid_task_payload
    ):
        payload = invalid_task_payload
        response = await client.post(
            f"/api/projects/{user_project.id}/tasks", json=payload, headers=auth_headers
        )
        assert response.status_code == 422

    @pytest.mark.parametrize("invalid_task_status_payload", ["invalid_status"], indirect=True)
    async def test_update_task_status_returns_422(
        self, client, auth_headers, user_project, project_task, invalid_task_status_payload
    ):
        payload = invalid_task_status_payload
        response = await client.patch(
            f"/api/projects/{user_project.id}/tasks/{project_task.id}",
            json=payload,
            headers=auth_headers,
        )
        assert response.status_code == 422

    async def test_get_tasks_with_non_int_project_id_returns_422(self, client, auth_headers):
        response = await client.get("/api/projects/not-an-int/tasks", headers=auth_headers)
        assert response.status_code == 422

    async def test_update_task_with_non_int_task_id_returns_422(
        self, client, auth_headers, user_project, task_status_payload
    ):
        payload = task_status_payload
        response = await client.patch(
            f"/api/projects/{user_project.id}/tasks/not-an-int",
            json=payload,
            headers=auth_headers,
        )
        assert response.status_code == 422

    async def test_delete_task_with_non_int_task_id_returns_422(self, client, auth_headers, user_project):
        response = await client.delete(
            f"/api/projects/{user_project.id}/tasks/not-an-int", headers=auth_headers
        )
        assert response.status_code == 422

@pytest.mark.api
class TestTasksUnauthorized:
    async def test_create_task_without_auth_returns_401(
        self, client, user_project, task_payload
    ):
        payload = task_payload
        response = await client.post(
            f"/api/projects/{user_project.id}/tasks", json=payload
        )
        assert response.status_code == 401

    async def test_list_tasks_without_auth_returns_401(self, client, user_project):
        response = await client.get(f"/api/projects/{user_project.id}/tasks")
        assert response.status_code == 401

    async def test_update_task_without_auth_returns_401(
        self, client, user_project, project_task, task_status_payload
    ):
        payload = task_status_payload
        response = await client.patch(
            f"/api/projects/{user_project.id}/tasks/{project_task.id}", json=payload
        )
        assert response.status_code == 401

    async def test_delete_task_without_auth_returns_401(self, client, user_project, project_task):
        response = await client.delete(
            f"/api/projects/{user_project.id}/tasks/{project_task.id}"
        )
        assert response.status_code == 401


@pytest.mark.api
class TestTasksNotFound:
    async def test_create_task_for_missing_project_returns_404(
        self, client, auth_headers, task_payload
    ):
        payload = task_payload
        response = await client.post("/api/projects/99999/tasks", json=payload, headers=auth_headers)
        assert response.status_code == 404

    async def test_list_tasks_for_missing_project_returns_404(self, client, auth_headers):
        response = await client.get("/api/projects/99999/tasks", headers=auth_headers)
        assert response.status_code == 404

    async def test_update_task_not_found_returns_404(
        self, client, auth_headers, user_project, task_status_payload
    ):
        payload = task_status_payload
        response = await client.patch(
            f"/api/projects/{user_project.id}/tasks/99999", json=payload, headers=auth_headers
        )
        assert response.status_code == 404

    async def test_delete_task_not_found_returns_404(
        self, client, auth_headers, user_project
    ):
        response = await client.delete(
            f"/api/projects/{user_project.id}/tasks/99999", headers=auth_headers
        )
        assert response.status_code == 404

    async def test_get_tasks_other_user_project_returns_404(
        self, client, auth_headers, second_user_project
    ):
        response = await client.get(
            f"/api/projects/{second_user_project.id}/tasks", headers=auth_headers
        )
        assert response.status_code == 404

@pytest.mark.e2e
class TestTasksEndToEnd:
    async def test_end_to_end_task_flow_returns_204(
        self,
        client,
        register_payload,
        project_payload,
        task_payload,
        task_status_payload,
    ):
        await client.post("/auth/register", json=register_payload)
        login_form = {
            "username": register_payload["email"],
            "password": register_payload["password"],
        }
        login_response = await client.post("/auth/login", data=login_form)
        access_token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {access_token}"}

        project_response = await client.post("/api/projects", json=project_payload, headers=headers)
        project_id = project_response.json()["id"]
        task_response = await client.post(
            f"/api/projects/{project_id}/tasks", json=task_payload, headers=headers
        )
        task_id = task_response.json()["id"]
        await client.patch(
            f"/api/projects/{project_id}/tasks/{task_id}",
            json=task_status_payload,
            headers=headers,
        )
        delete_response = await client.delete(
            f"/api/projects/{project_id}/tasks/{task_id}", headers=headers
        )
        assert delete_response.status_code == 204
