from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.auth.password_handler import PasswordHandler

def create_user(db: Session, user_data: UserCreate):
    hashed_pwd = PasswordHandler.hash_password(user_data.password)
    db_user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        hashed_password=hashed_pwd
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()