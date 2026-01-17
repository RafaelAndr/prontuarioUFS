from sqlalchemy.orm import Session
from src.database.entities.base_anamnese_entity import BaseAnamnese
from src.models.base_anamnese_model import BaseAnamneseCreate


# CREATE
async def cadastrar_base_anamnese(anamnese: BaseAnamneseCreate, user_id: str, workspace_id: str, db: Session):
    """
    Cadastra uma nova anamnese base no banco de dados.

    Args:
        anamnese (BaseAnamneseCreate): Dados validados enviados pelo cliente.
        user_id (str): ID do usuário que está criando a anamnese.
        workspace_id (str): ID do workspace onde a anamnese será salva.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        BaseAnamnese: Objeto recém-criado e persistido no banco.
    """
    nova_anamnese = BaseAnamnese(**anamnese.model_dump(exclude_unset=True), user_id=user_id, workspace_id=workspace_id)
    db.add(nova_anamnese)
    db.commit()
    db.refresh(nova_anamnese)
    return nova_anamnese


# READ - listar todos
async def listar_base_anamneses(workspace_id: str, db: Session):
    """
    Lista todas as anamneses base cadastradas.

    Args:
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[BaseAnamnese]: Lista completa de registros.
    """
    return db.query(BaseAnamnese).filter(BaseAnamnese.workspace_id == workspace_id).all()


# READ - buscar por ID
async def buscar_base_anamnese(id: int, workspace_id: str, db: Session):
    """
    Busca uma anamnese base pelo ID.

    Args:
        id (int): ID da anamnese.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        BaseAnamnese | None: Registro encontrado ou None se não existir.
    """
    anamnese = db.query(BaseAnamnese).filter(BaseAnamnese.id == id, BaseAnamnese.workspace_id == workspace_id).first()
    return anamnese


# UPDATE
async def atualizar_base_anamnese(id: int, dados: BaseAnamneseCreate, workspace_id: str, db: Session):
    """
    Atualiza uma anamnese base com os dados fornecidos.

    Apenas os campos enviados no payload são atualizados.

    Args:
        id (int): ID da anamnese a ser atualizada.
        dados (BaseAnamneseCreate): Dados validados enviados pelo cliente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        BaseAnamnese | None: Registro atualizado ou None se não encontrado.
    """
    anamnese = db.query(BaseAnamnese).filter(BaseAnamnese.id == id, BaseAnamnese.workspace_id == workspace_id).first()
    if not anamnese:
        return None

    for key, value in dados.model_dump(exclude_unset=True).items():
        setattr(anamnese, key, value)

    db.commit()
    db.refresh(anamnese)
    return anamnese


# DELETE
async def deletar_base_anamnese(id: int, workspace_id: str, db: Session):
    """
    Deleta uma anamnese base do banco de dados.

    Args:
        id (int): ID do registro a ser removido.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        bool: True se deletou com sucesso, False se não existir.
    """
    anamnese = db.query(BaseAnamnese).filter(BaseAnamnese.id == id, BaseAnamnese.workspace_id == workspace_id).first()
    if anamnese:
        db.delete(anamnese)
        db.commit()
        return True
    return False


# READ - buscar por paciente_id
async def buscar_base_anamneses_por_paciente(paciente_id: int, workspace_id: str, db: Session):
    """
    Lista todas as anamneses base associadas a um paciente específico.

    Args:
        paciente_id (int): ID do paciente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[BaseAnamnese]: Lista de anamneses vinculadas ao paciente.
    """
    anamneses = db.query(BaseAnamnese).filter(BaseAnamnese.paciente_id == paciente_id, BaseAnamnese.workspace_id == workspace_id).all()
    return anamneses
