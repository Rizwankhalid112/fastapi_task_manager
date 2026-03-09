from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.dependencies.get_current_user import get_current_user
from app.models.user import User
from app.schemas.project_schema import ProjectCreate, ProjectResponse
from app.services.project_services import (
    create_new_project,
    get_user_project,
    list_user_projects,
    remove_user_project,
)
router = APIRouter(prefix="/api/projects", tags=["Projects"])
@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project_endpoint(
    project_data: ProjectCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await create_new_project(db=db, owner_id=current_user.id, project_data=project_data)

@router.get("", response_model=List[ProjectResponse])
async def get_projects_endpoint(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await list_user_projects(db=db, owner_id=current_user.id)

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project_endpoint(
    project_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await get_user_project(db=db, project_id=project_id, owner_id=current_user.id)

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project_endpoint(
    project_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    await remove_user_project(db=db, project_id=project_id, owner_id=current_user.id)
