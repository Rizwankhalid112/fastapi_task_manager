from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

engine = None
engine_init_error = None
SessionLocal = sessionmaker(autocommit=False, autoflush=False)
Base = declarative_base()

def get_engine():
    global engine, engine_init_error
    if engine is not None:
        return engine
    if engine_init_error is not None:
        raise engine_init_error
    try:
        engine = create_engine(settings.DATABASE_URL)
        return engine
    except ModuleNotFoundError as exc:
        engine_init_error = RuntimeError(
            "Database driver is missing. Install PostgreSQL driver with "
            "`pip install psycopg2-binary`."
        )
        raise engine_init_error from exc

def get_db():
    db = SessionLocal(bind=get_engine())
    try:
        yield db
    finally:
        db.close()
