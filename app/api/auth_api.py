from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.utils.jwt_handler import create_access_token
from app.utils.password_handler import PasswordHandler
from app.database.queries.user_queries import create_user, get_user_by_email
from app.database.connection import get_db
from app.schemas.user_schema import TokenResponse, UserCreate, UserResponse
router = APIRouter(prefix="/auth", tags=["Authentication"])
@router.post("/register", response_model=UserResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = get_user_by_email(db, email=user_data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    try:
        return create_user(db=db, user_data=user_data)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db, email=form_data.username)
    if not user or not PasswordHandler.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
