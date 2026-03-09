from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from app.config import settings

def create_access_token(user_id: int) -> str:
    try:
        payload = {
            "sub": str(user_id),
            "exp": datetime.now(timezone.utc) + timedelta(
                minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
            )
        }
        return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    except JWTError as exc:
        raise RuntimeError("Failed to create access token.") from exc