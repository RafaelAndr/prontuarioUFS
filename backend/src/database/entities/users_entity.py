from sqlalchemy import (
    Column, 
    String, 
)
import uuid
from src.database.connection import Base
from sqlalchemy.orm import relationship, Mapped, mapped_column

class User(Base):
    __tablename__ = 'users'

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)
    
    pacientes = relationship("Paciente", back_populates="user")
    base_anamneses = relationship("BaseAnamnese", back_populates="user")
    child_anamneses = relationship("ChildAnamnese", back_populates="user")
    return_anamneses = relationship("ReturnAnamnese", back_populates="user")
    food_plans = relationship("FoodPlan", back_populates="user")
    recordatory = relationship("Recordatory", back_populates="user")
    
    