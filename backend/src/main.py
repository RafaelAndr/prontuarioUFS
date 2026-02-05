from dotenv import load_dotenv
load_dotenv()   # <-- tem que ser a primeira coisa

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import (
    paciente_route,
    base_anamnese_route,
    child_anamnese_route,
    return_anamnese_route,
    food_plan_route,
    recordatory_route,
    user_route,
    workspace_route
)

from src.database.connection import Base, engine

import src.database.entities 

# Cria o app principal
app = FastAPI(title="API Prontuário")

# 🔹 Habilita CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Pode restringir depois, ex: ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria as tabelas automaticamente (caso não existam)
# Base.metadata.create_all(bind=engine)

# Inclui as rotas
app.include_router(user_route.router)
app.include_router(paciente_route.router)
app.include_router(base_anamnese_route.router)
app.include_router(child_anamnese_route.router)
app.include_router(return_anamnese_route.router)
app.include_router(food_plan_route.router)
app.include_router(recordatory_route.router)
app.include_router(workspace_route.router)