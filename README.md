# Secure Task Management API

FastAPI backend for user authentication, projects, and tasks with async SQLAlchemy, JWT auth, and clean modular structure.

## Features
1. User auth: register, login, JWT-protected routes
2. User profile: get and update current user
3. Projects: create, list, get, delete (owner-scoped)
4. Tasks: create, list, update status, delete (project-scoped)

## Tech Stack
1. FastAPI + Pydantic v2
2. SQLAlchemy 2.x (async) + asyncpg
3. Alembic migrations
4. JWT (python-jose)
5. Password hashing with bcrypt
6. Password strength via zxcvbn

## Project Structure
```
app/
  api/            # Route handlers
  database/       # DB engine/session + Alembic metadata base
  database/queries/  # DB query layer
  models/         # SQLAlchemy models
  schemas/        # Pydantic schemas
  services/       # Business logic
  utils/          # JWT + current-user dependency
alembic/          # Migrations
```

## Setup
1. Create and activate a virtual environment.
2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Environment
Create `.env` at project root:
```
DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@HOST:PORT/DB_NAME
SECRET_KEY=your_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Migrations
Run migrations before starting the API:
```bash
alembic upgrade head
```

## Run Server
```bash
uvicorn app.main:app --reload
```

Open Swagger UI:
```
http://127.0.0.1:8000/docs
```

## Auth Flow (JWT)
1. `POST /auth/register`
2. `POST /auth/login` → get `access_token`
3. Use header:
```
Authorization: Bearer <token>
```

## Endpoints

### Auth
1. `POST /auth/register`
2. `POST /auth/login`

### Users
1. `GET /users/me`
2. `PATCH /users/me`

### Projects (owner-only)
1. `POST /api/projects`
2. `GET /api/projects`
3. `GET /api/projects/{id}`
4. `DELETE /api/projects/{id}`

### Tasks (project-scoped)
1. `POST /api/projects/{project_id}/tasks`
2. `GET /api/projects/{project_id}/tasks`
3. `PATCH /api/projects/{project_id}/tasks/{task_id}`
4. `DELETE /api/projects/{project_id}/tasks/{task_id}`

## Notes
1. All protected endpoints require JWT in the Authorization header.
2. Project and task access is scoped to the current user.

