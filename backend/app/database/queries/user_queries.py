from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.utils.password_handler import PasswordHandler

async def create_user(db: AsyncSession, user_data: UserCreate):
    hashed_password = PasswordHandler.hash_password(user_data.password)
    new_user = User(
        full_name=user_data.full_name,
        email=str(user_data.email).lower(),
        hashed_password=hashed_password,
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

async def get_user_by_email(db: AsyncSession, email: str):
    normalized_email = email.strip().lower()
    result = await db.execute(
        select(User).where(func.lower(User.email) == normalized_email)
    )
    return result.scalar_one_or_none()

async def get_user_by_id(db: AsyncSession, user_id: int):
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

async def update_user(db: AsyncSession, user: User):
    await db.commit()
    await db.refresh(user)
    return user
