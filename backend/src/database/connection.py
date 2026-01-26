from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Pega DATABASE_URL da variável de ambiente
# Se não existir → usa SQLite local
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./prontuario.db")
print("🟢 USANDO BANCO:", DATABASE_URL)

# Detecta se o banco é PostgreSQL
USING_POSTGRES = DATABASE_URL.startswith("postgresql")

# Configurações para PostgreSQL
if USING_POSTGRES:
    connect_args = {
        "sslmode": "require",
        "connect_timeout": 10,
    }
    pool_config = {
        "pool_pre_ping": True,  # Verifica se a conexão está ativa antes de usar
        "pool_recycle": 300,    # Recicla conexões a cada 5 minutos (300 segundos)
        "pool_size": 10,        # Número de conexões no pool
        "max_overflow": 20,     # Conexões extras permitidas
        "pool_timeout": 30,     # Timeout para obter uma conexão do pool
    }
else:
    # connect_args para SQLite
    connect_args = {"check_same_thread": False}
    pool_config = {}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    **pool_config
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
