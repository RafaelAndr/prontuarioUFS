"""
Utilitários para autenticação e criptografia.
Contém funções para hashing de senhas e manipulação de tokens JWT.
"""
from bcrypt import checkpw, hashpw, gensalt
import jwt
import os
from datetime import datetime, timedelta
from fastapi import HTTPException

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica se a senha em texto plano corresponde à senha bcrypt hash.

    Args:
        plain_password (str): Senha em texto plano.
        hashed_password (str): Senha hash bcrypt.

    Returns:
        bool: True se as senhas corresponderem, False caso contrário.
    """
    return checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def hash_password(password: str) -> str:
    """
    Gera um hash bcrypt da senha.

    Args:
        password (str): Senha em texto plano.

    Returns:
        str: Hash bcrypt da senha.
    """
    return hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')

def create_jwt_token(data: dict, expires_delta: timedelta = timedelta(days=7)) -> str:
    """
    Cria um token JWT com os dados fornecidos e expiração.

    Args:
        data (dict): Dados a serem incluídos no payload do token (ex: {"user_id": 123}).
        expires_delta (timedelta): Tempo de validade do token (padrão: 7 dias).

    Returns:
        str: Token JWT gerado.
    """
    secret_key = os.getenv("SECRET_KEY")
    if not secret_key:
        raise ValueError("SECRET_KEY não configurada no arquivo .env")
    
    algorithm = os.getenv("ALGORITHM", "HS256")
    
    # Adiciona expiração ao payload
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    
    token = jwt.encode(to_encode, secret_key, algorithm=algorithm)
    return token

def decode_jwt_token(token: str) -> dict:
    """
    Decodifica um token JWT e retorna o payload.

    Args:
        token (str): Token JWT a ser decodificado.

    Returns:
        dict: Payload do token.

    Raises:
        HTTPException: Se o token for inválido ou expirado.
    """
    secret_key = os.getenv("SECRET_KEY")
    if not secret_key:
        raise ValueError("SECRET_KEY não configurada no arquivo .env")
    
    algorithm = os.getenv("ALGORITHM", "HS256")
    
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")