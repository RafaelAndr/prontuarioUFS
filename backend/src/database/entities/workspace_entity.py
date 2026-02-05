from sqlalchemy import Column, String, ForeignKey, DateTime, Boolean, Enum
from sqlalchemy.orm import relationship, Mapped, mapped_column
from src.database.entities.mixins import TimestampMixin
from src.database.connection import Base
import uuid
from datetime import datetime
import enum

class WorkspaceRole(str, enum.Enum):
    OWNER = "OWNER"
    ADMIN = "ADMIN"
    MEMBER = "MEMBER"

class Workspace(Base, TimestampMixin):
    __tablename__ = 'workspaces'

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    
    # Relacionamentos
    members = relationship("WorkspaceMember", back_populates="workspace", cascade="all, delete-orphan")
    invites = relationship("WorkspaceInvite", back_populates="workspace", cascade="all, delete-orphan")
    base_anamneses = relationship("BaseAnamnese", back_populates="workspace")
    child_anamneses = relationship("ChildAnamnese", back_populates="workspace")
    return_anamneses = relationship("ReturnAnamnese", back_populates="workspace")
    food_plans = relationship("FoodPlan", back_populates="workspace")
    recordatory = relationship("Recordatory", back_populates="workspace")
    
    # Dados do workspace
    pacientes = relationship("Paciente", back_populates="workspace")
    

class WorkspaceMember(Base, TimestampMixin):
    __tablename__ = 'workspace_members'

    workspace_id: Mapped[str] = mapped_column(String(36), ForeignKey('workspaces.id'), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey('users.id'), primary_key=True)
    
    role = Column(Enum(WorkspaceRole), default=WorkspaceRole.MEMBER, nullable=False)
    joined_at = Column(DateTime, default=datetime.utcnow)
    
    invite_id = Column(String(36), ForeignKey('workspace_invites.id'), nullable=True)

    # Relacionamentos
    workspace = relationship("Workspace", back_populates="members")
    user = relationship("User", back_populates="workspaces")
    invite = relationship("WorkspaceInvite")

class WorkspaceInvite(Base, TimestampMixin):
    __tablename__ = 'workspace_invites'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    code = Column(String, unique=True, index=True, nullable=False)
    workspace_id: Mapped[str] = mapped_column(String(36), ForeignKey('workspaces.id'), nullable=False)
    created_by_user_id: Mapped[str] = mapped_column(String(36), ForeignKey('users.id'), nullable=False)
    
    is_active = Column(Boolean, default=True)

    workspace = relationship("Workspace", back_populates="invites")
    created_by = relationship("User")
