from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from src.database.entities.workspace_entity import WorkspaceRole

# --- WORKSPACE ---

class WorkspaceBase(BaseModel):
    name: str

class WorkspaceCreate(WorkspaceBase):
    pass

class WorkspaceUpdate(WorkspaceBase):
    name: Optional[str] = None

class WorkspaceResponse(WorkspaceBase):
    id: str
    created_at: datetime
    role: WorkspaceRole

    class Config:
        from_attributes = True

# --- MEMBERS ---

class WorkspaceMemberResponse(BaseModel):
    user_id: str
    user_name: Optional[str]
    user_email: str
    role: WorkspaceRole
    joined_at: datetime
    invite_code: Optional[str]

    class Config:
        from_attributes = True

class InviteResponse(BaseModel):
    id: str
    code: str
    workspace_id: str
    created_at: datetime
    is_active: bool

class InviteCreate(BaseModel):
    code: Optional[str] = None

class JoinWorkspace(BaseModel):
    code: str
