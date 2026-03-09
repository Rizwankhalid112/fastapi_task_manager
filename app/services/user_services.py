from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.queries.user_queries import create_user, get_user_by_email, update_user
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserUpdate
from app.utils.password_handler import PasswordHandler

async def register_user(db: AsyncSession, user_data: UserCreate):
    existing_user = await get_user_by_email(db, email=user_data.email)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
    return await create_user(db=db, user_data=user_data)

async def authenticate_user(db: AsyncSession, email: str, password: str):
    user = await get_user_by_email(db, email=email)
    if not user:
        return None
    if not PasswordHandler.verify_password(password, user.hashed_password):
        return None
    return user

async def update_profile(db: AsyncSession, current_user: User, profile_data: UserUpdate):
    update_data = profile_data.model_dump(exclude_unset=True)
    if not update_data:
        return current_user
    new_email = update_data.get("email")
    if new_email:
        normalized_email = new_email.lower()
        existing_user = await get_user_by_email(db, email=normalized_email)
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
        current_user.email = normalized_email
    if "full_name" in update_data and update_data["full_name"] is not None:
        current_user.full_name = update_data["full_name"]
    if "password" in update_data and update_data["password"] is not None:
        current_user.hashed_password = PasswordHandler.hash_password(update_data["password"])
    return await update_user(db=db, user=current_user)
