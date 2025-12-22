from pydantic import BaseModel
from datetime import date
from typing import Optional


class FoodPlanBase(BaseModel):
    paciente_id: int
    tipo_registro: str

    data_plano_alimentar: date
    nutricionista_responsavel: str

    refeicao_um: Optional[str] = None
    alimentos_um: Optional[str] = None
    substituicoes_um: Optional[str] = None

    refeicao_dois: Optional[str] = None
    alimentos_dois: Optional[str] = None
    substituicoes_dois: Optional[str] = None

    refeicao_tres: Optional[str] = None
    alimentos_tres: Optional[str] = None
    substituicoes_tres: Optional[str] = None

    refeicao_quatro: Optional[str] = None
    alimentos_quatro: Optional[str] = None
    substituicoes_quatro: Optional[str] = None

    refeicao_cinco: Optional[str] = None
    alimentos_cinco: Optional[str] = None
    substituicoes_cinco: Optional[str] = None

    refeicao_seis: Optional[str] = None
    alimentos_seis: Optional[str] = None
    substituicoes_seis: Optional[str] = None

    observacoes_plano_alimentar: Optional[str] = None


class FoodPlanCreate(FoodPlanBase):
    """Model usado para criar e editar planos alimentares."""
    pass


class FoodPlanResponse(FoodPlanBase):
    id: int

    class Config:
        from_attributes = True
