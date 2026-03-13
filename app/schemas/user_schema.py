from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from zxcvbn import zxcvbn

def _validate_full_name(value: str) -> str:
    cleaned = " ".join(value.split())
    if not cleaned.replace(" ", "").isalpha():
        raise ValueError("Full name must contain letters only.")
    return cleaned.title()
def _validate_password_strength(value: str) -> str:
    if any(ch.isspace() for ch in value):
        raise ValueError("Password must not contain spaces.")
    strength = zxcvbn(value)
    if strength["score"] < 3:
        raise ValueError("Password is too weak. Use a longer and less predictable password.")
    return value

class UserCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, value: str) -> str:
        return _validate_full_name(value)
    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, value: str) -> str:
        return _validate_password_strength(value)

class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(default=None, min_length=2, max_length=50)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(default=None, min_length=8, max_length=72)
    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        return _validate_full_name(value)
    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        return _validate_password_strength(value)

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    full_name: str
    email: EmailStr

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None
