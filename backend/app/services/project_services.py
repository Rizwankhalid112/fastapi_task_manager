from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.queries.project_queries import (
    create_project,
    delete_project,
    get_project_by_id_and_owner,
    get_projects_by_owner,
)
from app.schemas.project_schema import ProjectCreate

async def create_new_project(db: AsyncSession, owner_id: int, project_data: ProjectCreate):
    return await create_project(db=db, owner_id=owner_id, project_data=project_data)

async def list_user_projects(db: AsyncSession, owner_id: int):
    return await get_projects_by_owner(db=db, owner_id=owner_id)

async def get_user_project(db: AsyncSession, project_id: int, owner_id: int):
    project = await get_project_by_id_and_owner(db=db, project_id=project_id, owner_id=owner_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project

async def remove_user_project(db: AsyncSession, project_id: int, owner_id: int):
    project = await get_project_by_id_and_owner(db=db, project_id=project_id, owner_id=owner_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    await delete_project(db=db, project=project)
