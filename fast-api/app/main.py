from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager

from . import constants
from .routers import router_device, router_admin
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=constants.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_admin.router)
app.include_router(router_device.router)

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to Netmiral API"}