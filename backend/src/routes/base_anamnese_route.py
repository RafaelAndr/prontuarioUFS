from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.models.base_anamnese_model import BaseAnamneseCreate, BaseAnamneseResponse
from src.services.base_anamnese_service import (
    cadastrar_base_anamnese,
    listar_base_anamneses,
    buscar_base_anamnese,
    atualizar_base_anamnese,
    deletar_base_anamnese,
    buscar_base_anamneses_por_paciente
)
from src.database.connection import get_db
from src.middleware.auth_middleware import get_current_user, get_current_workspace_validation
from src.database.entities.users_entity import User

router = APIRouter(prefix="/base-anamneses", tags=["BaseAnamneses"])


# CREATE
@router.post("/cadastrar", response_model=BaseAnamneseResponse)
async def cadastrar(anamnese: BaseAnamneseCreate,
                    current_user: User = Depends(get_current_user),
                    workspace_id: str = Depends(get_current_workspace_validation),
                    db: Session = Depends(get_db)):
    """
    Cadastra uma nova anamnese base.

    Args:
        anamnese (BaseAnamneseCreate): Dados enviados pelo cliente.
        db (Session): Sessão do banco de dados.

    Returns:
        BaseAnamneseResponse: Registro recém-criado.

    Raises:
        HTTPException: Em caso de erro interno ao salvar no banco.
    """
    try:
        return await cadastrar_base_anamnese(anamnese, current_user.id, workspace_id, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# READ - listar todos
@router.get("/", response_model=list[BaseAnamneseResponse])
async def listar(
    workspace_id: str = Depends(get_current_workspace_validation),
    db: Session = Depends(get_db)):
    """
    Lista todas as anamneses base cadastradas.

    Args:
        db (Session): Sessão do banco de dados.

    Returns:
        list[BaseAnamneseResponse]: Lista de registros.
    """
    return await listar_base_anamneses(workspace_id, db)


# READ - buscar por id
@router.get("/{id}", response_model=BaseAnamneseResponse)
async def buscar(id: int, 
                 workspace_id: str = Depends(get_current_workspace_validation),
                 db: Session = Depends(get_db)):
    """
    Busca uma anamnese base pelo ID.

    Args:
        id (int): ID da anamnese.
        db (Session): Sessão do banco de dados.

    Returns:
        BaseAnamneseResponse: Registro encontrado.

    Raises:
        HTTPException: Caso o ID não exista.
    """
    anamnese = await buscar_base_anamnese(id, workspace_id, db)
    if not anamnese:
        raise HTTPException(status_code=404, detail="Anamnese não encontrada")
    return anamnese


# READ - por paciente_id
@router.get("/paciente/{paciente_id}", response_model=list[BaseAnamneseResponse])
async def buscar_por_paciente(paciente_id: int, 
                                workspace_id: str = Depends(get_current_workspace_validation),
                                db: Session = Depends(get_db)):
    """
    Busca todas as anamneses base associadas a um paciente.

    Args:
        paciente_id (int): ID do paciente.
        db (Session): Sessão do banco de dados.

    Returns:
        list[BaseAnamneseResponse]: Lista de anamneses do paciente.
    """
    return await buscar_base_anamneses_por_paciente(paciente_id, workspace_id, db)


# UPDATE
@router.put("/{id}", response_model=BaseAnamneseResponse)
async def atualizar(id: int, anamnese: BaseAnamneseCreate, 
                    workspace_id: str = Depends(get_current_workspace_validation),
                    db: Session = Depends(get_db)):
    """
    Atualiza uma anamnese base existente.

    Args:
        id (int): ID da anamnese.
        anamnese (BaseAnamneseCreate): Dados atualizados.
        db (Session): Sessão do banco de dados.

    Returns:
        BaseAnamneseResponse: Registro atualizado.

    Raises:
        HTTPException: Caso o ID não exista.
    """
    atualizado = await atualizar_base_anamnese(id, anamnese, workspace_id, db)
    if not atualizado:
        raise HTTPException(status_code=404, detail="Anamnese não encontrada")
    return atualizado


# DELETE
@router.delete("/{id}")
async def deletar(id: int,
                workspace_id: str = Depends(get_current_workspace_validation),
                db: Session = Depends(get_db)):
    """
    Deleta uma anamnese base do banco de dados.

    Args:
        id (int): ID da anamnese.
        db (Session): Sessão do banco de dados.

    Returns:
        dict: Mensagem de sucesso.

    Raises:
        HTTPException: Caso o ID não exista.
    """
    sucesso = await deletar_base_anamnese(id, workspace_id, db)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Anamnese não encontrada")
    return {"message": "Anamnese excluída com sucesso"}
