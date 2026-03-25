from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase
from app.config import settings

class Base(DeclarativeBase):
    pass

def _normalize_asyncpg_url(url: str) -> str:
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    url = url.replace("sslmode=require", "ssl=require")
    url = url.replace("&channel_binding=require", "").replace("?channel_binding=require", "")
    return url


def _build_engine():
    try:
        database_url = _normalize_asyncpg_url(settings.DATABASE_URL)
        return create_async_engine(
            database_url,
            echo=False,
            pool_pre_ping=True,
        )
    except ModuleNotFoundError as exc:
        raise RuntimeError(
            "Database driver is missing. Install async PostgreSQL driver with "
            "`pip install asyncpg`."
        ) from exc
engine = _build_engine()
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
