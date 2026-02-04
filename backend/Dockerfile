FROM python:3.12-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y curl build-essential

# Instalar poetry
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:$PATH"

# Copiar arquivos do poetry
COPY pyproject.toml poetry.lock ./

# Instalar dependências (sem tentar instalar o projeto)
RUN poetry install --no-root 

# Copiar o código do backend
COPY . .

# Tornar script executável
RUN chmod +x start.sh

EXPOSE 8080

# Rodar migrations e depois iniciar servidor
CMD ["poetry", "run", "bash", "start.sh"]
