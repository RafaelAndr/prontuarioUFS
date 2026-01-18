from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
import uuid
import secrets
import string

from src.database.entities.workspace_entity import Workspace, WorkspaceMember, WorkspaceInvite, WorkspaceRole
from src.models.workspace_model import WorkspaceCreate, WorkspaceUpdate
from src.database.entities.users_entity import User

# --- WORKSPACE MANAGEMENT ---

def create_workspace(db: Session, user_id: str, workspace_data: WorkspaceCreate):
    """
    Cria um novo workspace e define o criador como OWNER.
    """
    new_workspace = Workspace(
        name=workspace_data.name
    )
    db.add(new_workspace)
    db.flush()

    # Adiciona o criador como OWNER
    member = WorkspaceMember(
        workspace_id=new_workspace.id,
        user_id=user_id,
        role=WorkspaceRole.OWNER
    )
    db.add(member)
    db.commit()
    db.refresh(new_workspace)
    
    new_workspace.role = WorkspaceRole.OWNER
    
    return new_workspace

def update_workspace(db: Session, user_id: str, workspace_id: str, workspace_data: WorkspaceUpdate):
    """
    Atualiza dados do workspace.
    """
    # Apenas ADMIN e OWNER podem editar
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == user_id,
        WorkspaceMember.workspace_id == workspace_id
    ).first()
    
    if not member or member.role == WorkspaceRole.MEMBER:
        raise HTTPException(status_code=403, detail="Apenas administradores podem editar a clínica.")

    workspace = db.query(Workspace).filter(Workspace.id == workspace_id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace não encontrado.")
    
    if workspace_data.name:
        workspace.name = workspace_data.name
        
    db.commit()
    db.refresh(workspace)
    
    workspace.role = member.role
    return workspace

def get_user_workspaces(db: Session, user_id: str):
    """
    Lista todos os workspaces que o usuário participa.
    """
    results = (
        db.query(Workspace, WorkspaceMember.role)
        .join(WorkspaceMember, Workspace.id == WorkspaceMember.workspace_id)
        .filter(WorkspaceMember.user_id == user_id)
        .all()
    )
    
    response = []
    for workspace, role in results:
        workspace.role = role
        response.append(workspace)
        
    return response

def get_workspace_invites(db: Session, workspace_id: str):
    """Lista todos os códigos de convite de um workspace."""
    return db.query(WorkspaceInvite).filter(WorkspaceInvite.workspace_id == workspace_id).all()

def revoke_invite(db: Session, workspace_id: str, invite_id: str):
    """Remove um código de convite."""
    invite = db.query(WorkspaceInvite).filter(
        WorkspaceInvite.id == invite_id, 
        WorkspaceInvite.workspace_id == workspace_id
    ).first()
    if invite:
        db.delete(invite)
        db.commit()
        return True
    return False

def get_workspace_members(db: Session, workspace_id: str):
    """
    Lista os membros de um workspace com informações do convite usado.
    """
    members = (
        db.query(WorkspaceMember)
        .filter(WorkspaceMember.workspace_id == workspace_id)
        .all()
    )
    
    return [
        {
            "user_id": m.user_id,
            "user_name": m.user.name,
            "user_email": m.user.email,
            "role": m.role,
            "joined_at": m.joined_at,
            "invite_code": m.invite.code if m.invite else "Criação/Direto"
        }
        for m in members
    ]

# --- INVITE SYSTEM ---
def generate_invite_code(length=8):
    """Gera um código aleatório amigável (sem caracteres confusos)"""
    alphabet = string.ascii_uppercase + string.digits

    alphabet = alphabet.replace("O", "").replace("0", "").replace("I", "").replace("1", "")
    return ''.join(secrets.choice(alphabet) for _ in range(length))

def create_invite(db: Session, user_id: str, workspace_id: str, custom_code: Optional[str] = None):
    """
    Gera um novo código de convite para o workspace.
    """
    # Verifica permissão (Só admin/owner cria convite)
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == user_id,
        WorkspaceMember.workspace_id == workspace_id
    ).first()
    
    if not member or member.role == WorkspaceRole.MEMBER:
        raise HTTPException(status_code=403, detail="Apenas administradores podem criar convites.")

    if custom_code:
        # Valida se o código customizado já existe
        if db.query(WorkspaceInvite).filter(WorkspaceInvite.code == custom_code).first():
            raise HTTPException(status_code=400, detail="Este código já está em uso.")
        code = custom_code
    else:
        code = generate_invite_code()
        # Garante unicidade do código gerado
        while db.query(WorkspaceInvite).filter(WorkspaceInvite.code == code).first():
            code = generate_invite_code()

    invite = WorkspaceInvite(
        code=code,
        workspace_id=workspace_id,
        created_by_user_id=user_id
    )
    db.add(invite)
    db.commit()
    db.refresh(invite)
    return invite

def remove_member(db: Session, requester_user_id: str, workspace_id: str, target_user_id: str):
    """
    Remove um membro do workspace.
    """
    requester = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == requester_user_id,
        WorkspaceMember.workspace_id == workspace_id
    ).first()

    if not requester:
        raise HTTPException(status_code=403, detail="Acesso negado.")


    target = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == target_user_id,
        WorkspaceMember.workspace_id == workspace_id
    ).first()

    if not target:
        raise HTTPException(status_code=404, detail="Membro não encontrado.")


    if target.role == WorkspaceRole.OWNER:
        raise HTTPException(status_code=400, detail="Não é possível remover o proprietário do workspace.")

    if requester.role == WorkspaceRole.MEMBER:
        raise HTTPException(status_code=403, detail="Apenas administradores podem remover membros.")
    

    if requester.role == WorkspaceRole.ADMIN and target.role != WorkspaceRole.MEMBER:
        raise HTTPException(status_code=403, detail="Administradores só podem remover membros comuns.")

    if target.user.default_workspace_id == workspace_id:
        target.user.default_workspace_id = None
        db.add(target.user)

    db.delete(target)
    db.commit()
    return True

def validate_invite_code(db: Session, code: str):
    """
    Verifica se o código existe e está ativo.
    """
    invite = db.query(WorkspaceInvite).filter(
        WorkspaceInvite.code == code, 
        WorkspaceInvite.is_active.is_(True)
    ).first()
    
    if not invite:
        raise HTTPException(status_code=404, detail="Código de convite inválido ou expirado.")
        
    return invite

def add_user_to_workspace_via_invite(db: Session, user_id: str, code: str):
    """
    Adiciona um usuário ao workspace usando um código.
    """
    invite = validate_invite_code(db, code)
    
    exists = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == user_id,
        WorkspaceMember.workspace_id == invite.workspace_id
    ).first()
    
    if exists:
        return exists
        
    new_member = WorkspaceMember(
        workspace_id=invite.workspace_id,
        user_id=user_id,
        role=WorkspaceRole.MEMBER,
        invite_id=invite.id
    )
    db.add(new_member)
    db.commit()
    return new_member
