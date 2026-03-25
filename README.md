# Secure Task Management

Full-stack task manager with FastAPI backend and Next.js frontend.

## Project Structure

```
fastapi_task_manager/
├── docker-compose.yml
├── docker-compose.prod.yml
├── backend/          # FastAPI API, migrations, tests
│   ├── app/
│   ├── alembic/
│   ├── tests/
│   ├── Dockerfile
│   ├── Dockerfile.prod
│   ├── .dockerignore
│   ├── alembic.ini
│   ├── requirements.txt
│   ├── requirements-dev.txt
│   └── pytest.ini
└── frontend/         # Next.js app
    ├── Dockerfile
    ├── Dockerfile.prod
    └── .dockerignore
```

## Docker (recommended)

Run the full stack with PostgreSQL, backend, and frontend. No local Python or Node setup required.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Quick start

```bash
docker compose up --build
```

First run takes a few minutes to build images. The **backend container runs `alembic upgrade head` on startup**, so you usually do not need a separate migration step.

To run migrations manually (e.g. after pulling new migration files):

```bash
docker compose exec backend alembic upgrade head
```

**Access the app:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API docs: http://localhost:8000/docs

### Services

| Service  | Port | Description                    |
|----------|------|--------------------------------|
| frontend | 3000 | Next.js app                    |
| backend  | 8000 | FastAPI API                    |
| db       | 5432 | PostgreSQL 15 (internal only) |

Default credentials: `rizwan` / `secret123`, database `taskflow`. Override `BACKEND_SECRET_KEY` via environment if needed.

### Production-style compose (optional)

No bind mounts, backend without `--reload`, Next.js `next start`:

```bash
docker compose -f docker-compose.prod.yml up --build
```

Uses separate container names and a separate Postgres volume (`postgres_data_prod`). Do not run this at the same time as dev compose on the same ports (3000, 8000, 5432).

### Useful commands

| Command | Description |
|---------|-------------|
| `docker compose up -d` | Start in background |
| `docker compose down` | Stop all containers |
| `docker compose down -v` | Stop and remove database volume |
| `docker compose logs backend` | View backend logs |
| `docker compose exec backend bash` | Shell into backend container |
| `docker compose exec backend pytest` | Run backend tests |
| `docker compose up --build backend` | Rebuild backend after `requirements.txt` changes |

### Inspecting the database (Docker vs local Postgres)

The stack stores data in **PostgreSQL inside the `db` container** (persisted in the `postgres_data` volume). The app is configured to use:

| Setting | Value |
|---------|--------|
| Host (from your machine) | `localhost` |
| Port | `5432` (published from the container) |
| Database | `taskflow` |
| User | `rizwan` |

Example:

```bash
psql -h localhost -p 5432 -U rizwan -d taskflow
```

Or without a local `psql` client:

```bash
docker compose exec db psql -U rizwan -d taskflow -c "SELECT id, email FROM users;"
```

If you also run a **separate** Postgres on the host (e.g. on port `5433`), that is a different server; rows created by this app will not appear there unless you point `DATABASE_URL` at that instance.

### Troubleshooting

- **Port 5432 already in use:** Stop local PostgreSQL (`sudo systemctl stop postgresql`) or map the container to another host port. In `docker-compose.yml` under `db.ports`, use something like `"5433:5432"` so the host uses **5433** while the container still uses 5432 internally. If you change the host port, connect with `psql -h localhost -p 5433 ...` and set `DATABASE_URL` from the host to `...@localhost:5433/...` when running the backend outside Docker.
- **Port 8000 or 3000 in use:** Stop any local FastAPI or Next.js processes.
- **Changes not reflecting:** Code changes apply via volume mounts. Rebuild after changing `requirements.txt` or `package.json`: `docker compose up --build backend` or `docker compose up --build frontend`.

### Production / deployment notes

- **Secrets:** Set `BACKEND_SECRET_KEY` (and database passwords) via your environment or secrets manager; do not commit real credentials.
- **Database:** Avoid publishing Postgres to the public internet; restrict access to the application network.
- **CORS:** Configure `CORS_ORIGINS` (comma-separated) to match your real frontend origin(s).
- **Docker images:** For a production-style local run (no bind mounts, `next start`, no `--reload`), use `docker compose -f docker-compose.prod.yml up --build`. Default `docker compose up` remains the dev setup with hot reload.

## Backend (FastAPI)

### Setup

1. Create and activate a virtual environment.
2. Install dependencies (include test tools):

```bash
cd backend
pip install -r requirements-dev.txt
```

Runtime-only install (e.g. slim venv): `pip install -r requirements.txt`

3. Create environment files in the `backend/` folder (they are not in git):

```bash
cd backend
cp .env.example .env
cp .env.example .env.test
```

Edit `backend/.env` and `backend/.env.test` with your credentials. Both use the same format; use a separate test database for `.env.test`:

```
DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@HOST:PORT/DB_NAME
SECRET_KEY=your_secret_at_least_32_characters_long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Migrations

```bash
cd backend
alembic upgrade head
```

### Run Server

```bash
cd backend
uvicorn app.main:app --reload
```

API docs: http://127.0.0.1:8000/docs

### Run Tests

Requires `pip install -r requirements-dev.txt` and a configured `backend/.env.test`.

```bash
cd backend
pytest
```

## Frontend (Next.js)

### Setup

```bash
cd frontend
npm install
```

### Environment (optional)

Create `frontend/.env.local` to override the API URL:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Default is `http://127.0.0.1:8000`. Run the backend before using the app.

### Run Dev Server

```bash
cd frontend
npm run dev
```

Open http://localhost:3000

## Features

- **Auth:** Register, login, JWT-protected routes
- **Profile:** Get and update current user
- **Projects:** Create, list, get, delete (owner-scoped)
- **Tasks:** Create, list, update status, delete (project-scoped)
