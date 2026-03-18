import pytest
from fastapi import HTTPException
from app.schemas.task_schema import TaskCreate, TaskStatus
from app.services.task_services import (
    change_task_status,
    create_task_for_project,
    list_tasks_for_project,
)

@pytest.mark.integration
class TestTaskServices:
    async def test_create_and_list_tasks(self, db_session, user, user_project):
        task = await create_task_for_project(
            db_session,
            project_id=user_project.id,
            owner_id=user.id,
            task_data=TaskCreate(title="Integration Task", description="Desc"),
        )
        tasks = await list_tasks_for_project(
            db_session, project_id=user_project.id, owner_id=user.id
        )
        assert task.id is not None
        assert len(tasks) == 1

    async def test_change_task_status_not_found(self, db_session, user):
        with pytest.raises(HTTPException) as exc:
            await change_task_status(
                db_session,
                project_id=99999,
                task_id=99999,
                owner_id=user.id,
                status_value=TaskStatus.done,
            )
        assert exc.value.status_code == 404
