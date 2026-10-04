# Plan: usernames, server-side lab results, combined leaderboard, homepage section

Status: **waiting for approval**. Nothing in this plan has been implemented yet.

This file is the hand-off for a new session running on the server. It holds the
original request, the plan, and four choices the owner still has to confirm.
Do not start writing code until the owner approves the plan and answers the
choices in the last section.

## Where things stand

- The lab at `/challenges/lab` is merged into `main` and stores progress in
  localStorage only (key `frontend-lab:v1`).
- The quiz, `/leaderboard` and `/my-progress` use the database through a random
  visitor UUID in the HttpOnly `challenge_visitor_id` cookie. A visitor can set an
  optional, non-unique display name after the first answer.
- Work on a new branch: `feature/lab-accounts`.

Files to read before starting:

- `src/db/schema.ts`, `src/db/index.ts`, `drizzle/0000_dizzy_killmonger.sql`
- `src/lib/visitor.ts`, `src/lib/api.ts`
- `src/lib/challenges/service.ts`, `src/lib/challenges/time.ts`
- `src/app/api/me/**`, `src/app/api/leaderboard/route.ts`,
  `src/app/api/challenges/[slug]/answer/route.ts`
- `src/components/challenges/LeaderboardClient.tsx`, `ProgressClient.tsx`,
  `DisplayNamePrompt.tsx`, `QuestionExperience.tsx`
- `src/components/server/ChallengesPreview.server.tsx`
- Lab: `src/lib/lab/engine.ts`, `src/lib/lab/playable.ts`,
  `src/lib/lab/simulators/`, `src/data/lab-validator.ts`,
  `src/components/lab/useLabState.ts`, `labStorage.ts`, `LabExperience.tsx`

## The request

### 1. Identity (not a full login)

- Username is required to save any result, and unique case-insensitively.
  3–20 chars: Persian or Latin letters, digits, underscore. Trim, normalize
  Arabic/Persian ye and kaf, reject a small reserved list (admin, mahdi, ...).
- It stays bound to the existing HttpOnly visitor cookie. No password, no email.
- Do not gate the pages. Anyone can play. Ask for the username at the first moment
  a result would be saved (first lab run or first quiz answer), in a small dialog,
  then save the pending result. Replace the optional `DisplayNamePrompt` with this.
- Recovery code for other devices: generated server-side when the username is
  claimed (about 10 chars, unambiguous alphabet), shown once with a copy button and
  a clear "save this" message, stored only as a hash. A "قبلاً اسم ثبت کرده‌ام" form
  takes username + code and rebinds the cookie to that visitor. Rate-limit attempts
  per IP and per username. The user can generate a new code from `/my-progress`.
- Migration: add a unique index on `lower(display_name)`. For existing duplicate
  names keep the earliest visitor and set the others to null so they are asked
  again. Existing answers must be preserved. Write the drizzle migration and tell
  the owner exactly what it does to existing rows before it is run.

### 2. Lab results on the server

- New table `lab_results`: `visitor_id`, `level_id`, `best_config` (jsonb),
  `best_score`, `passed`, `runs`, `hints_used`, `solution_viewed`,
  `first_passed_at`, `updated_at`. Unique on (`visitor_id`, `level_id`).
- `POST /api/lab/[levelId]/run` receives only the config plus `hints_used` and
  `solution_viewed`. The server validates the config against the level's option
  space and computes the score itself with the engine in `src/lib/lab`. Never
  trust a score from the client. Keep the best score per level.
- If `solution_viewed` is true for that visitor and level, the ticket counts as
  closed in progress but earns no leaderboard points, permanently for that level.
- On load, merge server results into the lab state. localStorage stays as the
  cache for draft code and for visitors who have no username yet.

### 3. Leaderboard and progress

- One monthly score, same Asia/Tehran month boundaries as now:
  quiz correct answer = 1 point; lab ticket = `round(best_score / 100 * 5)` points,
  counted in the month of `first_passed_at`.
- Leaderboard rows show total points and a small breakdown (quiz / lab).
  Keep the existing tie-break logic, extended sensibly; explain the choice.
- `/my-progress` gets two sections: lab tickets (status, best optimality %, runs,
  hints) and the existing quiz history. Lab section first.
- Update the README sections that describe visitors, routes and the leaderboard.

### 4. Homepage section

- Redesign the `#challenges` section (`ChallengesPreview.server.tsx`) to introduce
  the lab as the main thing: what it is in one sentence, and a small animated
  preview that shows the real idea, e.g. a before/after request waterfall or
  main-thread timeline shrinking, built from the lab's own panel components or a
  light copy of them. No screenshots, no stock illustration.
- One primary button to `/challenges/lab` and a quiet text link to the quiz.
- Match the homepage's existing visual language, respect `prefers-reduced-motion`,
  and keep the section server-rendered apart from the small animated part.

### Acceptance

- `lint`, `typecheck`, `validate:challenges`, `validate:lab` and `build` pass.
- Two browsers cannot claim the same username in different letter case.
- A forged request with a made-up score cannot change the leaderboard.
- Recovery flow works from a clean browser profile.
- Old quiz URLs, existing answers and existing leaderboard entries still work.

## The plan

### 1. Identity

- **Schema:** `display_name` stays as the username column. `visitors` gains
  `recovery_code_hash` and `name_claimed_at`. A unique index on
  `lower(display_name)` enforces uniqueness in the database, so two simultaneous
  claims cannot both succeed.
- **Username rules:** one shared function in `src/lib/username.ts`, used by client
  and server: trim, convert Arabic ي/ك to Persian ی/ک, 3–20 characters of Persian
  or Latin letters, digits and underscore, and a reserved list.
- **Recovery code:** 10 characters from an alphabet without 0/O/1/I/L, shown once
  as `XXXXX-XXXXX` with a copy button. Only a salted scrypt hash is stored
  (Node's built-in `crypto`, no new dependency).
- **Rate limiting:** a small `recovery_attempts` table. 5 failed attempts per
  username per 15 minutes and 20 per IP per hour. The IP comes from
  `X-Forwarded-For` and is stored hashed.
- **Endpoints:**
  - `POST /api/me/username` claims a name and returns the code once.
  - `POST /api/me/recover` takes username and code and rebinds the cookie.
  - `POST /api/me/recovery-code` generates a new code.
  - `PATCH /api/me/display-name` is removed.
- **Dialog:** one `UsernameDialog` with two tabs (claim, and
  "قبلاً اسم ثبت کرده‌ام") replaces `DisplayNamePrompt` in the lab and the quiz.

### 2. Lab results on the server

- **Table:** `lab_results`, exactly as specified in the request.
- **Run endpoint:** `POST /api/lab/[levelId]/run` checks the config against the
  level's fields and options (exact field set, each value one of that field's
  options, required fields filled), then scores it with the existing engine.
  The request has no score field at all, so there is nothing to forge. Unknown or
  locked levels return 404.
- **Stored values:** best score and config are kept; `runs` increments;
  `hints_used` only goes up; `solution_viewed` and `passed` never go back to
  false; `first_passed_at` is set once.
- **Loading:** `GET /api/lab` returns the visitor's results, and `useLabState`
  merges them over localStorage on load.
- **After a claim or recovery:** the pending run is saved, and any other tickets
  already solved locally are sent as configs so the server scores them too.

### 3. Leaderboard and progress

- **Points:** quiz correct answers plus `round(best_score / 100 * 5)` per lab
  ticket, counted in the Tehran month of `first_passed_at`. A ticket with
  `solution_viewed` earns 0.
- **Tie-break:** points, then accuracy, then the time the total was reached, then
  visitor id. This is the same order as today.
  - Accuracy is extended to "points earned ÷ points possible on what you attempted
    this month": 1 per quiz answer, 5 per passed lab ticket.
  - For a quiz-only player this equals today's accuracy, so existing rankings do
    not change.
- **Rows:** total points with a small quiz / lab breakdown.
- **`/my-progress`:** lab section first (status, best %, runs, hints), then quiz
  history, plus a "new recovery code" button. The username cannot be edited after
  it is claimed.

### 4. Homepage section

- The section stays a server component, in English like the rest of the homepage:
  one sentence about the lab, a primary button to `/challenges/lab`, and a quiet
  link to the quiz.
- The only client part is a small request waterfall that animates between before
  (2,860ms) and after (1,160ms). Its numbers come from the real waterfall
  simulator, computed on the server and passed as plain data. With reduced motion
  it shows both states statically.

### 5. Migration `0001`

In this order:

1. Add the two `visitors` columns and create `lab_results` and
   `recovery_attempts`.
2. Normalize existing names: trim, and ي/ك → ی/ک.
3. For each group of names equal under `lower()`, keep the visitor with the
   earliest `created_at` and set `display_name = NULL` on the others.
4. Create the unique index on `lower(display_name)`.

No row in `answers` or `visitors` is deleted. The visitors whose name is cleared
keep all their answers; they drop off the public leaderboard until they pick a new
name. The final SQL must be shown to the owner, with this description repeated,
before it is run against the real database.

Generate the migration with `npm run db:generate` (drizzle-kit needs
`DATABASE_URL` set but does not connect for `generate`), then add steps 2 and 3 by
hand before the index statement.

### 6. README

Update the visitors, routes and leaderboard sections.

## Testing on the server

- Use a separate, throwaway database for testing, never the production one.
  Point `DATABASE_URL` at it, run the migrations, and seed a few visitors with
  duplicate names in different letter case to check step 3 of the migration.
- Check each acceptance item directly:
  - Claim `Ali` in one browser profile and `ali` in another; the second must fail.
  - Send `POST /api/lab/l1/run` with an extra `score: 100` field and a weak config;
    the stored score must be the engine's score.
  - Claim a name, copy the code, open a clean profile, recover, and confirm the
    progress and leaderboard row follow.
  - Open an old quiz URL and confirm an answer stored before the migration still
    shows.
- `next build` writes to the same `.next` folder as `next dev`. Stop any running
  dev server before building, or the dev server starts returning 500s.

## Choices the owner must confirm

Each has a recommendation. Confirm or change them before work starts.

1. **Quiz, when someone closes the username dialog.** The correct answer only
   exists on the server, so checking an answer without saving it would let people
   peek and then answer correctly under a name.
   - Recommended: keep today's behaviour. The answer is still stored against the
     anonymous cookie and stays final, but it stays off the leaderboard until a
     name is claimed.
   - The lab is different: a dismissed dialog means the run stays in localStorage
     only, and a small "ذخیره نمی‌شه — ثبت اسم" note replaces repeated prompts.

2. **Existing names that break the new rules** (for example names with a space
   like "مهدی دلاور", or longer than 20 characters).
   - Recommended: leave them as they are; only duplicates get cleared.
   - Alternative: clear them all so everyone is asked again.

3. **Recovering on a new device.**
   - Recommended: the browser simply switches to the recovered visitor, without
     merging in anything the anonymous browser had saved on the server. Local lab
     progress is still re-sent as configs and scored by the server.

4. **Test database.** Confirm which throwaway database the server session may
   create and use (for example a new database on the existing PostgreSQL service,
   with its own role), and that the production database is off limits.

## Known limit

`hints_used` and `solution_viewed` are reported by the browser. Scores cannot be
forged, but someone who edits their requests could hide that they viewed the
solution. Say so if this should be tightened in this step.
