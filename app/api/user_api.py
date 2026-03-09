from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.dependencies.get_current_user import get_current_user
from app.models.user import User
from app.schemas.user_schema import UserResponse, UserUpdate
from app.services.user_services import update_profile
router = APIRouter(prefix="/users", tags=["Users"])
@router.get("/me", response_model=UserResponse)
async def get_my_profile(current_user: User = Depends(get_current_user)):
    return current_user
@router.patch("/me", response_model=UserResponse)
async def update_my_profile(
    profile_data: UserUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await update_profile(db=db, current_user=current_user, profile_data=profile_data)
