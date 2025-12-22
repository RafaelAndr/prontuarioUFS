from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    ForeignKey, 
    Text, 
    Enum as SqlEnum
)
from sqlalchemy.orm import relationship
from src.database.connection import Base
from src.database.entities.enums import (
    RecordatorioEnum
)

class Recordatory(Base):
    __tablename__ = 'recordatory'

    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("pacientes.id"))
    tipo_registro = Column(String, nullable=False)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)

    tipo_recordatorio = Column(SqlEnum(RecordatorioEnum), nullable=False)

    refeicao_um = Column(Text, nullable=True)
    alimentos_um = Column(Text, nullable=True)
    quantidade_um = Column(Text, nullable=True)

    refeicao_dois = Column(Text, nullable=True)
    alimentos_dois = Column(Text, nullable=True)
    quantidade_dois = Column(Text, nullable=True)

    refeicao_tres = Column(Text, nullable=True)
    alimentos_tres = Column(Text, nullable=True)
    quantidade_tres = Column(Text, nullable=True)

    refeicao_quatro = Column(Text, nullable=True)
    alimentos_quatro = Column(Text, nullable=True)
    quantidade_quatro = Column(Text, nullable=True)

    refeicao_cinco = Column(Text, nullable=True)
    alimentos_cinco = Column(Text, nullable=True)
    quantidade_cinco = Column(Text, nullable=True)

    refeicao_seis = Column(Text, nullable=True)
    alimentos_seis = Column(Text, nullable=True)
    quantidade_seis = Column(Text, nullable=True)

    quantidade_pessoas = Column(String, nullable=True)
    acucar = Column(String, nullable=True)
    oleo = Column(String, nullable=True)
    margarina = Column(String, nullable=True)
    sal = Column(String, nullable=True)
    temperos_prontos = Column(String, nullable=True)

    paciente = relationship("Paciente", back_populates="recordatory")
    user = relationship("User", back_populates="recordatory")

