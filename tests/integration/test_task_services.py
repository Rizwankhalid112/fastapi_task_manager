import pytest
from fastapi import HTTPException
from app.models.project import Project
from app.models.user import User
from app.schemas.task_schema import TaskCreate
from app.services.task_services import (
    change_task_status,
    create_task_for_project,
    list_tasks_for_project,
)
from app.utils.password_handler import PasswordHandler
from tests.factories import DEFAULT_PASSWORD

@pytest.mark.integration
class TestTaskServices:
    async def test_create_and_list_tasks(self, db_session):
        user = User(
            full_name="Task Owner",
            email="task.owner@example.com",
            hashed_password=PasswordHandler.hash_password(DEFAULT_PASSWORD),
        )
        db_session.add(user)
        await db_session.commit()
        await db_session.refresh(user)
        project = Project(name="Task Project", description="Desc", owner_id=user.id)
        db_session.add(project)
        await db_session.commit()
        await db_session.refresh(project)
        task = await create_task_for_project(
            db_session,
            project_id=project.id,
            owner_id=user.id,
            task_data=TaskCreate(title="Integration Task", description="Desc"),
        )
        tasks = await list_tasks_for_project(db_session, project_id=project.id, owner_id=user.id)
        assert task.id is not None
        assert len(tasks) == 1
    async def test_change_task_status_not_found(self, db_session):
        user = User(
            full_name="Task Missing Owner",
            email="task.missing@example.com",
            hashed_password=PasswordHandler.hash_password(DEFAULT_PASSWORD),
        )
        db_session.add(user)
        await db_session.commit()
        await db_session.refresh(user)
        with pytest.raises(HTTPException) as exc:
            await change_task_status(
                db_session,
                project_id=99999,
                task_id=99999,
                owner_id=user.id,
                status_value="done",
            )
        assert exc.value.status_code == 404
