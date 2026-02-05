from pydantic import BaseModel
from datetime import date
from typing import Optional

from src.database.entities.enums import (
    DenticaoChildEnum, 
    MastigacaoEnum, 
    RitmoIntestinal, 
    RitmoUrinario,
    ApetiteEnum 
)

class ChildAnamneseCreate(BaseModel):
    paciente_id: int
    tipo_registro: str

    # Dados iniciais
    data_consulta: date
    numero_prontuario: Optional[str] = None
    nutricionista_responsavel: str

    # Dados Socio-Econômicos
    escolar: Optional[bool] = None
    serie_escolar: Optional[str] = None
    turno_escolar: Optional[str] = None
    adaptacao_escolar: Optional[bool] = None
    merenda_escolar: Optional[bool] = None
    ocupacao_responsavel: Optional[str] = None
    pai_mae: Optional[bool] = None
    conjuge: Optional[bool] = None
    filho: Optional[bool] = None
    irmao: Optional[bool] = None
    netos: Optional[bool] = None
    sobrinho: Optional[bool] = None
    cunhado: Optional[bool] = None
    so: Optional[bool] = None
    amigos: Optional[bool] = None
    outros_da_familia: Optional[str] = None
    renda_pessoal: Optional[str] = None
    gastos_alimentacao: Optional[str] = None
    faz_atividade_fisica: Optional[bool] = None
    qual_atividade_fisica: Optional[str] = None
    frequencia_atividade_fisica: Optional[str] = None
    ja_fez_atividade_fisica: Optional[bool] = None
    tempo_parado_atividade_fisica: Optional[str] = None
    crianca_ativa: Optional[str] = None
    horario_dorme: Optional[str] = None
    horario_acorda: Optional[str] = None

    # Dados de Saúde
    objetivo_consulta: Optional[str] = None
    historia_doenca: Optional[str] = None
    historia_gestacao: Optional[str] = None
    diabetes_hma: Optional[bool] = None
    diabetes_hf: Optional[bool] = None 
    hipertencao_hma: Optional[bool] = None
    hipertencao_hf: Optional[bool] = None
    doenca_cardiovascular_hma: Optional[bool] = None
    doenca_cardiovascular_hf: Optional[bool] = None
    dislipidemia_hma: Optional[bool] = None
    dislipidemia_hf: Optional[bool] = None
    cancer_hma: Optional[bool] = None
    cancer_hf: Optional[bool] = None
    osteoporose_hma: Optional[bool] = None
    osteoporose_hf: Optional[bool] = None
    depressao_hma: Optional[bool] = None
    depressao_hf: Optional[bool] = None
    parasitoses_hma: Optional[bool] = None
    parasitoses_hf: Optional[bool] = None
    drge_hma: Optional[bool] = None
    drge_hf: Optional[bool] = None
    outras_patologias: Optional[str] = None
    faz_uso_medicamentos: Optional[bool] = None
    medicamentos: Optional[str] = None

    # Avaliação antropométrica
    peso_atual: Optional[str] = None
    peso_ao_nascer: Optional[str] = None
    comprimento_ao_nascer: Optional[str] = None
    altura: Optional[str] = None
    e_i: Optional[str] = None
    p_i: Optional[str] = None
    peso_para_comprimento: Optional[str] = None
    diagnostico_antropometrico: Optional[str] = None

    # Dados e sintomas clínicos
    denticao: Optional[DenticaoChildEnum] = None
    mastigacao: Optional[MastigacaoEnum] = None
    disfagia: Optional[bool] = None
    odinofagia: Optional[bool] = None
    dispepsia: Optional[bool] = None
    nauseas: Optional[bool] = None
    vomitos: Optional[bool] = None
    ritmo_intestinal: Optional[RitmoIntestinal] = None
    escala_bristol: Optional[str] = None
    ritmo_urinario: Optional[RitmoUrinario] = None
    nivel_hidratacao: Optional[str] = None
    pele: Optional[str] = None
    unhas: Optional[str] = None
    cabelo: Optional[str] = None
    mucosas: Optional[str] = None
    edemas: Optional[str] = None
    abdomen: Optional[str] = None

    # Avaliação bioquímica
    data_ab: Optional[date] = None
    avaliacao_bioquimica: Optional[str] = None

    # História Alimentar
    aleitamento_materno_exclusivo: Optional[bool] = None
    tempo_aleitamento_materno_exclusivo: Optional[str] = None
    ainda_mama: Optional[bool] = None
    idade_desmame: Optional[str] = None
    possui_aversoes_alimentares: Optional[bool] = None
    aversoes_alimentares: Optional[str] = None
    possui_alergias_alimentares: Optional[bool] = None
    alergias_alimentares: Optional[str] = None
    ingestao_hidrica: Optional[str] = None
    existe_horario_mais_fome: Optional[bool] = None
    horario_mais_fome: Optional[str] = None
    apetite: Optional[ApetiteEnum] = None
    motivo_apetite: Optional[str] = None

    # Diagnóstico conclusivo
    diagnostico_conclusivo: Optional[str] = None


class ChildAnamneseResponse(ChildAnamneseCreate):
    id: int

    class Config:
        from_attributes = True
