from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.queries.project_queries import get_project_by_id_and_owner
from app.models.project import Project
from app.models.task import Task
from app.schemas.task_schema import TaskCreate, TaskStatus

async def create_task(db: AsyncSession, project_id: int, task_data: TaskCreate):
    task = Task(
        title=task_data.title.strip(),
        description=task_data.description.strip() if task_data.description else None,
        status=TaskStatus.todo.value,
        project_id=project_id,
    )
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task

async def get_tasks_by_project(db: AsyncSession, project_id: int):
    result = await db.execute(
        select(Task).where(Task.project_id == project_id).order_by(Task.id.desc())
    )
    return list(result.scalars().all())

async def get_task_by_id_project_owner(
    db: AsyncSession, project_id: int, task_id: int, owner_id: int
):
    result = await db.execute(
        select(Task)
        .join(Project, Task.project_id == Project.id)
        .where(
            Task.id == task_id,
            Task.project_id == project_id,
            Project.owner_id == owner_id,
        )
    )
    return result.scalar_one_or_none()

async def update_task_status(db: AsyncSession, task: Task, status_value: TaskStatus):
    task.status = status_value.value
    await db.commit()
    await db.refresh(task)
    return task


async def delete_task(db: AsyncSession, task: Task):
    await db.delete(task)
    await db.commit()
