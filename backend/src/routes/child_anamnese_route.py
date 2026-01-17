from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.models.child_anamnese_model import ChildAnamneseCreate, ChildAnamneseResponse
from src.services.child_anamnese_service import (
    cadastrar_child_anamnese,
    listar_child_anamneses,
    buscar_child_anamnese,      
    atualizar_child_anamnese,
    deletar_child_anamnese,
    buscar_child_anamneses_por_paciente
)
from src.database.connection import get_db
from src.middleware.auth_middleware import get_current_user, get_current_workspace_validation
from src.database.entities.users_entity import User

router = APIRouter(prefix="/child-anamneses", tags=["ChildAnamneses"])  


# CREATE
@router.post("/cadastrar", response_model=ChildAnamneseResponse)
async def cadastrar(anamnese: ChildAnamneseCreate, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Cadastra uma nova anamnese infantil.

    Args:
        anamnese (ChildAnamneseCreate): Dados enviados pelo cliente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        ChildAnamneseResponse: Anamnese cadastrada com ID e valores persistidos.

    Raises:
        HTTPException: Se ocorrer erro interno durante a inserção.
    """
    try:
        return await cadastrar_child_anamnese(anamnese,current_user.id, workspace_id, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 
    

# READ - listar todos
@router.get("/", response_model=list[ChildAnamneseResponse])
async def listar(current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Lista todas as anamneses infantis cadastradas.

    Args:
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[ChildAnamneseResponse]: Lista completa de registros.
    """
    return await listar_child_anamneses(workspace_id, db)    


# READ - buscar por id
@router.get("/{id}", response_model=ChildAnamneseResponse)
async def buscar(id: int, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Busca uma anamnese infantil específica pelo ID.

    Args:
        id (int): ID da anamnese infantil.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        ChildAnamneseResponse: Registro encontrado.

    Raises:
        HTTPException: Caso o ID não exista.
    """
    anamnese = await buscar_child_anamnese(id, workspace_id, db)
    if not anamnese:
        raise HTTPException(status_code=404, detail="Anamnese não encontrada")
    return anamnese


# UPDATE
@router.put("/{id}", response_model=ChildAnamneseResponse)
async def atualizar(id: int, anamnese: ChildAnamneseCreate, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Atualiza uma anamnese infantil existente.

    Args:
        id (int): ID da anamnese infantil.
        anamnese (ChildAnamneseCreate): Dados atualizados enviados pelo cliente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        ChildAnamneseResponse: Registro atualizado.

    Raises:
        HTTPException: Caso o ID não exista.
    """
    atualizado = await atualizar_child_anamnese(id, anamnese, workspace_id, db)
    if not atualizado:
        raise HTTPException(status_code=404, detail="Anamnese não encontrada")
    return atualizado


# DELETE
@router.delete("/{id}")
async def deletar(id: int, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):  
    """
    Remove uma anamnese infantil do banco de dados.

    Args:
        id (int): ID da anamnese infantil.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        dict: Mensagem indicando sucesso da exclusão.

    Raises:
        HTTPException: Caso o ID não exista.
    """
    sucesso = await deletar_child_anamnese(id, workspace_id, db)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Anamnese não encontrada")
    return {"message": "Anamnese excluída com sucesso"}


# READ - buscar por paciente_id
@router.get("/paciente/{paciente_id}", response_model=list[ChildAnamneseResponse])
async def buscar_por_paciente(paciente_id: int, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Lista todas as anamneses infantis de um paciente específico.

    Args:
        paciente_id (int): ID do paciente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[ChildAnamneseResponse]: Lista de anamneses associadas ao paciente.
    """
    return await buscar_child_anamneses_por_paciente(paciente_id, workspace_id, db)
