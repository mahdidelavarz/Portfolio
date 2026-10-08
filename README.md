# Mahdi Delavar — Personal Portfolio

Personal portfolio and interactive Frontend Challenges, built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, Drizzle ORM and PostgreSQL.

## Local development

```bash
npm install
cp .env.example .env.local
npm run db:migrate
npm run dev
```

Set `DATABASE_URL` to a PostgreSQL connection string. The database layer uses the standard PostgreSQL protocol and is compatible with providers such as Liara, Neon and Supabase. Use a pooled connection string for serverless deployments.

Useful checks:

```bash
npm run validate:challenges
npm run validate:lab
npm run lint
npm run typecheck
npm run build
```

## Frontend Challenges

Public routes:

- `/challenges` — hub page for the lab and the quiz
- `/challenges/lab` — performance lab: tickets on a simulated shop
- `/challenges/quiz` — published quiz questions and filters
- `/challenges/[slug]` — question, answer and explanation
- `/leaderboard` — current-month leaderboard (quiz + lab)
- `/my-progress` — lab tickets and quiz history of the current visitor

API routes:

- `GET /api/challenges`
- `GET /api/challenges/[slug]`
- `POST /api/challenges/[slug]/answer`
- `GET /api/lab` — the visitor's username and stored lab results
- `POST /api/lab/[levelId]/run` — stores one lab run
- `GET /api/me`
- `POST /api/me/username` — claims a username, returns the recovery code once
- `POST /api/me/recover` — username + recovery code, rebinds the cookie
- `POST /api/me/recovery-code` — replaces the recovery code
- `GET /api/me/progress`
- `GET /api/leaderboard`

### Visitors and usernames

Visitors are identified by a random UUID in the HttpOnly `challenge_visitor_id` cookie. There is no password and no email. Anyone can play without a name; a username is asked for the first time a result would be saved (first lab run or first quiz answer).

- A username is 3–20 characters: Persian or Latin letters, digits and underscore. It is unique case-insensitively (unique index on `lower(display_name)`), Arabic ي/ك are stored as Persian ی/ک, and it cannot be changed after it is claimed. The rules live in `src/lib/username.ts` and are shared by the client and the server.
- Claiming a username returns a recovery code (`XXXXX-XXXXX`) that is shown once and stored only as a salted scrypt hash. On another browser, `/api/me/recover` takes the username and the code and points that browser's cookie at the same visitor. Nothing the anonymous browser had saved on the server is merged; lab progress in localStorage is re-sent and scored again.
- Failed recovery attempts are rate limited: 5 per username per 15 minutes and 20 per IP per hour. The IP is read from `X-Forwarded-For` and stored hashed.
- A quiz answer given without a username is still stored against the cookie and stays final, but it is not on the leaderboard until a name is claimed. Lab runs without a username stay in localStorage only.

### Lab results

The browser sends only the config of a run (plus `hintsUsed` and `solutionViewed`). The server checks the config against the level's fields and options and computes the score with the same engine in `src/lib/lab`, so a score cannot be sent by the client. `lab_results` keeps the best score and its config per visitor and level. `hintsUsed` and `solutionViewed` are reported by the browser and are not verifiable.

### Leaderboard

One monthly score per named visitor, with month boundaries in the `Asia/Tehran` time zone:

- a correct quiz answer is 1 point, counted in the month it was answered;
- a passed lab ticket is `round(best_score / 100 * 5)` points, counted in the month it was first passed. A ticket whose solution was viewed is closed but earns 0 points, permanently.

Ranking is ordered by points, then accuracy, then the time the total was reached. Accuracy is points earned divided by points possible on what was attempted that month (1 per quiz answer, 5 per passed ticket), which for a quiz-only player is the share of correct answers.

## Adding a challenge

All questions live in `src/data/challenges.json`. Copy an existing item and provide a unique `id` and `slug`, exactly four options, a matching `correctOptionId`, explanation steps and an ISO `publishedAt` date. Draft questions and future publication dates are excluded from public pages, metadata and sitemap.

Example outline:

```json
{
  "id": "js-example-001",
  "slug": "javascript-example-001",
  "title": "عنوان سؤال",
  "description": "توضیح کوتاه",
  "technology": "JavaScript",
  "topic": "Scope",
  "difficulty": "intermediate",
  "type": "output",
  "codeLanguage": "javascript",
  "code": "console.log('example')",
  "options": [
    { "id": "a", "label": "A", "content": "..." },
    { "id": "b", "label": "B", "content": "..." },
    { "id": "c", "label": "C", "content": "..." },
    { "id": "d", "label": "D", "content": "..." }
  ],
  "correctOptionId": "a",
  "shortAnswer": "...",
  "explanationSteps": ["..."],
  "correctedCode": null,
  "takeaway": "...",
  "publishedAt": "2026-07-01T00:00:00.000Z",
  "status": "draft",
  "linkedinPostUrl": null
}
```

Run `npm run validate:challenges` before publishing. The correct option and explanation remain server-only until a visitor submits an answer.

## Production deployment

The VPS deployment uses a standalone Next.js image, a dedicated Compose stack, the shared Docker Nginx proxy, and an isolated database/role on the existing PostgreSQL service. See [docs/deployment-vps.md](docs/deployment-vps.md) for the exact deployment, migration, health check, TLS, DNS, backup, rollback, and operational commands.

## Database migrations

Migrations are committed under `drizzle/`. Apply them with:

```bash
npm run db:migrate
```

> **`0001_lab_accounts` deletes data.** It starts with `TRUNCATE TABLE "visitors" CASCADE`, which removes every visitor and every quiz answer, then adds the username index, the recovery columns and the `lab_results` and `recovery_attempts` tables. This was a deliberate reset. Take a backup first if anything in the database should be kept.

After changing `src/db/schema.ts`, generate a new migration with `npm run db:generate`, inspect the SQL, then apply it.
