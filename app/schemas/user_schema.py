import re
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        email = value.strip()
        email_pattern = re.compile(
            r"^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@"
            r"[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?"
            r"(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$"
        )
        if not email_pattern.match(email):
            raise ValueError("Enter a valid email address.")
        local_part, domain = email.rsplit("@", 1)
        if local_part.startswith(".") or local_part.endswith(".") or ".." in local_part:
            raise ValueError("Enter a valid email address.")
        tld = domain.rsplit(".", 1)[-1]
        if len(tld) < 2:
            raise ValueError("Enter a valid email address.")
        return email.lower()
    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, value: str) -> str:
        if not re.search(r"[A-Z]", value):
            raise ValueError("Password must include at least one uppercase letter.")
        if not re.search(r"[a-z]", value):
            raise ValueError("Password must include at least one lowercase letter.")
        if not re.search(r"\d", value):
            raise ValueError("Password must include at least one number.")
        if not re.search(r"[^A-Za-z0-9]", value):
            raise ValueError("Password must include at least one special character.")
        if re.search(r"\s", value):
            raise ValueError("Password must not contain spaces.")
        return value

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    email: Optional[str] = None
