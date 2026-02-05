#!/bin/bash
set -e  # Para se der erro

echo "🔄 Aplicando migrations..."
poetry run alembic upgrade head

echo "🚀 Iniciando servidor..."
poetry run uvicorn src.main:app --host 0.0.0.0 --port ${PORT:-8080}
