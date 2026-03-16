from fastapi import FastAPI
from app.api import auth, project, task, user
app = FastAPI(title="Secure Task Management API")
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(project.router)
app.include_router(task.router)
@app.get("/")
def root():
    return {"message": "Task Manager API Running"}