cd /home/mahdi/projects/Portfolio

./scripts/deploy-production.sh
./scripts/rollback-production.sh

docker compose -f compose.production.yml ps
docker compose -f compose.production.yml restart app
docker compose -f compose.production.yml logs -f --tail=100 app
docker compose -f compose.production.yml run --rm migrate