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
    DenticaoChildEnum, 
    MastigacaoEnum, 
    RitmoIntestinal, 
    RitmoUrinario,
    ApetiteEnum 
)

class ChildAnamnese(Base, TimestampMixin):
    __tablename__ = "child_anamneses"

    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("pacientes.id"))
    tipo_registro = Column(String, nullable=False)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    workspace_id = Column(String(36), ForeignKey("workspaces.id"), nullable=False)

    data_consulta = Column(Date, nullable=False)
    numero_prontuario = Column(String, unique=False, nullable=True)
    nutricionista_responsavel = Column(String, nullable=False)

    #Dados Socio-Econômicos
    escolar = Column(Boolean, nullable=True)
    serie_escolar = Column(String, nullable=True)
    turno_escolar = Column(String, nullable=True)
    adaptacao_escolar = Column(Boolean, nullable=True)
    merenda_escolar = Column(Boolean, nullable=True)
    ocupacao_responsavel = Column(String, nullable=True)
    pai_mae = Column(Boolean, nullable=True)
    conjuge = Column(Boolean, nullable=True)
    filho = Column(Boolean, nullable=True)
    irmao = Column(Boolean, nullable=True)
    netos = Column(Boolean, nullable=True)
    sobrinho = Column(Boolean, nullable=True)
    cunhado = Column(Boolean, nullable=True)
    so = Column(Boolean, nullable=True)
    amigos = Column(Boolean, nullable=True)
    outros_da_familia = Column(String, nullable=True)
    renda_pessoal = Column(String, nullable=True)
    gastos_alimentacao = Column(String, nullable=True)
    faz_atividade_fisica = Column(Boolean, nullable=True)
    qual_atividade_fisica = Column(String, nullable=True)
    frequencia_atividade_fisica = Column(String, nullable=True)
    ja_fez_atividade_fisica = Column(Boolean, nullable=True)
    tempo_parado_atividade_fisica = Column(String, nullable=True)
    crianca_ativa = Column(String, nullable=True)
    horario_dorme = Column(String, nullable=True)
    horario_acorda = Column(String, nullable=True)

    #Dados de saúde
    objetivo_consulta = Column(Text, nullable=True)
    historia_doenca = Column(Text, nullable=True)
    historia_gestacao = Column(Text, nullable=True)
    diabetes_hma = Column(Boolean, nullable=True)
    diabetes_hf = Column(Boolean, nullable=True) 
    hipertencao_hma = Column(Boolean, nullable=True)
    hipertencao_hf = Column(Boolean, nullable=True)
    doenca_cardiovascular_hma = Column(Boolean, nullable=True)
    doenca_cardiovascular_hf = Column(Boolean, nullable=True)
    dislipidemia_hma = Column(Boolean, nullable=True)
    dislipidemia_hf = Column(Boolean, nullable=True)
    cancer_hma = Column(Boolean, nullable=True)
    cancer_hf = Column(Boolean, nullable=True)       
    osteoporose_hma = Column(Boolean, nullable=True)
    osteoporose_hf = Column(Boolean, nullable=True)
    depressao_hma = Column(Boolean, nullable=True)
    depressao_hf = Column(Boolean, nullable=True)
    parasitoses_hma = Column(Boolean, nullable=True)
    parasitoses_hf = Column(Boolean, nullable=True)
    drge_hma = Column(Boolean, nullable=True)
    drge_hf = Column(Boolean, nullable=True)
    outras_patologias = Column(Text, nullable=True)
    faz_uso_medicamentos = Column(Boolean, nullable=True)
    medicamentos = Column(Text, nullable=True)

    #Avaliação antropométrica
    peso_atual = Column(String, nullable=True)
    peso_ao_nascer = Column(String, nullable=True)
    comprimento_ao_nascer = Column(String, nullable=True)
    altura = Column(String, nullable=True)
    e_i = Column(String, nullable=True)
    p_i = Column(String, nullable=True)
    peso_para_comprimento = Column(String, nullable=True)
    diagnostico_antropometrico = Column(Text, nullable=True)

    #Dados e sintomas clínicos
    denticao = Column(SqlEnum(DenticaoChildEnum), nullable=True)
    mastigacao = Column(SqlEnum(MastigacaoEnum), nullable=True)
    disfagia = Column(Boolean, nullable=True)
    odinofagia = Column(Boolean, nullable=True)
    dispepsia = Column(Boolean, nullable=True)
    nauseas = Column(Boolean, nullable=True)
    vomitos = Column(Boolean, nullable=True)
    ritmo_intestinal = Column(SqlEnum(RitmoIntestinal), nullable=True)
    escala_bristol = Column(String, nullable=True)
    ritmo_urinario = Column(SqlEnum(RitmoUrinario), nullable=True)
    nivel_hidratacao = Column(String, nullable=True)
    pele = Column(String, nullable=True)
    unhas = Column(String, nullable=True)
    cabelo = Column(String, nullable=True)
    mucosas = Column(String, nullable=True)
    edemas = Column(String, nullable=True)
    abdomen = Column(String, nullable=True)

    #Avaliação bioquímica
    data_ab = Column(Date, nullable=True)
    avaliacao_bioquimica = Column(Text, nullable=True)

    #História Alimentar
    aleitamento_materno_exclusivo = Column(Boolean, nullable=True)
    tempo_aleitamento_materno_exclusivo = Column(String, nullable=True)
    ainda_mama = Column(Boolean, nullable=True)
    idade_desmame = Column(String, nullable=True)
    possui_aversoes_alimentares = Column(Boolean, nullable=True)
    aversoes_alimentares = Column(Text, nullable=True)
    possui_alergias_alimentares = Column(Boolean, nullable=True)
    alergias_alimentares = Column(Text, nullable=True)
    ingestao_hidrica = Column(String, nullable=True)
    existe_horario_mais_fome = Column(Boolean, nullable=True)
    horario_mais_fome = Column(String, nullable=True)
    apetite = Column(SqlEnum(ApetiteEnum), nullable=True)
    motivo_apetite = Column(String, nullable=True)

    #Diagnóstico conclusivo
    diagnostico_conclusivo = Column(Text, nullable=True)

    paciente = relationship("Paciente", back_populates="child_anamneses")
    user = relationship("User", back_populates="child_anamneses")
    workspace = relationship("Workspace", back_populates="child_anamneses")
