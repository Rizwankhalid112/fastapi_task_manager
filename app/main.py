from fastapi import FastAPI
from app.routes import auth_routes

app = FastAPI(title="Secure Task Management API")

# Include the authentication routes
app.include_router(auth_routes.router)

@app.get("/")
def root():
    return {"message": "Task Manager API Running"}