import pytest
from fastapi import HTTPException
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserUpdate
from app.services.user_services import authenticate_user, register_user, update_profile
from app.utils.password_handler import PasswordHandler
from tests.factories import DEFAULT_PASSWORD

@pytest.mark.integration
class TestUserServices:
    async def test_register_user_creates_user(self, db_session):
        user_data = UserCreate(
            full_name="Integration User",
            email="integration.user@example.com",
            password="Str0ngPass!2026",
        )
        user = await register_user(db_session, user_data=user_data)
        assert user.id is not None
        assert user.email == "integration.user@example.com"

    async def test_authenticate_user_success(self, db_session):
        user = User(
            full_name="Auth User",
            email="auth.user@example.com",
            hashed_password=PasswordHandler.hash_password(DEFAULT_PASSWORD),
        )
        db_session.add(user)
        await db_session.commit()
        await db_session.refresh(user)
        authenticated = await authenticate_user(db_session, email=user.email, password=DEFAULT_PASSWORD)
        assert authenticated is not None
        assert authenticated.id == user.id

    async def test_update_profile_duplicate_email_raises(self, db_session):
        user = User(
            full_name="Primary User",
            email="primary.user@example.com",
            hashed_password=PasswordHandler.hash_password(DEFAULT_PASSWORD),
        )
        other = User(
            full_name="Other User",
            email="other.user@example.com",
            hashed_password=PasswordHandler.hash_password(DEFAULT_PASSWORD),
        )
        db_session.add_all([user, other])
        await db_session.commit()
        await db_session.refresh(user)
        with pytest.raises(HTTPException) as exc:
            await update_profile(db_session, current_user=user, profile_data=UserUpdate(email=other.email))
        assert exc.value.status_code == 409
