from sqlalchemy.orm import Session
from src.database.entities.recordatory_entity import Recordatory
from src.models.recordatory_model import RecordatoryCreate


# CREATE
async def cadastrar_recordatorio(recordatorio: RecordatoryCreate, user_id: str, workspace_id: str, db: Session):
    """
    Cria um novo registro de Recordatory no banco de dados.

    Args:
        recordatorio (RecordatoryCreate): Dados validados enviados pelo cliente.
        user_id (str): ID do usuário que está criando o registro.
        workspace_id (str): ID do workspace onde o registro será salvo.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        Recordatory: O registro recém-criado, com ID e campos atualizados.
    """
    novo = Recordatory(**recordatorio.model_dump(exclude_unset=True), user_id=user_id, workspace_id=workspace_id)
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo


# READ — listar todos
async def listar_recordatorios(workspace_id: str, db: Session):
    """
    Lista todos os registros de Recordatory.

    Args:
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[Recordatory]: Lista completa de todos os recordatórios cadastrados.
    """
    return db.query(Recordatory).filter(Recordatory.workspace_id == workspace_id).all()


# READ — buscar por ID
async def buscar_recordatorio(id: int, workspace_id: str, db: Session):
    """
    Busca um recordatório específico pelo ID.

    Args:
        id (int): ID do recordatório desejado.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        Recordatory | None: O registro encontrado ou None se não existir.
    """
    return db.query(Recordatory).filter(Recordatory.id == id, Recordatory.workspace_id == workspace_id).first()


# READ — buscar por paciente_id
async def buscar_recordatorios_por_paciente(paciente_id: int, workspace_id: str, db: Session):
    """
    Lista todos os recordatórios de um paciente específico.

    Args:
        paciente_id (int): ID do paciente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[Recordatory]: Lista de recordatórios pertencentes ao paciente.
    """
    return db.query(Recordatory).filter(Recordatory.paciente_id == paciente_id, Recordatory.workspace_id == workspace_id).all()


# UPDATE
async def atualizar_recordatorio(id: int, dados: RecordatoryCreate, workspace_id: str, db: Session):
    """
    Atualiza um recordatório existente com os dados enviados.

    Somente os campos presentes no payload serão atualizados,
    preservando os demais valores.

    Args:
        id (int): ID do recordatório a ser atualizado.
        dados (RecordatoryCreate): Dados enviados pelo cliente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        Recordatory | None: Registro atualizado ou None se não existir.
    """
    registro = db.query(Recordatory).filter(Recordatory.id == id, Recordatory.workspace_id == workspace_id).first()
    if not registro:
        return None

    for key, value in dados.model_dump(exclude_unset=True).items():
        setattr(registro, key, value)

    db.commit()
    db.refresh(registro)
    return registro


# DELETE
async def deletar_recordatorio(id: int, workspace_id: str, db: Session):
    """
    Deleta um recordatório do banco de dados.

    Args:
        id (int): ID do registro que será removido.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        bool: True se o registro foi deletado com sucesso, False se não existir.
    """
    registro = db.query(Recordatory).filter(Recordatory.id == id, Recordatory.workspace_id == workspace_id).first()
    if registro:
        db.delete(registro)
        db.commit()
        return True
    return False
