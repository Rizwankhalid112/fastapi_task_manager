import pytest
from fastapi import HTTPException

from app.models.user import User
from app.schemas.project_schema import ProjectCreate
from app.services.project_services import create_new_project, get_user_project, list_user_projects
from app.utils.password_handler import PasswordHandler
from tests.factories import DEFAULT_PASSWORD


@pytest.mark.integration
class TestProjectServices:
    async def test_create_and_list_projects(self, db_session):
        user = User(
            full_name="Project Owner",
            email="project.owner@example.com",
            hashed_password=PasswordHandler.hash_password(DEFAULT_PASSWORD),
        )
        db_session.add(user)
        await db_session.commit()
        await db_session.refresh(user)

        project = await create_new_project(
            db_session,
            owner_id=user.id,
            project_data=ProjectCreate(name="Integration Project", description="Desc"),
        )
        projects = await list_user_projects(db_session, owner_id=user.id)
        assert project.id is not None
        assert len(projects) == 1

    async def test_get_user_project_not_found(self, db_session):
        user = User(
            full_name="Missing Project Owner",
            email="missing.project@example.com",
            hashed_password=PasswordHandler.hash_password(DEFAULT_PASSWORD),
        )
        db_session.add(user)
        await db_session.commit()
        await db_session.refresh(user)

        with pytest.raises(HTTPException) as exc:
            await get_user_project(db_session, project_id=99999, owner_id=user.id)

        assert exc.value.status_code == 404
