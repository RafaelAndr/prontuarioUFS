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
from src.database.connection import Base

class FoodPlan(Base):
    __tablename__ = 'food_plans'

    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("pacientes.id"))
    tipo_registro = Column(String, nullable=False)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    workspace_id = Column(String(36), ForeignKey("workspaces.id"), nullable=False)

    data_plano_alimentar = Column(Date, nullable=False)
    nutricionista_responsavel = Column(String, nullable=False)

    refeicao_um = Column(Text, nullable=True)
    alimentos_um = Column(Text, nullable=True)
    substituicoes_um = Column(Text, nullable=True)

    refeicao_dois = Column(Text, nullable=True)
    alimentos_dois = Column(Text, nullable=True)
    substituicoes_dois = Column(Text, nullable=True)

    refeicao_tres = Column(Text, nullable=True)
    alimentos_tres = Column(Text, nullable=True)
    substituicoes_tres = Column(Text, nullable=True)

    refeicao_quatro = Column(Text, nullable=True)
    alimentos_quatro = Column(Text, nullable=True)
    substituicoes_quatro = Column(Text, nullable=True)

    refeicao_cinco = Column(Text, nullable=True)
    alimentos_cinco = Column(Text, nullable=True)
    substituicoes_cinco = Column(Text, nullable=True)

    refeicao_seis = Column(Text, nullable=True)
    alimentos_seis = Column(Text, nullable=True)
    substituicoes_seis = Column(Text, nullable=True)

    observacoes_plano_alimentar = Column(Text, nullable=True)

    paciente = relationship("Paciente", back_populates="food_plans")
    user = relationship("User", back_populates="food_plans")
    workspace = relationship("Workspace", back_populates="food_plans")

