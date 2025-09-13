from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager

from .routers import router_admin

from .database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    title="Netmiral API",
    description="API for Netmiral network device management tool",
    lifespan=lifespan,
)

# TODO: Restrict origins in production
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_admin.router)

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to Netmiral API"}