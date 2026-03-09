from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from app.config import settings

class Base(DeclarativeBase):
    pass
def _build_engine():
    try:
        return create_engine(settings.DATABASE_URL)
    except ModuleNotFoundError as exc:
        raise RuntimeError(
            "Database driver is missing. Install PostgreSQL driver with "
            "`pip install psycopg2-binary`."
        ) from exc
engine = _build_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
