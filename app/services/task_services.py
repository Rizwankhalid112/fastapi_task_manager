from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.queries.task_queries import (
    create_task,
    delete_task,
    get_project_by_id_and_owner,
    get_task_by_id_project_owner,
    get_tasks_by_project,
    update_task_status,
)
from app.schemas.task_schema import TaskCreate, TaskStatus

async def create_task_for_project(db: AsyncSession, project_id: int, owner_id: int, task_data: TaskCreate):
    project = await get_project_by_id_and_owner(db=db, project_id=project_id, owner_id=owner_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return await create_task(db=db, project_id=project_id, task_data=task_data)

async def list_tasks_for_project(db: AsyncSession, project_id: int, owner_id: int):
    project = await get_project_by_id_and_owner(db=db, project_id=project_id, owner_id=owner_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return await get_tasks_by_project(db=db, project_id=project_id)

async def change_task_status(
    db: AsyncSession,
    project_id: int,
    task_id: int,
    owner_id: int,
    status_value: TaskStatus,
):
    task = await get_task_by_id_project_owner(
        db=db,
        project_id=project_id,
        task_id=task_id,
        owner_id=owner_id,
    )
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return await update_task_status(db=db, task=task, status_value=status_value)

async def remove_task_from_project(db: AsyncSession, project_id: int, task_id: int, owner_id: int):
    task = await get_task_by_id_project_owner(
        db=db,
        project_id=project_id,
        task_id=task_id,
        owner_id=owner_id,
    )
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    await delete_task(db=db, task=task)
