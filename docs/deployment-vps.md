# Production deployment on the VPS

## Architecture

Traffic reaches the shared `linkvault-nginx-1` container on ports 80/443. Nginx reaches `portfolio-app:3000` over the external `web-proxy` network. The Node 22 LTS application reaches `nazishop-db:5432` over the external `nazishop_default` network. Portfolio does not publish an application or database port.

The production Compose file is `compose.production.yml`. Runtime configuration is read from the gitignored `.env.production` file:

```env
NODE_ENV=production
DATABASE_URL=postgresql://portfolio_user:URL_ENCODED_PASSWORD@nazishop-db:5432/portfolio_db
```

The visitor identity is stored in an HttpOnly, Secure, SameSite=Lax cookie. It is browser-specific: clearing browser data loses access to the previous identity and there is no cross-device sync.

## Deploy and operations

Run these commands from `/home/mahdi/projects/Portfolio`:

```bash
# Full validated deployment, including committed migrations
./scripts/deploy-production.sh

# Status and logs
docker compose -f compose.production.yml ps
docker compose -f compose.production.yml logs -f --tail=100 app

# Restart only Portfolio
docker compose -f compose.production.yml restart app

# Explicit migration
docker compose -f compose.production.yml run --rm migrate

# Roll back the application image saved by the previous deploy
./scripts/rollback-production.sh
```

The deploy script does not require Node.js on the host. Its Docker build runs challenge validation, ESLint, TypeScript checking, and the production Next.js build before migration or container replacement.

Rollback changes only application code. Database migrations must remain backward-compatible or be reverted with a reviewed migration; never delete the PostgreSQL volume.

The health endpoint is `https://mahdidelavar.ir/api/health`. It verifies both Next.js and a lightweight database query without returning connection details.

## Nginx, TLS, and DNS

The shared server block is `/home/mahdi/projects/linkvault/nginx/conf.d/mahdidelavar.ir.conf`. It proxies to `portfolio-app:3000`. TLS files are mounted from `/home/mahdi/projects/linkvault/nginx/ssl/mahdidelavar`.

Validate and reload without recreating any container:

```bash
docker exec linkvault-nginx-1 nginx -t
docker exec linkvault-nginx-1 nginx -s reload
```

Before changing DNS, test the VPS directly:

```bash
curl --resolve mahdidelavar.ir:443:31.171.101.32 https://mahdidelavar.ir/api/health
curl -I --resolve www.mahdidelavar.ir:443:31.171.101.32 https://www.mahdidelavar.ir/
```

After all checks pass, set these Pars Pack records and keep Vercel active until propagation completes:

```text
A  @    31.171.101.32
A  www  31.171.101.32
```

The current certificate covers both names and expires on 2026-10-28. Renewal is manual under the server's current certificate workflow. Replace `fullchain.crt` and `private.key`, restrict the key to mode `600`, run `nginx -t`, and reload Nginx. Schedule a renewal reminder well before expiry.

## Database backup

Create a host directory with restricted access, then make a compressed logical backup:

```bash
mkdir -p /home/mahdi/backups/portfolio
chmod 700 /home/mahdi/backups/portfolio
docker exec nazishop-db pg_dump -U portfolio_user -d portfolio_db -Fc > /home/mahdi/backups/portfolio/portfolio_db_$(date -u +%Y%m%dT%H%M%SZ).dump
```

Add a daily cron only after choosing retention and off-server storage. Periodically test restoration into a temporary database. Never place backups, passwords, or `.env.production` in Git.

## Database provisioning reference

`node_user` is an administrative superuser and is used only to provision the database. The application and migrations use the non-superuser owner `portfolio_user`, which has no `CREATEDB` or `CREATEROLE` privileges and owns only Portfolio objects. PostgreSQL is not added to `web-proxy` and no new database port is published.

PostgreSQL grants database-level `CONNECT` to `PUBLIC` by default. Consequently, `portfolio_user` has no schema/table privileges in `ecommerce`, but database-session isolation is not absolute. Removing that inherited `CONNECT` requires changing the shared NazyShop database ACL; do so only after auditing every role that depends on that database.
