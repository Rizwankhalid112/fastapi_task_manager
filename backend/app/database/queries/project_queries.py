from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.project import Project
from app.schemas.project_schema import ProjectCreate

async def create_project(db: AsyncSession, owner_id: int, project_data: ProjectCreate):
    project = Project(
        name=project_data.name.strip(),
        description=project_data.description.strip() if project_data.description else None,
        owner_id=owner_id,
    )
    db.add(project)
    await db.commit()
    await db.refresh(project)
    return project

async def get_projects_by_owner(db: AsyncSession, owner_id: int):
    result = await db.execute(select(Project).where(Project.owner_id == owner_id).order_by(Project.id.desc()))
    return list(result.scalars().all())

async def get_project_by_id_and_owner(db: AsyncSession, project_id: int, owner_id: int):
    result = await db.execute(
        select(Project).where(Project.id == project_id, Project.owner_id == owner_id)
    )
    return result.scalar_one_or_none()

async def delete_project(db: AsyncSession, project: Project):
    await db.delete(project)
    await db.commit()
