from __future__ import annotations
import os
from dataclasses import dataclass
from pathlib import Path

def _load_dotenv(dotenv_path: Path) -> None:
    if not dotenv_path.exists():
        return
    for raw_line in dotenv_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip("'").strip('"')
        os.environ.setdefault(key, value)

@dataclass(frozen=True)
class Settings:
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    @classmethod
    def from_env(cls) -> "Settings":
        root_dir = Path(__file__).resolve().parents[1]
        _load_dotenv(root_dir / ".env")
        database_url = os.getenv("DATABASE_URL")
        secret_key = os.getenv("SECRET_KEY")
        algorithm = os.getenv("ALGORITHM", "HS256")
        token_expire = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
        missing = [
            name
            for name, value in {
                "DATABASE_URL": database_url,
                "SECRET_KEY": secret_key,
            }.items()
            if not value
        ]
        if missing:
            raise ValueError(
                f"Missing required environment variable(s): {', '.join(missing)}"
            )
        return cls(
            DATABASE_URL=database_url,
            SECRET_KEY=secret_key,
            ALGORITHM=algorithm,
            ACCESS_TOKEN_EXPIRE_MINUTES=token_expire,
        )
settings = Settings.from_env()
