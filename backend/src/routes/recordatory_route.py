from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from src.models.recordatory_model import (
    RecordatoryCreate,
    RecordatoryResponse,
)
from src.services.recordatory_service import (
    cadastrar_recordatorio,
    listar_recordatorios,
    buscar_recordatorio,
    atualizar_recordatorio,
    deletar_recordatorio,
    buscar_recordatorios_por_paciente
)
from src.database.connection import get_db
from src.middleware.auth_middleware import get_current_user, get_current_workspace_validation
from src.database.entities.users_entity import User

router = APIRouter(prefix="/recordatorys", tags=["Recordatorys"])


# CREATE
@router.post("/cadastrar", response_model=RecordatoryResponse)
async def cadastrar(recordatorio: RecordatoryCreate, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Cadastra um novo recordatório alimentar.

    Args:
        recordatorio (RecordatoryCreate): Dados enviados pelo cliente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        RecordatoryResponse: Recordatório recém-criado.

    Raises:
        HTTPException: Em caso de erro interno ao salvar o registro.
    """
    try:
        return await cadastrar_recordatorio(recordatorio, current_user.id, workspace_id, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# READ - listar todos
@router.get("/", response_model=list[RecordatoryResponse])
async def listar(current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Lista todos os recordatórios cadastrados.

    Args:
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[RecordatoryResponse]: Lista completa de recordatórios.
    """
    return await listar_recordatorios(workspace_id, db)


# READ - buscar por id
@router.get("/{id}", response_model=RecordatoryResponse)
async def buscar(id: int, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Busca um recordatório pelo seu ID.

    Args:
        id (int): ID do recordatório.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        RecordatoryResponse: Registro encontrado.

    Raises:
        HTTPException: Caso o recordatório não exista.
    """
    dado = await buscar_recordatorio(id, workspace_id, db)
    if not dado:
        raise HTTPException(status_code=404, detail="Recordatório não encontrado")
    return dado


# READ - buscar por paciente_id
@router.get("/paciente/{paciente_id}", response_model=list[RecordatoryResponse])
async def buscar_por_paciente(paciente_id: int, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Lista todos os recordatórios associados a um paciente específico.

    Args:
        paciente_id (int): ID do paciente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[RecordatoryResponse]: Registros do paciente.
    """
    return await buscar_recordatorios_por_paciente(paciente_id, workspace_id, db)


# UPDATE
@router.put("/{id}", response_model=RecordatoryResponse)
async def atualizar(id: int, dados: RecordatoryCreate, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Atualiza um recordatório existente.

    Args:
        id (int): ID do recordatório.
        dados (RecordatoryCreate): Dados atualizados enviados pelo cliente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        RecordatoryResponse: Registro atualizado.

    Raises:
        HTTPException: Caso o registro não seja encontrado.
    """
    atualizado = await atualizar_recordatorio(id, dados, workspace_id, db)
    if not atualizado:
        raise HTTPException(status_code=404, detail="Recordatório não encontrado")
    return atualizado


# DELETE
@router.delete("/{id}")
async def deletar(id: int, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Remove um recordatório do banco de dados.

    Args:
        id (int): ID do recordatório.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        dict: Mensagem de confirmação.

    Raises:
        HTTPException: Caso o registro não exista.
    """
    sucesso = await deletar_recordatorio(id, workspace_id, db)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Recordatório não encontrado")
    return {"message": "Recordatório excluído com sucesso"}
