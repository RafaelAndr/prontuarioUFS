from sqlalchemy.orm import Session
from src.database.entities.paciente_entity import Paciente
from src.models.paciente_model import PacienteCreate
from sqlalchemy import select


async def cadastrar_paciente(paciente: PacienteCreate, user_id: str, db: Session):
    """
    Cadastra um novo paciente no banco de dados.

    Args:
        paciente (PacienteCreate): Dados validados do paciente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        Paciente: Paciente recém-criado e persistido no banco.

    Raises:
        Exception: Caso ocorra erro na transação, a exceção é repassada.
    """
    try:
        novo_paciente = Paciente(
            nome=paciente.nome,
            data_nascimento=paciente.data_nascimento,
            telefone=paciente.telefone,
            endereco=paciente.endereco,
            user_id=user_id
        )
        db.add(novo_paciente)
        db.commit()
        db.refresh(novo_paciente)
        return novo_paciente
    except Exception as e:
        db.rollback()  # desfaz transação se der erro
        raise e


async def deletar_paciente(paciente_id: int, user_id: str, db: Session):
    """
    Remove um paciente do banco de dados.

    Args:
        paciente_id (int): ID do paciente que será deletado.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        bool: True se o paciente foi deletado, False se não encontrado.
    """
    paciente = db.query(Paciente).filter(Paciente.id == paciente_id, Paciente.user_id == user_id).first()
    if paciente:
        db.delete(paciente)
        db.commit()
        return True
    return False


# READ (listar todos)
async def listar_pacientes(user_id: str, db: Session):
    """
    Lista todos os pacientes cadastrados.

    Args:
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[Paciente]: Lista completa de pacientes.
    """
    return db.query(Paciente).filter(Paciente.user_id == user_id).all()


# READ (buscar por id)
async def buscar_paciente(id: int, user_id: str, db: Session):
    """
    Busca um paciente específico pelo ID.

    Args:
        id (int): ID do paciente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        Paciente | None: Paciente encontrado ou None se não existir.
    """
    paciente = db.query(Paciente).filter(Paciente.id == id, Paciente.user_id == user_id).first()
    return paciente


# READ (buscar por nome)
async def buscar_paciente_por_nome(nome: str | None, user_id: str, db: Session):
    """
    Busca pacientes filtrando pelo nome (parcial ou completo).

    A busca é case-insensitive e utiliza operador LIKE.

    Args:
        nome (str | None): Nome ou fragmento para busca. Se None, retorna todos.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[Paciente]: Lista de pacientes filtrados pelo nome.
    """
    query = select(Paciente).filter(Paciente.user_id == user_id)

    if nome:
        query = query.filter(Paciente.nome.ilike(f"%{nome}%"))

    result = db.execute(query).scalars().all()
    return result


# UPDATE
async def atualizar_paciente(id: int, dados: PacienteCreate, user_id: str, db: Session):
    """
    Atualiza os dados de um paciente existente.

    Args:
        id (int): ID do paciente a ser atualizado.
        dados (PacienteCreate): Dados enviados pelo cliente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        Paciente | None: Paciente atualizado ou None se não existir.
    """
    paciente = db.query(Paciente).filter(Paciente.id == id, Paciente.user_id == user_id).first()
    if not paciente:
        return None

    paciente.nome = dados.nome
    paciente.data_nascimento = dados.data_nascimento
    paciente.telefone = dados.telefone
    paciente.endereco = dados.endereco

    db.commit()
    db.refresh(paciente)
    return paciente
