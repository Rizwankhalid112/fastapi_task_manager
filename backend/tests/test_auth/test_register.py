import pytest
@pytest.mark.api
class TestRegisterSuccess:
    async def test_register_returns_200(self, client, register_payload):
        payload = register_payload
        response = await client.post("/auth/register", json=payload)
        assert response.status_code == 200

    async def test_register_normalizes_full_name(self, client, register_payload):
        payload = {**register_payload, "full_name": "  john   doe "}
        response = await client.post("/auth/register", json=payload)
        assert response.status_code == 200
        assert response.json()["full_name"] == "John Doe"

@pytest.mark.api
class TestRegisterValidation:
    @pytest.mark.parametrize(
        "invalid_register_payload",
        ["invalid_email", "weak_password", "invalid_full_name", "password_with_space"],
        indirect=True,
    )
    async def test_register_returns_422(self, client, invalid_register_payload):
        payload = invalid_register_payload
        response = await client.post("/auth/register", json=payload)
        assert response.status_code == 422

@pytest.mark.api
class TestRegisterDuplicates:
    async def test_register_duplicate_email_returns_409(self, client, duplicate_register_payload, user):
        payload = duplicate_register_payload
        response = await client.post("/auth/register", json=payload)
        assert response.status_code == 409

    async def test_register_duplicate_email_is_case_insensitive(self, client, register_payload, user):
        payload = {**register_payload, "email": "TEST.USER@EXAMPLE.COM"}
        response = await client.post("/auth/register", json=payload)
        assert response.status_code == 409
