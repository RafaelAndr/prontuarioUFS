from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.entities.workspace_entity import WorkspaceMember
from src.models.user_model import LoginRequest, LoginResponse, UserCreate, UserCreateResponse, UserResponse
from src.services.user_service import authenticate_user, create_user
from src.database.connection import get_db
from src.middleware.auth_middleware import get_current_user
from src.database.entities.users_entity import User

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

@router.get("/me", response_model=UserResponse, summary="Obtém os dados do usuário autenticado")
async def get_me(current_user: User = Depends(get_current_user)):
    """Endpoint para obter os dados do usuário autenticado."""
    return current_user


# SET DEFAULT WORKSPACE
@router.put("/default-workspace/{workspace_id}", response_model=UserResponse, summary="Define o workspace padrão do usuário")
async def set_default_workspace(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Define qual workspace sera o padrao para o usuario ao logar.
    O Frontend deve chamar isso quando o usuario clica em 'Tornar Padrao'.
    
    Args:
        workspace_id (str): ID do workspace a ser definido como padrao.
        db (Session): Sessão ativa do banco de dados.
        
    Returns:
        UserResponse: Dados atualizados do usuário.
    
    Raises:
        HTTPException: Se o usuario nao for membro do workspace.
    """
    is_member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == workspace_id
    ).first()
    
    if not is_member:
        raise HTTPException(status_code=403, detail="Usuário não é membro deste workspace")
    
    current_user.default_workspace_id = workspace_id
    db.commit()
    db.refresh(current_user)
    return current_user