from sqlalchemy.orm import Session
from fastapi import HTTPException
from src.database.entities.users_entity import User
from src.models.user_model import LoginRequest, LoginResponse, UserCreate, UserCreateResponse
from src.utils.auth_utils import hash_password, verify_password, create_jwt_token


async def authenticate_user(credentials: LoginRequest, db: Session):
    """
    Autentica um usuário com base nas credenciais fornecidas.

    Args:
        credentials (LoginRequest): Objeto contendo email e senha.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        LoginResponse: Objeto contendo o token JWT

    Raises:
        HTTPException: Se as credenciais forem inválidas.
    """
    # Busca usuário pelo email
    user = db.query(User).filter(User.email == credentials.email).first()
    
    # Valida existência e senha
    if not user or not verify_password(credentials.password, str(user.hashed_password)):
        raise HTTPException(status_code=401, detail="Credenciais inválidas ou usuário não encontrado")

    # Gera token JWT
    token = create_jwt_token({"user_id": user.id})

    return LoginResponse(token=token)

async def create_user(user_data: UserCreate, db: Session):
    """
    Cria um novo usuário no banco de dados.

    Args:
        user_data (UserCreate): Dados do usuário a ser criado.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        UserCreateResponse: Dados do usuário criado.

    Raises:
        HTTPException: Se o email já estiver em uso.
    """
    # Verifica se o email já está em uso
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email já está em uso")

    # Cria novo usuário
    new_user = User(
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
        name=user_data.name
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return UserCreateResponse.model_validate(new_user)