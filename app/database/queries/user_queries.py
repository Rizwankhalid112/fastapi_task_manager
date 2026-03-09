from app.utils.password_handler import PasswordHandler
from app.models.user import User
from app.schemas.user_schema import UserCreate
from sqlalchemy.orm import Session

def create_user(db: Session, user_data: UserCreate):
    hashed_password = PasswordHandler.hash_password(user_data.password)
    new_user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        hashed_password=hashed_password,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()
