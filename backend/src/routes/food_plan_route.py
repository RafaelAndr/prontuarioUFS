from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from src.database.entities.paciente_entity import Paciente
from fastapi.responses import StreamingResponse

from src.models.food_plan_model import FoodPlanCreate, FoodPlanResponse
from src.services.food_plan_service import (
    cadastrar_food_plan,
    listar_food_plans,
    buscar_food_plan,
    atualizar_food_plan,
    deletar_food_plan,
    buscar_food_plans_por_paciente
)
from src.database.connection import get_db
from src.utils.food_plan_pdf import gerar_pdf_food_plan
from src.middleware.auth_middleware import get_current_user, get_current_workspace_validation
from src.database.entities.users_entity import User

router = APIRouter(prefix="/food-plans", tags=["FoodPlans"])


# CREATE
@router.post("/cadastrar", response_model=FoodPlanResponse)
async def cadastrar(plan: FoodPlanCreate, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Cadastra um novo plano alimentar.

    Args:
        plan (FoodPlanCreate): Dados enviados pelo cliente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        FoodPlanResponse: Plano alimentar criado.

    Raises:
        HTTPException: Se ocorrer erro interno ao salvar no banco.
    """
    try:
        return await cadastrar_food_plan(plan, current_user.id, workspace_id, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# READ - listar todos
@router.get("/", response_model=list[FoodPlanResponse])
async def listar(current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Lista todos os planos alimentares cadastrados.

    Args:
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[FoodPlanResponse]: Lista completa de planos.
    """
    return await listar_food_plans(workspace_id, db)


# READ - buscar por id
@router.get("/{id}", response_model=FoodPlanResponse)
async def buscar(id: int, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Busca um plano alimentar pelo ID.

    Args:
        id (int): ID do plano alimentar.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        FoodPlanResponse: Plano encontrado.

    Raises:
        HTTPException: Caso o ID não exista.
    """
    plano = await buscar_food_plan(id, workspace_id, db)
    if not plano:
        raise HTTPException(status_code=404, detail="Plano alimentar não encontrado")
    return plano


# READ - buscar por paciente_id
@router.get("/paciente/{paciente_id}", response_model=list[FoodPlanResponse])
async def buscar_por_paciente(paciente_id: int, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Lista todos os planos alimentares associados a um paciente específico.

    Args:
        paciente_id (int): ID do paciente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[FoodPlanResponse]: Planos do paciente.
    """
    return await buscar_food_plans_por_paciente(paciente_id, workspace_id, db)


# UPDATE
@router.put("/{id}", response_model=FoodPlanResponse)
async def atualizar(id: int, plano: FoodPlanCreate, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Atualiza um plano alimentar existente.

    Args:
        id (int): ID do plano alimentar.
        plano (FoodPlanCreate): Dados atualizados enviados pelo cliente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        FoodPlanResponse: Registro atualizado.

    Raises:
        HTTPException: Caso o plano não seja encontrado.
    """
    atualizado = await atualizar_food_plan(id, plano, workspace_id, db)
    if not atualizado:
        raise HTTPException(status_code=404, detail="Plano alimentar não encontrado")
    return atualizado


# DELETE
@router.delete("/{id}")
async def deletar(id: int, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Remove um plano alimentar do banco de dados.

    Args:
        id (int): ID do plano alimentar.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        dict: Mensagem de confirmação.

    Raises:
        HTTPException: Caso o plano não exista.
    """
    sucesso = await deletar_food_plan(id, workspace_id, db)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Plano alimentar não encontrado")
    return {"message": "Plano alimentar excluído com sucesso"}


# GERAR PDF
@router.get("/{id}/pdf")
async def gerar_pdf(id: int, current_user: User = Depends(get_current_user), workspace_id: str = Depends(get_current_workspace_validation), db: Session = Depends(get_db)):
    """
    Gera e retorna o PDF de um plano alimentar.

    Args:
        id (int): ID do plano alimentar.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        StreamingResponse: PDF do plano alimentar.

    Raises:
        HTTPException:
            - Se o plano não existir.
            - Se o paciente não existir.
    """
    # Buscar plano
    plano = await buscar_food_plan(id, workspace_id, db)
    if not plano:
        raise HTTPException(status_code=404, detail="Plano alimentar não encontrado")

    # Buscar paciente para obter nome
    paciente = db.query(Paciente).filter(Paciente.id == plano.paciente_id, Paciente.workspace_id == workspace_id).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente não encontrado")

    # Converter para dict
    plano_dict = plano.__dict__.copy()
    plano_dict.pop("_sa_instance_state", None)

    # Gerar PDF com nome do paciente
    buffer = gerar_pdf_food_plan(plano_dict, paciente.nome)

    # Retornar arquivo
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"inline; filename=plano_{paciente.nome}.pdf"
        }
    )
