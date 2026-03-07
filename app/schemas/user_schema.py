from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    full_name: str
    email: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
