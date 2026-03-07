from pydantic import BaseModel
from typing import Optional

# What we need to create a user
class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str

# What we show to the public (No password!)
class UserOut(BaseModel):
    id: int
    full_name: str
    email: str

    class Config:
        from_attributes = True # Allows compatibility with SQLAlchemy models

# For the Login token response
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
