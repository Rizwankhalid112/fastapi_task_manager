# Secure Task Management

Full-stack task manager with FastAPI backend and Next.js frontend.

## Project Structure

```
fastapi_task_manager/
├── docker-compose.yml
├── backend/          # FastAPI API, migrations, tests
│   ├── app/
│   ├── alembic/
│   ├── tests/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── alembic.ini
│   ├── requirements.txt
│   └── pytest.ini
└── frontend/         # Next.js app
    ├── Dockerfile
    └── .dockerignore
```

## Docker (recommended)

Run the full stack with PostgreSQL, backend, and frontend:

```bash
docker compose up --build
```

First run takes a few minutes to build. Then:

1. **Run migrations** (in a second terminal while containers are running):

```bash
docker compose exec backend alembic upgrade head
```

2. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API docs: http://localhost:8000/docs

### Useful commands

| Command | Description |
|---------|-------------|
| `docker compose up -d` | Start in background |
| `docker compose down` | Stop all containers |
| `docker compose down -v` | Stop and remove database volume |
| `docker compose logs backend` | View backend logs |
| `docker compose exec backend bash` | Shell into backend container |

## Backend (FastAPI)

### Setup

1. Create and activate a virtual environment.
2. Install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

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
