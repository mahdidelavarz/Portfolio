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
npm run lint
npm run typecheck
npm run build
```

## Frontend Challenges

Public routes:

- `/challenges` — published challenge list and filters
- `/challenges/[slug]` — question, answer and explanation
- `/leaderboard` — current-month leaderboard
- `/my-progress` — progress stored for the current browser visitor

API routes:

- `GET /api/challenges`
- `GET /api/challenges/[slug]`
- `POST /api/challenges/[slug]/answer`
- `GET /api/me`
- `PATCH /api/me/display-name`
- `GET /api/me/progress`
- `GET /api/leaderboard`

Visitors are identified by a random UUID in the HttpOnly `challenge_visitor_id` cookie. There is no account or cross-device sync. Clearing browser data creates a new visitor and makes the previous history inaccessible from that browser.

The monthly leaderboard is calculated directly from answers. Month boundaries use the `Asia/Tehran` time zone. Ranking is ordered by correct answers, accuracy and the time at which the final correct score was reached.

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

## Database migrations

The initial migration is committed under `drizzle/`. Apply committed migrations with:

```bash
npm run db:migrate
```

After changing `src/db/schema.ts`, generate a new migration with `npm run db:generate`, inspect the SQL, then apply it.
