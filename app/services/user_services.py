from sqlalchemy.orm import Session
from app.database.queries.user_queries import create_user, get_user_by_email
from app.schemas.user_schema import UserCreate
from app.utils.password_handler import PasswordHandler

def register_user(db: Session, user_data: UserCreate):
    existing_user = get_user_by_email(db, email=user_data.email)
    if existing_user:
        return None
    return create_user(db=db, user_data=user_data)

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email=email)
    if not user:
        return None
    if not PasswordHandler.verify_password(password, user.hashed_password):
        return None
    return user
