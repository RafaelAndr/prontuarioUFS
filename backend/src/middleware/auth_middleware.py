"""
Middleware de autenticação para rotas protegidas.
Contém dependências do FastAPI para validação de tokens JWT.
"""
from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends, Header, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from src.database.entities.users_entity import User
from src.database.entities.workspace_entity import WorkspaceMember
from src.database.connection import get_db
from src.utils.auth_utils import decode_jwt_token
from typing import Optional

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """
    Extrai o usuário autenticado do token JWT.
    Use como dependência em rotas protegidas:
    
    @router.get("/protected")
    async def protected_route(current_user: User = Depends(get_current_user)):
        return {"user_id": current_user.id}

    Args:
        credentials: Credenciais HTTP Bearer extraídas do header Authorization.
        db: Sessão do banco de dados.

    Returns:
        User: Usuário autenticado.

    Raises:
        HTTPException: Se o token for inválido ou usuário não existir.
    """
    token = credentials.credentials
    
    # Decodifica o token e extrai user_id
    payload = decode_jwt_token(token)
    user_id = payload.get("user_id")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Token inválido: user_id não encontrado")
    
    # Busca usuário no banco
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")
    
    return user

async def get_current_workspace_validation(
    x_workspace_id: Optional[str] = Header(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Dependencia critica de seguranca.
    Verifica se o usuario faz parte do workspace passado no Header.
    Retorna o workspace_id se valido, ou levanta 403.
    """
    if not x_workspace_id:
        # Se nao passou header, em rotas que exigem, eh erro.
        return None
    
    # Verifica membro
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == x_workspace_id
    ).first()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado. Voce nao participa deste workspace."
        )
    
    return x_workspace_id
