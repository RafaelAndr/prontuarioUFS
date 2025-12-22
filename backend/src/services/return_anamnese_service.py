from sqlalchemy.orm import Session
from src.database.entities.return_anamnese_entity import ReturnAnamnese
from src.models.return_anamnese_model import ReturnAnamneseCreate


# CREATE
async def cadastrar_return_anamnese(anamnese: ReturnAnamneseCreate, user_id: str, db: Session):
    """
    Cria uma nova ReturnAnamnese no banco de dados.

    Args:
        anamnese (ReturnAnamneseCreate): Dados enviados pelo cliente (Pydantic Model).
        db (Session): Sessão do banco de dados.

    Returns:
        ReturnAnamnese: Objeto recém-criado com ID e demais campos atualizados.
    """
    nova_anamnese = ReturnAnamnese(**anamnese.model_dump(exclude_unset=True), user_id=user_id)
    db.add(nova_anamnese)
    db.commit()
    db.refresh(nova_anamnese)
    return nova_anamnese


# READ - listar todos
async def listar_return_anamneses(user_id: str, db: Session):
    """
    Retorna todas as ReturnAnamneses cadastradas.

    Args:
        db (Session): Sessão do banco de dados.

    Returns:
        list[ReturnAnamnese]: Lista com todas as entradas cadastradas.
    """
    return db.query(ReturnAnamnese).filter(ReturnAnamnese.user_id == user_id).all()


# READ - buscar por ID
async def buscar_return_anamnese(id: int, user_id: str, db: Session):
    """
    Busca uma ReturnAnamnese específica pelo ID.

    Args:
        id (int): ID da ReturnAnamnese.
        db (Session): Sessão do banco de dados.

    Returns:
        ReturnAnamnese | None: Retorno encontrado ou None se não existir.
    """
    anamnese = db.query(ReturnAnamnese).filter(ReturnAnamnese.id == id, ReturnAnamnese.user_id == user_id).first()
    return anamnese


# UPDATE
async def atualizar_return_anamnese(id: int, dados: ReturnAnamneseCreate, user_id: str, db: Session):
    """
    Atualiza uma ReturnAnamnese existente.

    Args:
        id (int): ID da anamnese a ser atualizada.
        dados (ReturnAnamneseCreate): Dados enviados pelo cliente (Pydantic Model).
        db (Session): Sessão do banco de dados.

    Returns:
        ReturnAnamnese | None: Objeto atualizado ou None se o ID não existir.
    """
    anamnese = db.query(ReturnAnamnese).filter(ReturnAnamnese.id == id, ReturnAnamnese.user_id == user_id).first()
    if not anamnese:
        return None

    for key, value in dados.model_dump(exclude_unset=True).items():
        setattr(anamnese, key, value)

    db.commit()
    db.refresh(anamnese)
    return anamnese


# DELETE
async def deletar_return_anamnese(id: int, user_id: str, db: Session):
    """
    Deleta uma ReturnAnamnese do banco de dados.

    Args:
        id (int): ID da anamnese a ser removida.
        db (Session): Sessão do banco de dados.

    Returns:
        bool: True se deletou com sucesso, False se o ID não existir.
    """
    anamnese = db.query(ReturnAnamnese).filter(ReturnAnamnese.id == id, ReturnAnamnese.user_id == user_id).first()
    if anamnese:
        db.delete(anamnese)
        db.commit()
        return True
    return False


# READ - buscar por paciente_id
async def buscar_return_anamneses_por_paciente(paciente_id: int, user_id: str, db: Session):
    """
    Busca todas as ReturnAnamneses relacionadas a um paciente específico.

    Args:
        paciente_id (int): ID do paciente.
        db (Session): Sessão do banco de dados.

    Returns:
        list[ReturnAnamnese]: Lista de anamneses do paciente.
    """
    anamneses = (
        db.query(ReturnAnamnese)
        .filter(ReturnAnamnese.paciente_id == paciente_id, ReturnAnamnese.user_id == user_id)
        .all()
    )
    return anamneses
