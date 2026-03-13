import pytest
@pytest.mark.api
class TestProfileSuccess:
    async def test_get_profile_returns_200(self, client, auth_headers):
        response = await client.get("/users/me", headers=auth_headers)
        assert response.status_code == 200
    async def test_update_profile_returns_200(self, client, auth_headers, update_profile_payload):
        payload = update_profile_payload
        response = await client.patch("/users/me", json=payload, headers=auth_headers)
        assert response.status_code == 200

@pytest.mark.api
class TestProfileValidation:
    @pytest.mark.parametrize(
        "invalid_update_profile_payload",
        ["invalid_email", "weak_password", "invalid_full_name", "password_with_space"],
        indirect=True,
    )
    async def test_update_profile_returns_422(
        self, client, auth_headers, invalid_update_profile_payload
    ):
        payload = invalid_update_profile_payload
        response = await client.patch("/users/me", json=payload, headers=auth_headers)
        assert response.status_code == 422

@pytest.mark.api
class TestProfileUnauthorized:
    async def test_get_profile_without_auth_returns_401(self, client):
        response = await client.get("/users/me")
        assert response.status_code == 401
    async def test_update_profile_without_auth_returns_401(self, client, update_profile_payload):
        payload = update_profile_payload
        response = await client.patch("/users/me", json=payload)
        assert response.status_code == 401

@pytest.mark.api
class TestProfileDuplicates:
    async def test_update_profile_duplicate_email_returns_409(
        self, client, auth_headers, duplicate_update_email_payload, second_user
    ):
        payload = duplicate_update_email_payload
        response = await client.patch("/users/me", json=payload, headers=auth_headers)
        assert response.status_code == 409