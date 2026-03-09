from fastapi import FastAPI
from app.api import auth_api, project_api, task_api, user_api

app = FastAPI(title="Secure Task Management API")
app.include_router(auth_api.router)
app.include_router(user_api.router)
app.include_router(project_api.router)
app.include_router(task_api.router)

@app.get("/")
def root():
    return {"message": "Task Manager API Running"}
