from sqlalchemy.orm import Session
from src.database.entities.child_anamnese_entity import ChildAnamnese
from src.models.child_anamnese_model import ChildAnamneseCreate


# CREATE
async def cadastrar_child_anamnese(anamnese: ChildAnamneseCreate, user_id: str, workspace_id: str, db: Session):
    """
    Cadastra uma nova anamnese infantil no banco de dados.

    Args:
        anamnese (ChildAnamneseCreate): Dados enviados pelo cliente (Pydantic Model).
        user_id (str): ID do usuário que está criando a anamnese.
        workspace_id (str): ID do workspace onde a anamnese será salva.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        ChildAnamnese: Objeto recém-criado e persistido no banco.
    """
    nova_anamnese = ChildAnamnese(
        **anamnese.model_dump(exclude_unset=True),
        user_id=user_id,
        workspace_id=workspace_id
    )
    db.add(nova_anamnese)
    db.commit()
    db.refresh(nova_anamnese)
    return nova_anamnese


# READ - listar todos
async def listar_child_anamneses(workspace_id: str, db: Session):
    """
    Lista todas as anamneses infantis cadastradas.

    Args:
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[ChildAnamnese]: Lista completa de registros.
    """
    return db.query(ChildAnamnese).filter(ChildAnamnese.workspace_id == workspace_id).all()


# READ - buscar por ID
async def buscar_child_anamnese(id: int, workspace_id: str, db: Session):
    """
    Busca uma anamnese infantil específica pelo ID.

    Args:
        id (int): ID da anamnese.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        ChildAnamnese | None: Registro encontrado ou None se não existir.
    """
    anamnese = db.query(ChildAnamnese).filter(ChildAnamnese.id == id, ChildAnamnese.workspace_id == workspace_id).first()
    return anamnese


# UPDATE
async def atualizar_child_anamnese(id: int, dados: ChildAnamneseCreate, workspace_id: str, db: Session):
    """
    Atualiza uma anamnese infantil existente com os dados fornecidos.

    Apenas os campos enviados serão modificados, preservando os demais.

    Args:
        id (int): ID da anamnese a ser atualizada.
        dados (ChildAnamneseCreate): Dados enviados pelo cliente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        ChildAnamnese | None: Registro atualizado ou None se não encontrado.
    """
    anamnese = db.query(ChildAnamnese).filter(ChildAnamnese.id == id, ChildAnamnese.workspace_id == workspace_id).first()

    if not anamnese:
        return None

    for key, value in dados.model_dump(exclude_unset=True).items():
        setattr(anamnese, key, value)

    db.commit()
    db.refresh(anamnese)
    return anamnese


# DELETE
async def deletar_child_anamnese(id: int, workspace_id: str, db: Session):
    """
    Deleta uma anamnese infantil do banco de dados.

    Args:
        id (int): ID do registro a ser removido.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        bool: True se o registro foi deletado, False se não existir.
    """
    anamnese = db.query(ChildAnamnese).filter(ChildAnamnese.id == id, ChildAnamnese.workspace_id == workspace_id).first()
    if anamnese:
        db.delete(anamnese)
        db.commit()
        return True
    return False


# READ - buscar por paciente_id
async def buscar_child_anamneses_por_paciente(paciente_id: int, workspace_id: str, db: Session):
    """
    Lista todas as anamneses infantis de um paciente específico.

    Args:
        paciente_id (int): ID do paciente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[ChildAnamnese]: Lista de anamneses vinculadas ao paciente.
    """
    anamneses = (
        db.query(ChildAnamnese)
        .filter(ChildAnamnese.paciente_id == paciente_id, ChildAnamnese.workspace_id == workspace_id)
        .all()
    )
    return anamneses
