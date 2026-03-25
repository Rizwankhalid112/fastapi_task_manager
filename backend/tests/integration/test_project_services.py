import pytest
from fastapi import HTTPException
from app.schemas.project_schema import ProjectCreate
from app.services.project_services import create_new_project, get_user_project, list_user_projects

@pytest.mark.integration
class TestProjectServices:
    async def test_create_and_list_projects(self, db_session, user):
        project = await create_new_project(
            db_session,
            owner_id=user.id,
            project_data=ProjectCreate(name="Integration Project", description="Desc"),
        )
        projects = await list_user_projects(db_session, owner_id=user.id)
        assert project.id is not None
        assert len(projects) == 1

    async def test_get_user_project_not_found(self, db_session, user):
        with pytest.raises(HTTPException) as exc:
            await get_user_project(db_session, project_id=99999, owner_id=user.id)
        assert exc.value.status_code == 404
