from pydantic import BaseModel
from datetime import date
from typing import Optional

from src.database.entities.enums import (
    RitmoIntestinal, 
    RitmoUrinario,
    SonoEnum,
    SatisfacaoAlimentarEnum,
    GrauImcEnum
)


class ReturnAnamneseCreate(BaseModel):
    paciente_id: int
    tipo_registro: str

    data_consulta: date
    numero_prontuario: Optional[str] = None
    nutricionista_responsavel: str

    # Dados clínicos iniciais
    diagnostico_clinico: Optional[str] = None
    queixa_principal: Optional[str] = None
    medicacoes_uso: Optional[str] = None
    ritmo_intestinal: Optional[RitmoIntestinal] = None
    frequencia_ritmo_intestinal: Optional[str] = None
    consistencia_ritmo_intestinal: Optional[str] = None
    ritmo_urinario: Optional[RitmoUrinario] = None
    ingestao_hidrica: Optional[str] = None
    disfagia: Optional[bool] = None
    odinofagia: Optional[bool] = None
    dispepsia: Optional[bool] = None
    nauseas: Optional[bool] = None
    vomitos: Optional[bool] = None
    flatulencia: Optional[bool] = None
    cefaleia: Optional[str] = None
    sono: Optional[SonoEnum] = None
    horario_dorme: Optional[str] = None
    horario_acorda: Optional[str] = None
    outros_dados_clinicos: Optional[str] = None

    # Evolução / Retorno
    dificuldades_plano_anterior: Optional[str] = None
    falta_dieta: Optional[str] = None
    rotina_exercicios: Optional[str] = None
    modificacao_exames: Optional[str] = None
    alimentacao_fds: Optional[str] = None
    nivel_estresse: Optional[str] = None
    melhorou_mudancas: Optional[str] = None
    precisa_melhorar: Optional[str] = None
    como_se_sente: Optional[str] = None
    satisfacao_plano: Optional[SatisfacaoAlimentarEnum] = None

    # Exame físico
    cabelo: Optional[str] = None
    mucosas: Optional[str] = None
    denticao: Optional[str] = None
    labios: Optional[str] = None
    lingua: Optional[str] = None
    gengiva: Optional[str] = None
    pele: Optional[str] = None
    unhas: Optional[str] = None
    abdomen: Optional[str] = None
    edema: Optional[str] = None

    # Antropometria
    peso: Optional[str] = None
    altura: Optional[str] = None
    imc_i: Optional[str] = None
    e_i: Optional[str] = None
    circunferencia_cabeca: Optional[str] = None
    circunferencia_coxa: Optional[str] = None
    pct: Optional[str] = None
    circunferencia_braco: Optional[str] = None
    imc: Optional[str] = None
    grau_imc: Optional[GrauImcEnum] = None

    # Avaliação bioquímica
    data_eb: Optional[date] = None
    vitamina_a: Optional[str] = None
    vitamina_bdoze: Optional[str] = None
    fosfatase_prostatica: Optional[str] = None
    vitamina_d: Optional[str] = None


class ReturnAnamneseResponse(ReturnAnamneseCreate):
    id: int

    class Config:
        from_attributes = True
