from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.dependencies.get_current_user import get_current_user
from app.models.user import User
from app.schemas.task_schema import TaskCreate, TaskResponse, TaskStatusUpdate
from app.services.task_services import (
    change_task_status,
    create_task_for_project,
    list_tasks_for_project,
    remove_task_from_project,
)
router = APIRouter(prefix="/api/projects/{project_id}/tasks", tags=["Tasks"])
@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task_endpoint(
    project_id: int,
    task_data: TaskCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await create_task_for_project(
        db=db,
        project_id=project_id,
        owner_id=current_user.id,
        task_data=task_data,
    )
@router.get("", response_model=List[TaskResponse])
async def get_tasks_endpoint(
    project_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await list_tasks_for_project(
        db=db,
        project_id=project_id,
        owner_id=current_user.id,
    )
@router.patch("/{task_id}", response_model=TaskResponse)
async def update_task_status_endpoint(
    project_id: int,
    task_id: int,
    status_data: TaskStatusUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await change_task_status(
        db=db,
        project_id=project_id,
        task_id=task_id,
        owner_id=current_user.id,
        status_value=status_data.status,
    )
@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task_endpoint(
    project_id: int,
    task_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    await remove_task_from_project(
        db=db,
        project_id=project_id,
        task_id=task_id,
        owner_id=current_user.id,
    )