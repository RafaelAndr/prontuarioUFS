from pydantic import BaseModel
from typing import Optional
from src.database.entities.enums import RecordatorioEnum

class RecordatoryBase(BaseModel):
    paciente_id: int
    tipo_registro: str
    tipo_recordatorio: RecordatorioEnum

    refeicao_um: Optional[str] = None
    alimentos_um: Optional[str] = None
    quantidade_um: Optional[str] = None

    refeicao_dois: Optional[str] = None
    alimentos_dois: Optional[str] = None
    quantidade_dois: Optional[str] = None

    refeicao_tres: Optional[str] = None
    alimentos_tres: Optional[str] = None
    quantidade_tres: Optional[str] = None

    refeicao_quatro: Optional[str] = None
    alimentos_quatro: Optional[str] = None
    quantidade_quatro: Optional[str] = None

    refeicao_cinco: Optional[str] = None
    alimentos_cinco: Optional[str] = None
    quantidade_cinco: Optional[str] = None

    refeicao_seis: Optional[str] = None
    alimentos_seis: Optional[str] = None
    quantidade_seis: Optional[str] = None

    quantidade_pessoas: Optional[str] = None
    acucar: Optional[str] = None
    oleo: Optional[str] = None
    margarina: Optional[str] = None
    sal: Optional[str] = None
    temperos_prontos: Optional[str] = None
    outros: Optional[str] = None


class RecordatoryCreate(RecordatoryBase):
    pass


class RecordatoryResponse(RecordatoryBase):
    id: int

    class Config:
        from_attributes = True  # compatível com FastAPI + SQLAlchemy
