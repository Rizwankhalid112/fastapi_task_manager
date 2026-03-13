import asyncio
import os
from urllib.parse import urlparse
import asyncpg
import pytest
import pytest_asyncio
from alembic import command
from alembic.config import Config
from dotenv import load_dotenv
from httpx import ASGITransport, AsyncClient
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.pool import NullPool
load_dotenv(".env.test", override=True)
from app.database.base import Base
from app.database.connection import get_db
from app.main import app
from app.models.project import Project
from app.models.task import Task
from app.models.user import User
from app.utils.jwt_handler import create_access_token
from app.utils.password_handler import PasswordHandler
from tests.factories import DEFAULT_PASSWORD

def _sync_database_url() -> str:
    database_url = os.environ["DATABASE_URL"]
    return database_url.replace("postgresql+asyncpg://", "postgresql://", 1)

def _async_database_url() -> str:
    database_url = os.environ["DATABASE_URL"]
    if database_url.startswith("postgresql://"):
        return database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    return database_url

async def _ensure_database_exists() -> None:
    parsed = urlparse(_sync_database_url())
    db_name = parsed.path.lstrip("/")
    admin_db = "postgres"
    conn = await asyncpg.connect(
        user=parsed.username,
        password=parsed.password,
        host=parsed.hostname,
        port=parsed.port or 5432,
        database=admin_db,
    )
    try:
        exists = await conn.fetchval(
            "SELECT 1 FROM pg_database WHERE datname = $1", db_name
        )
        if not exists:
            await conn.execute(f'CREATE DATABASE "{db_name}"')
    finally:
        await conn.close()
async def _reset_schema(async_engine) -> None:
    async with async_engine.begin() as conn:
        await conn.execute(text("DROP SCHEMA IF EXISTS public CASCADE"))
        await conn.execute(text("CREATE SCHEMA public"))

def _run_alembic_upgrade() -> None:
    config = Config("alembic.ini")
    config.set_main_option("sqlalchemy.url", _sync_database_url())
    command.upgrade(config, "head")

async def _ensure_schema(async_engine, mode: str) -> None:
    await _reset_schema(async_engine)
    if mode == "alembic":
        await asyncio.to_thread(_run_alembic_upgrade)
    elif mode == "create_all":
        async with async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    else:
        raise ValueError(f"Unknown schema mode: {mode}")

async def _truncate_tables(async_engine) -> None:
    table_names = [f'"{table.name}"' for table in Base.metadata.tables.values()]
    if not table_names:
        return
    truncate_stmt = f"TRUNCATE TABLE {', '.join(table_names)} RESTART IDENTITY CASCADE"
    async with async_engine.begin() as conn:
        await conn.execute(text(truncate_stmt))

@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"

@pytest_asyncio.fixture
async def async_engine():
    await _ensure_database_exists()
    engine = create_async_engine(
        _async_database_url(),
        pool_pre_ping=True,
        poolclass=NullPool,
    )
    try:
        yield engine
    finally:
        await engine.dispose()

@pytest_asyncio.fixture
async def async_session_maker(async_engine):
    return async_sessionmaker(
        async_engine,
        class_=AsyncSession,
        autocommit=False,
        autoflush=False,
        expire_on_commit=False,
    )

@pytest_asyncio.fixture(autouse=True)
async def schema_setup(request, async_engine):
    marker = (
        request.node.get_closest_marker("integration")
        or request.node.get_closest_marker("e2e")
        or request.node.get_closest_marker("api")
        or request.node.get_closest_marker("unit")
    )
    if not marker:
        yield
        return
    mode = "alembic" if marker.name in {"integration", "e2e"} else "create_all"
    await _ensure_schema(async_engine, mode)
    yield

@pytest_asyncio.fixture(autouse=True)
async def truncate_db(request, async_engine):
    marker = (
        request.node.get_closest_marker("integration")
        or request.node.get_closest_marker("e2e")
        or request.node.get_closest_marker("api")
        or request.node.get_closest_marker("unit")
    )
    yield
    if marker:
        await _truncate_tables(async_engine)

@pytest_asyncio.fixture
async def db_session(async_session_maker):
    async with async_session_maker() as session:
        yield session

@pytest_asyncio.fixture
async def client(db_session):
    async def _override_get_db():
        yield db_session
    app.dependency_overrides[get_db] = _override_get_db
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as http_client:
        yield http_client
    app.dependency_overrides.clear()

@pytest_asyncio.fixture
async def user(db_session):
    user = User(
        full_name="Test User",
        email="test.user@example.com",
        hashed_password=PasswordHandler.hash_password(DEFAULT_PASSWORD),
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user

@pytest_asyncio.fixture
async def second_user(db_session):
    user = User(
        full_name="Second User",
        email="second.user@example.com",
        hashed_password=PasswordHandler.hash_password(DEFAULT_PASSWORD),
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user

@pytest_asyncio.fixture
async def auth_headers(user):
    token = create_access_token(user.id)
    return {"Authorization": f"Bearer {token}"}

@pytest_asyncio.fixture
async def user_project(db_session, user):
    project = Project(name="User Project", description="User project", owner_id=user.id)
    db_session.add(project)
    await db_session.commit()
    await db_session.refresh(project)
    return project

@pytest_asyncio.fixture
async def second_user_project(db_session, second_user):
    project = Project(
        name="Second User Project",
        description="Second user project",
        owner_id=second_user.id,
    )
    db_session.add(project)
    await db_session.commit()
    await db_session.refresh(project)
    return project

@pytest_asyncio.fixture
async def project_task(db_session, user_project):
    task = Task(
        title="Project Task",
        description="Task description",
        status="todo",
        project_id=user_project.id,
    )
    db_session.add(task)
    await db_session.commit()
    await db_session.refresh(task)
    return task

@pytest.fixture
def strong_password():
    return "Str0ngPass!2026"

@pytest.fixture
def register_payload(strong_password):
    return {
        "full_name": "Test User",
        "email": "test.user@example.com",
        "password": strong_password,
    }

@pytest.fixture
def duplicate_register_payload(strong_password):
    return {
        "full_name": "Duplicate User",
        "email": "test.user@example.com",
        "password": strong_password,
    }

@pytest.fixture
def invalid_register_payload(request, strong_password):
    payloads = {
        "invalid_email": {
            "full_name": "Test User",
            "email": "not-an-email",
            "password": strong_password,
        },
        "weak_password": {
            "full_name": "Test User",
            "email": "weak.password@example.com",
            "password": "password123",
        },
        "invalid_full_name": {
            "full_name": "John 123",
            "email": "john.123@example.com",
            "password": strong_password,
        },
        "password_with_space": {
            "full_name": "Test User",
            "email": "space.password@example.com",
            "password": "Strong Pass123!",
        },
    }
    return payloads[request.param]

@pytest.fixture
def login_form():
    return {"username": "test.user@example.com", "password": DEFAULT_PASSWORD}

@pytest.fixture
def invalid_login_form(request):
    payloads = {
        "missing_password": {"username": "user@example.com"},
        "missing_username": {"password": DEFAULT_PASSWORD},
    }
    return payloads[request.param]

@pytest.fixture
def wrong_password_form():
    return {"username": "test.user@example.com", "password": f"{DEFAULT_PASSWORD}x"}

@pytest.fixture
def unknown_user_form():
    return {"username": "missing@example.com", "password": DEFAULT_PASSWORD}

@pytest.fixture
def project_payload():
    return {"name": "Alpha Project", "description": "First project"}

@pytest.fixture
def invalid_project_payload(request):
    payloads = {
        "empty_name": {"name": "", "description": "Desc"},
        "too_long_name": {"name": "A" * 121, "description": "Desc"},
    }
    return payloads[request.param]

@pytest.fixture
def task_payload():
    return {"title": "Initial task", "description": "Task description"}

@pytest.fixture
def invalid_task_payload(request):
    payloads = {
        "empty_title": {"title": "", "description": "Desc"},
        "too_long_title": {"title": "T" * 201, "description": "Desc"},
    }
    return payloads[request.param]

@pytest.fixture
def task_status_payload():
    return {"status": "done"}

@pytest.fixture
def invalid_task_status_payload(request):
    payloads = {"invalid_status": {"status": "blocked"}}
    return payloads[request.param]

@pytest.fixture
def update_profile_payload():
    return {"full_name": "Updated User"}

@pytest.fixture
def invalid_update_profile_payload(request):
    payloads = {
        "invalid_email": {"email": "not-an-email"},
        "weak_password": {"password": "password123"},
        "invalid_full_name": {"full_name": "Nope 123"},
        "password_with_space": {"password": "Bad Pass123"},
    }
    return payloads[request.param]

@pytest.fixture
def duplicate_update_email_payload():
    return {"email": "second.user@example.com"}
