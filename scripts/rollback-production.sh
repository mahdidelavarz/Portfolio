#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="$PROJECT_DIR/compose.production.yml"

if ! docker image inspect portfolio-app:rollback >/dev/null 2>&1; then
  echo "No portfolio-app:rollback image is available" >&2
  exit 1
fi

docker image tag portfolio-app:rollback portfolio-app:latest
docker compose -f "$COMPOSE_FILE" up -d --no-deps --force-recreate app
docker compose -f "$COMPOSE_FILE" ps app
