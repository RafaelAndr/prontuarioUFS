from sqlalchemy import (
    Column, 
    Integer, 
    Float, 
    String, 
    ForeignKey, 
    JSON, 
    Boolean, 
    Date, 
    Text, 
    Numeric, 
    Enum as SqlEnum
)
from sqlalchemy.orm import relationship
from src.database.connection import Base
from src.database.entities.enums import (
    EscolaridadeEnum, 
    EstadoCivilEnum, 
    DenticaoEnum, 
    MastigacaoEnum, 
    RitmoIntestinal, 
    RitmoUrinario,
    ApetiteEnum,
    SonoEnum 
)

class BaseAnamnese(Base):
    __tablename__ = "base_anamneses"

    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("pacientes.id"))
    tipo_registro = Column(String, nullable=False)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    workspace_id = Column(String(36), ForeignKey("workspaces.id"), nullable=False)

    data_consulta = Column(Date, nullable=False)
    numero_prontuario = Column(String, unique=False, nullable=True)
    nutricionista_responsavel = Column(String, nullable=False)

    #Dados Socio-Econômicos
    estado_civil = Column(SqlEnum(EstadoCivilEnum), nullable=True)
    escolaridade = Column(SqlEnum(EscolaridadeEnum), nullable=True)
    ocupacao = Column(String, nullable=True)
    faz_atividade_dentro_casa = Column(Boolean, nullable=True)
    atividade_dentro_casa = Column(String, nullable=True)
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
    tem_etilismo = Column(Boolean, nullable=True)
    tipo_etilismo = Column(String, nullable=True)
    quanto_etilismo = Column(String, nullable=True)
    ja_foi_etilista = Column(Boolean, nullable=True)
    tempo_parado_etilismo = Column(String, nullable=True)
    tem_tabagismo = Column(Boolean, nullable=True)
    tipo_tabagismo = Column(String, nullable=True)
    quanto_tabagismo = Column(String, nullable=True)
    ja_foi_tabagista = Column(Boolean, nullable=True)
    tempo_parado_tabagismo = Column(String, nullable=True)
    horario_dorme = Column(String, nullable=True)
    horario_acorda = Column(String, nullable=True)
    sono = Column(SqlEnum(SonoEnum), nullable=True)

    #Dados de saúde
    objetivo_consulta = Column(Text, nullable=True)
    historia_doenca = Column(Text, nullable=True)
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
    sop_hma = Column(Boolean, nullable=True)
    sop_hf = Column(Boolean, nullable=True)
    outras_patologias = Column(Text, nullable=True)
    faz_uso_medicamentos = Column(Boolean, nullable=True)
    medicamentos = Column(Text, nullable=True)

    #Avaliação antropométrica
    peso_atual = Column(String, nullable=True)
    peso_usual = Column(String, nullable=True)
    aj = Column(String, nullable=True)
    altura_real = Column(String, nullable=True)
    altura_estimada = Column(String, nullable=True)
    imc = Column(String, nullable=True)
    circunferencia_braco = Column(String, nullable=True)
    circunferencia_pescoco = Column(String, nullable=True)
    pct = Column(String, nullable=True)
    pcb = Column(String, nullable=True)
    pcse = Column(String, nullable=True)
    pcsi = Column(String, nullable=True)
    circunferencia_cintura = Column(String, nullable=True)
    circunferencia_panturrilha = Column(String, nullable=True)
    diagnostico_antropometrico = Column(Text, nullable=True)

    #Dados da bioimpedância 
    percentual_gordura = Column(String, nullable=True)
    peso_gordura = Column(String, nullable=True)
    massa_magra = Column(String, nullable=True)
    gordura_alvo = Column(String, nullable=True)
    peso_alvo = Column(String, nullable=True)
    tmb = Column(String, nullable=True)
    percentual_agua_massa_magra = Column(String, nullable=True)
    agua_corporal_total = Column(String, nullable=True)

    #Dados e sintomas clínicos
    denticao = Column(SqlEnum(DenticaoEnum), nullable=True)
    mastigacao = Column(SqlEnum(MastigacaoEnum), nullable=True)
    disfagia = Column(Boolean, nullable=True)
    odinofagia = Column(Boolean, nullable=True)
    dispepsia = Column(Boolean, nullable=True)
    nauseas = Column(Boolean, nullable=True)
    vomitos = Column(Boolean, nullable=True)
    flatulencia = Column(Boolean, nullable=True)
    ritmo_intestinal = Column(SqlEnum(RitmoIntestinal), nullable=True)
    ritmo_urinario = Column(SqlEnum(RitmoUrinario), nullable=True)
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
    possui_aversoes_alimentares = Column(Boolean, nullable=True)
    aversoes_alimentares = Column(Text, nullable=True)
    possui_alergias_alimentares = Column(Boolean, nullable=True)
    alergias_alimentares = Column(Text, nullable=True)
    ingestao_hidrica = Column(String, nullable=True)
    existe_horario_mais_fome = Column(Boolean, nullable=True)
    horario_mais_fome = Column(String, nullable=True)
    apetite = Column(SqlEnum(ApetiteEnum), nullable=True)

    #Diagnóstico conclusivo
    diagnostico_conclusivo = Column(Text, nullable=True)


    paciente = relationship("Paciente", back_populates="base_anamneses")
    user = relationship("User", back_populates="base_anamneses")
    workspace = relationship("Workspace", back_populates="base_anamneses")
