import pytest
from fastapi import HTTPException
from app.schemas.user_schema import UserCreate, UserUpdate
from app.services.user_services import authenticate_user, register_user, update_profile
from tests.defaults import DEFAULT_PASSWORD

@pytest.mark.integration
class TestUserServices:
    async def test_register_user_creates_user(self, db_session, strong_password):
        user_data = UserCreate(
            full_name="Integration User",
            email="integration.user@example.com",
            password=strong_password,
        )
        user = await register_user(db_session, user_data=user_data)
        assert user.id is not None
        assert user.email == "integration.user@example.com"

    async def test_authenticate_user_success(self, db_session, user):
        authenticated = await authenticate_user(
            db_session, email=user.email, password=DEFAULT_PASSWORD
        )
        assert authenticated is not None
        assert authenticated.id == user.id

    async def test_update_profile_duplicate_email_raises(self, db_session, user, second_user):
        with pytest.raises(HTTPException) as exc:
            await update_profile(
                db_session,
                current_user=user,
                profile_data=UserUpdate(email=second_user.email),
            )
        assert exc.value.status_code == 409
