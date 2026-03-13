import pytest
@pytest.mark.api
class TestLoginSuccess:
    async def test_login_returns_200(self, client, login_form, user):
        form_data = login_form
        response = await client.post("/auth/login", data=form_data)
        assert response.status_code == 200

    async def test_login_returns_bearer_token(self, client, login_form, user):
        form_data = login_form
        response = await client.post("/auth/login", data=form_data)
        assert response.json().get("token_type") == "bearer"

@pytest.mark.api
class TestLoginValidation:
    @pytest.mark.parametrize("invalid_login_form", ["missing_password", "missing_username"], indirect=True)
    async def test_login_returns_422(self, client, invalid_login_form):
        form_data = invalid_login_form
        response = await client.post("/auth/login", data=form_data)
        assert response.status_code == 422

@pytest.mark.api
class TestLoginUnauthorized:
    async def test_login_with_wrong_password_returns_401(self, client, wrong_password_form, user):
        form_data = wrong_password_form
        response = await client.post("/auth/login", data=form_data)
        assert response.status_code == 401

    async def test_login_with_unknown_email_returns_401(self, client, unknown_user_form):
        form_data = unknown_user_form
        response = await client.post("/auth/login", data=form_data)
        assert response.status_code == 401
