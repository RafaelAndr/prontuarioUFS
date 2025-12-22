from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.models.user_model import LoginRequest, LoginResponse, UserCreate, UserCreateResponse
from src.services.user_service import authenticate_user, create_user
from src.database.connection import get_db

router = APIRouter(prefix="/auth", tags=["Auth"])

# LOGIN
@router.post("/login", response_model=LoginResponse)
async def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    """
    Endpoint de autenticação de usuários.

    Args:
        credentials (LoginRequest): Objeto contendo email e senha.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        LoginResponse: Objeto contendo o token JWT
    """
    return await authenticate_user(credentials, db)


# REGISTER
@router.post("/register", response_model=UserCreateResponse)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Endpoint para registro de novos usuários.

    Args:
        user_data (UserCreateResponse): Dados do usuário a ser criado.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        UserCreateResponse: Dados do usuário criado.
    """
    return await create_user(user_data, db)