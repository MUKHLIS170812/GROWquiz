# G.R.O.W. Quiz — Next.js

A 10-question quiz about the G.R.O.W. project (App Router, no extra
dependencies beyond Next/React).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/quiz`.

## Structure

- `app/quiz/page.js` — the quiz component (client component, holds all state)
- `app/quiz/questions.js` — the 10 questions; edit this file to change content
- `app/quiz/quiz.module.css` — scoped styling, matches the G.R.O.W. green/cream theme
- `public/logos/` — SBP Integrasi Batu Rakit crest + Synergy logo (backgrounds removed)

## Deploy

Push to a GitHub repo and import it in Vercel, or run:

```bash
npx vercel
```

## Dropping into an existing Next.js site (e.g. the G.R.O.W. site on Vercel)

Copy `app/quiz/` and `public/logos/` into the existing project's `app/` and
`public/` folders — it's self-contained and won't collide with existing
routes as long as nothing else uses `/quiz`.
