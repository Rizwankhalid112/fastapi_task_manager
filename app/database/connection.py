from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase
from app.config import settings

class Base(DeclarativeBase):
    pass

def _build_engine():
    try:
        database_url = settings.DATABASE_URL
        if database_url.startswith("postgresql://"):
            database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
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
