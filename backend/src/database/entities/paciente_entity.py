from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    ForeignKey, 
    Boolean, 
    Date, 
    Text, 
    Enum as SqlEnum
)
from sqlalchemy.orm import relationship
from src.database.entities.mixins import TimestampMixin
from src.database.connection import Base
from src.database.entities.enums import (
    RitmoIntestinal, 
    RitmoUrinario,
    SonoEnum,
    SatisfacaoAlimentarEnum,
    GrauImcEnum

)

class Paciente(Base, TimestampMixin):
    __tablename__ = "pacientes"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    data_nascimento = Column(Date)
    telefone = Column(String)
    endereco = Column(String)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    workspace_id = Column(String(36), ForeignKey("workspaces.id"), nullable=False)

    base_anamneses = relationship("BaseAnamnese", back_populates="paciente", cascade="all, delete")
    child_anamneses = relationship("ChildAnamnese", back_populates="paciente", cascade="all, delete")
    return_anamneses = relationship("ReturnAnamnese", back_populates="paciente", cascade="all, delete")
    food_plans = relationship("FoodPlan", back_populates="paciente", cascade="all, delete")
    recordatory = relationship("Recordatory", back_populates="paciente", cascade="all, delete")
    user = relationship("User", back_populates="pacientes")
    workspace = relationship("Workspace", back_populates="pacientes")

