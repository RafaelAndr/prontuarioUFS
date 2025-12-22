from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    token: str
    
class UserCreate(BaseModel):
    name: Optional[str] = None
    email: EmailStr
    password: str
    
    
class UserCreateResponse(BaseModel):
    id: str
    email: EmailStr
    name: Optional[str] = None

    class Config:
        from_attributes = True
    
    
class UserResponse(BaseModel):
    id: str
    email: EmailStr
    name: Optional[str] = None

    class Config:
        from_attributes = True