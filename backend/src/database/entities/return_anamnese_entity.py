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

class ReturnAnamnese(Base, TimestampMixin):
    __tablename__ = "return_anamneses"

    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("pacientes.id"))
    tipo_registro = Column(String, nullable=False)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    workspace_id = Column(String(36), ForeignKey("workspaces.id"), nullable=False)

    data_consulta = Column(Date, nullable=False)
    numero_prontuario = Column(String, unique=False, nullable=True)
    nutricionista_responsavel = Column(String, nullable=False)

    diagnostico_clinico = Column(Text, nullable=True)
    queixa_principal = Column(Text, nullable=True)
    medicacoes_uso = Column(Text, nullable=True)
    ritmo_intestinal = Column(SqlEnum(RitmoIntestinal), nullable=True)
    frequencia_ritmo_intestinal = Column(String, nullable=True)
    consistencia_ritmo_intestinal = Column(String, nullable=True)
    escala_bristol = Column(String, nullable=True)
    ritmo_urinario = Column(SqlEnum(RitmoUrinario), nullable=True)
    ingestao_hidrica = Column(String, nullable=True)
    nivel_hidratacao = Column(String, nullable=True)
    disfagia = Column(Boolean, nullable=True)
    odinofagia = Column(Boolean, nullable=True)
    dispepsia = Column(Boolean, nullable=True)
    nauseas = Column(Boolean, nullable=True)
    vomitos = Column(Boolean, nullable=True)
    flatulencia = Column(Boolean, nullable=True)
    cefaleia = Column(String, nullable=True)
    sono = Column(SqlEnum(SonoEnum), nullable=True)
    horario_dorme = Column(String, nullable=True)
    horario_acorda = Column(String, nullable=True)
    outros_dados_clinicos = Column(Text, nullable=True)

    dificuldades_plano_anterior = Column(Text, nullable=True)
    falta_dieta = Column(Text, nullable=True)
    rotina_exercicios = Column(Text, nullable=True)
    modificacao_exames = Column(Text, nullable=True)
    alimentacao_fds = Column(Text, nullable=True)
    nivel_estresse = Column(String, nullable=True)
    melhorou_mudancas = Column(Text, nullable=True)
    precisa_melhorar = Column(Text, nullable=True)
    como_se_sente = Column(Text, nullable=True)
    satisfacao_plano = Column(SqlEnum(SatisfacaoAlimentarEnum), nullable=True)

    cabelo = Column(String, nullable=True)
    mucosas = Column(String, nullable=True)
    denticao = Column(String, nullable=True)
    labios = Column(String, nullable=True)
    lingua = Column(String, nullable=True)
    gengiva = Column(String, nullable=True)
    pele = Column(String, nullable=True)
    unhas = Column(String, nullable=True)
    abdomen = Column(String, nullable=True)
    edema = Column(String, nullable=True)

    peso = Column(String, nullable=True)
    altura = Column(String, nullable=True)
    imc_i = Column(String, nullable=True)
    e_i = Column(String, nullable=True)
    circunferencia_cabeca = Column(String, nullable=True)
    circunferencia_coxa = Column(String, nullable=True)
    pct = Column(String, nullable=True)
    circunferencia_braco = Column(String, nullable=True)
    imc = Column(String, nullable=True)
    grau_imc = Column(SqlEnum(GrauImcEnum), nullable=True)

    data_eb = Column(Date, nullable=True)
    vitamina_a = Column(String, nullable=True)
    vitamina_bdoze = Column(String, nullable=True)
    fosfatase_prostatica = Column(String, nullable=True)
    vitamina_d = Column(String, nullable=True)


    paciente = relationship("Paciente", back_populates="return_anamneses")
    user = relationship("User", back_populates="return_anamneses")
    workspace = relationship("Workspace", back_populates="return_anamneses")
