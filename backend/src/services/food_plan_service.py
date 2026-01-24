from sqlalchemy.orm import Session
from src.database.entities.food_plan_entity import FoodPlan
from src.models.food_plan_model import FoodPlanCreate


# CREATE
async def cadastrar_food_plan(plan: FoodPlanCreate, user_id: str, workspace_id: str, db: Session):
    """
    Cadastra um novo plano alimentar no banco de dados.

    Args:
        plan (FoodPlanCreate): Dados enviados pelo cliente (Pydantic Model).
        user_id (str): ID do usuário que está criando o plano.
        workspace_id (str): ID do workspace onde o plano será salvo.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        FoodPlan: Objeto recém-criado e persistido no banco.
    """
    novo_plan = FoodPlan(**plan.model_dump(exclude_unset=True), user_id=user_id, workspace_id=workspace_id)
    db.add(novo_plan)
    db.commit()
    db.refresh(novo_plan)
    return novo_plan


# READ — listar todos
async def listar_food_plans(workspace_id: str, db: Session):
    """
    Lista todos os planos alimentares cadastrados.

    Args:
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[FoodPlan]: Lista completa de planos alimentares.
    """
    return db.query(FoodPlan).filter(FoodPlan.workspace_id == workspace_id).all()


# READ — buscar por ID
async def buscar_food_plan(id: int, workspace_id: str, db: Session):
    """
    Busca um plano alimentar específico pelo ID.

    Args:
        id (int): ID do plano alimentar.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        FoodPlan | None: Plano encontrado ou None se não existir.
    """
    return db.query(FoodPlan).filter(FoodPlan.id == id, FoodPlan.workspace_id == workspace_id).first()


# READ — buscar por paciente_id
async def buscar_food_plans_por_paciente(paciente_id: int, workspace_id: str, db: Session):
    """
    Busca todos os planos alimentares associados a um paciente.

    Args:
        paciente_id (int): ID do paciente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        list[FoodPlan]: Lista de planos pertencentes ao paciente.
    """
    return db.query(FoodPlan).filter(FoodPlan.paciente_id == paciente_id, FoodPlan.workspace_id == workspace_id).all()


# UPDATE
async def atualizar_food_plan(id: int, dados: FoodPlanCreate, workspace_id: str, db: Session):
    """
    Atualiza um plano alimentar existente com os dados fornecidos.

    Apenas os campos enviados no payload são alterados, mantendo os demais.

    Args:
        id (int): ID do plano alimentar a ser atualizado.
        dados (FoodPlanCreate): Dados enviados pelo cliente.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        FoodPlan | None: Plano atualizado ou None se não encontrado.
    """
    plano = db.query(FoodPlan).filter(FoodPlan.id == id, FoodPlan.workspace_id == workspace_id).first()
    if not plano:
        return None

    for key, value in dados.model_dump(exclude_unset=True).items():
        setattr(plano, key, value)

    db.commit()
    db.refresh(plano)
    return plano


# DELETE
async def deletar_food_plan(id: int, workspace_id: str, db: Session):
    """
    Deleta um plano alimentar do banco de dados.

    Args:
        id (int): ID do plano alimentar a ser removido.
        db (Session): Sessão ativa do banco de dados.

    Returns:
        bool: True se o plano foi deletado, False se não existir.
    """
    plano = db.query(FoodPlan).filter(FoodPlan.id == id, FoodPlan.workspace_id == workspace_id).first()
    if plano:
        db.delete(plano)
        db.commit()
        return True
    return False
