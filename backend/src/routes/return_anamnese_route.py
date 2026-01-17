from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.models.return_anamnese_model import (
    ReturnAnamneseCreate,
    ReturnAnamneseResponse
)

from src.services.return_anamnese_service import (
    cadastrar_return_anamnese,
    listar_return_anamneses,
    buscar_return_anamnese,
    atualizar_return_anamnese,
    deletar_return_anamnese,
    buscar_return_anamneses_por_paciente
)

from src.database.connection import get_db
from src.middleware.auth_middleware import get_current_user, get_current_workspace_validation
from src.database.entities.users_entity import User

router = APIRouter(prefix="/return-anamneses", tags=["ReturnAnamneses"])


# ---------------------------------------------------------
# CREATE
# ---------------------------------------------------------
@router.post("/cadastrar", response_model=ReturnAnamneseResponse)
async def cadastrar(anamnese: ReturnAnamneseCreate, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Cadastra uma nova anamnese de retorno.

    Args:
        anamnese (ReturnAnamneseCreate): Dados enviados pelo cliente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        ReturnAnamneseResponse: Registro criado.

    Raises:
        HTTPException: Caso ocorra erro interno ao salvar no banco.
    """
    try:
        return await cadastrar_return_anamnese(anamnese, current_user.id, workspace_id, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---------------------------------------------------------
# READ - listar todos
# ---------------------------------------------------------
@router.get("/", response_model=list[ReturnAnamneseResponse])
async def listar(current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Lista todas as anamneses de retorno cadastradas.

    Args:
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[ReturnAnamneseResponse]: Lista completa de registros.
    """
    return await listar_return_anamneses(workspace_id, db)


# ---------------------------------------------------------
# READ - buscar por id
# ---------------------------------------------------------
@router.get("/{id}", response_model=ReturnAnamneseResponse)
async def buscar(id: int, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Busca uma anamnese de retorno pelo ID.

    Args:
        id (int): ID da anamnese de retorno.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        ReturnAnamneseResponse: Registro encontrado.

    Raises:
        HTTPException: Caso o registro não exista.
    """
    anamnese = await buscar_return_anamnese(id, workspace_id, db)
    if not anamnese:
        raise HTTPException(status_code=404, detail="Anamnese não encontrada")
    return anamnese


# ---------------------------------------------------------
# READ - buscar por paciente_id
# ---------------------------------------------------------
@router.get("/paciente/{paciente_id}", response_model=list[ReturnAnamneseResponse])
async def buscar_por_paciente(paciente_id: int, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Lista todas as anamneses de retorno associadas a um paciente específico.

    Args:
        paciente_id (int): ID do paciente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[ReturnAnamneseResponse]: Registros do paciente.
    """
    return await buscar_return_anamneses_por_paciente(paciente_id, workspace_id, db)


# ---------------------------------------------------------
# UPDATE
# ---------------------------------------------------------
@router.put("/{id}", response_model=ReturnAnamneseResponse)
async def atualizar(id: int, anamnese: ReturnAnamneseCreate, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Atualiza uma anamnese de retorno existente.

    Args:
        id (int): ID da anamnese.
        anamnese (ReturnAnamneseCreate): Dados atualizados.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        ReturnAnamneseResponse: Registro atualizado.

    Raises:
        HTTPException: Caso o registro não exista.
    """
    atualizado = await atualizar_return_anamnese(id, anamnese, workspace_id, db)
    if not atualizado:
        raise HTTPException(status_code=404, detail="Anamnese não encontrada")
    return atualizado


# ---------------------------------------------------------
# DELETE
# ---------------------------------------------------------
@router.delete("/{id}")
async def deletar(id: int, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Remove uma anamnese de retorno do banco de dados.

    Args:
        id (int): ID da anamnese de retorno.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        dict: Mensagem de confirmação da exclusão.

    Raises:
        HTTPException: Caso o registro não exista.
    """
    sucesso = await deletar_return_anamnese(id, workspace_id, db)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Anamnese não encontrada")
    return {"message": "Anamnese excluída com sucesso"}
