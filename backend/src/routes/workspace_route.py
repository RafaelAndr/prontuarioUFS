from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from src.database.connection import get_db
from src.middleware.auth_middleware import get_current_user, get_current_workspace_validation
from src.database.entities.users_entity import User
from src.services import workspace_service
from src.models import workspace_model
from src.database.entities.workspace_entity import WorkspaceMember, WorkspaceRole

router = APIRouter(prefix="/workspaces", tags=["Workspaces"])

# --- ROTAS ---

@router.post("/", response_model=workspace_model.WorkspaceResponse, summary="Cadastrar novo workspace")
def create_workspace(
    workspace_data: workspace_model.WorkspaceCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Cria um novo workspace e torna o usuario atual o dono."""
    return workspace_service.create_workspace(db, current_user.id, workspace_data)

@router.put("/{workspace_id}", response_model=workspace_model.WorkspaceResponse)
def update_workspace(
    workspace_id: str,
    workspace_data: workspace_model.WorkspaceUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Atualiza dados do workspace (Requer permissao de Admin/Owner)."""
    return workspace_service.update_workspace(db, current_user.id, workspace_id, workspace_data)

@router.get("/", response_model=List[workspace_model.WorkspaceResponse], summary="Lista todos os workspaces que o usuário participa")
def list_my_workspaces(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Lista todos os workspaces que o usuario participa."""
    return workspace_service.get_user_workspaces(db, current_user.id)

@router.post("/{workspace_id}/invites", response_model=workspace_model.InviteResponse)
def create_invite(
    workspace_id: str,
    invite_data: Optional[workspace_model.InviteCreate] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Gera um codigo de convite (Requer permissao de Admin/Owner no servico)."""
    custom_code = invite_data.code if invite_data else None
    return workspace_service.create_invite(db, current_user.id, workspace_id, custom_code)

@router.get("/{workspace_id}/invites", response_model=List[workspace_model.InviteResponse], summary="Lista códigos de convite ativos")
def list_invites(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Lista códigos de convite ativos (Apenas Admin)."""
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == workspace_id
    ).first()
    
    if not member or member.role.value == WorkspaceRole.MEMBER:
        raise HTTPException(status_code=403, detail="Acesso negado.")
        
    return workspace_service.get_workspace_invites(db, workspace_id)

@router.delete("/{workspace_id}/members/{user_id}")
def remove_member(
    workspace_id: str,
    user_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Remove um membro do workspace."""
    workspace_service.remove_member(db, current_user.id, workspace_id, user_id)
    return {"message": "Membro removido com sucesso."}

@router.post("/join", response_model=workspace_model.WorkspaceResponse, summary="Entra em um workspace via código")
def join_workspace(
    join_data: workspace_model.JoinWorkspace,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Entra em um workspace via código."""
    member = workspace_service.add_user_to_workspace_via_invite(db, current_user.id, join_data.code)
    
    # Retorna o workspace
    member.workspace.role = member.role
    return member.workspace

@router.get("/{workspace_id}/members", response_model=List[workspace_model.WorkspaceMemberResponse], summary="Lista os membros do workspace")
def list_members(
    workspace_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Lista os membros do workspace."""
    # Valida se o usuário faz parte do workspace
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == workspace_id
    ).first()
    
    if not member:
        raise HTTPException(status_code=403, detail="Acesso negado.")

    return workspace_service.get_workspace_members(db, workspace_id)

@router.delete("/{workspace_id}/invites/{invite_id}", summary="Remove um código de convite (Apenas Admin)")
def delete_invite(
    workspace_id: str,
    invite_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Remove um código de convite (Apenas Admin)."""
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == workspace_id
    ).first()
    
    if not member or member.role.value == WorkspaceRole.MEMBER:
        raise HTTPException(status_code=403, detail="Acesso negado.")
        
    workspace_service.revoke_invite(db, workspace_id, invite_id)
    return {"message": "Convite removido."}
