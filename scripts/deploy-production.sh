#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="$PROJECT_DIR/compose.production.yml"
ENV_FILE="$PROJECT_DIR/.env.production"

cd "$PROJECT_DIR"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE" >&2
  exit 1
fi

if docker image inspect portfolio-app:latest >/dev/null 2>&1; then
  docker image tag portfolio-app:latest portfolio-app:rollback
fi

docker compose -f "$COMPOSE_FILE" config --quiet
docker compose -f "$COMPOSE_FILE" build app migrate
docker compose -f "$COMPOSE_FILE" run --rm migrate
docker compose -f "$COMPOSE_FILE" up -d --no-deps app

for attempt in {1..30}; do
  health="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}starting{{end}}' portfolio-app 2>/dev/null || true)"
  if [[ "$health" == "healthy" ]]; then
    docker compose -f "$COMPOSE_FILE" ps
    exit 0
  fi
  if [[ "$health" == "unhealthy" ]]; then
    docker compose -f "$COMPOSE_FILE" logs --tail=100 app
    exit 1
  fi
  sleep 2
done

docker compose -f "$COMPOSE_FILE" logs --tail=100 app
echo "portfolio-app did not become healthy in time" >&2
exit 1
