# AGENTS.md — publishing rules for AI agents working on this site

This repository is the source of **kenmorozumi.com**, Ken Morozumi's
personal hub. It is maintained with the help of AI agents (Muse,
Claude, Gemini, and others). Whoever you are: follow the rules below.
They exist so that any agent can add content safely without breaking
the site, and so that no agent ever needs another agent's credentials.

## The one rule that matters most

**Content is data, not code.** News items, research reports and
portfolio pieces live as Markdown files in Astro content collections.
To publish something, you add ONE Markdown file. You never edit a
layout, component or page file in order to add content. If adding an
item seems to require a code change, stop — you are doing it wrong.

## Repository structure

```
src/
  content.config.ts        Collection schemas (news / reports / portfolio)
  content/
    news/                  One .md file per news item
    reports/               One .md file per research report
    portfolio/             One .md file per portfolio piece
  data/site.ts             Shared facts: name, tagline, channels (single source of truth)
  components/              Page building blocks (take a `lang` prop)
  layouts/Base.astro       Header, nav, footer — do not touch for content work
  pages/
    ja/  en/               One folder per language; every page exists in both
    index.astro            Root language redirect
wrangler.jsonc             Cloudflare deploy config (assets = ./dist)
```

The site is bilingual. Every content item exists twice: a Japanese
file (`lang: ja`) and an English file (`lang: en`), with the same
file-name slug apart from the `-ja` / `-en` suffix. Each language's
pages only render items in their own language.

## Frontmatter schemas

Defined in `src/content.config.ts`. The build fails if a file does
not match its schema — that failure is your friend: read the error,
fix the frontmatter, rebuild.

### news — `src/content/news/YYYY-MM-DD-<slug>-<lang>.md`

```yaml
---
title: "Headline, conclusion first"
date: 2026-11-23
sector: "AI data centres"        # short label, consistent wording
summary: "Two or three sentences with the key numbers and units."
externalUrl: "https://www.threads.com/@moro.ken.jp"   # where the full text lives
lang: ja                         # or en
---
```

### reports — `src/content/reports/YYYY-MM-DD-<slug>-<lang>.md`

```yaml
---
title: "Report title"
company: "Hitachi, Ltd."
ticker: "6501"                   # exchange code as a string
sector: "Transformers & Power Equipment"
date: 2026-11-16
type: initiation                 # initiation | update — nothing else
externalUrl: "/ja/fieldnotes/"   # full text location (use the matching language path)
lang: ja
---
```

### portfolio — `src/content/portfolio/YYYY-MM-DD-<slug>-<lang>.md`

```yaml
---
title: "Piece title"
date: 2026-11-21
kind: "Book / long-form"         # Book, Database, Dashboard, …
summary: "What it is and why it matters, in two or three sentences."
externalUrl: "https://note.com/moro_ken_jp"
lang: ja
---
```

The Markdown body below the frontmatter is optional for index pages
(a one-paragraph note is customary). Lists, the homepage's latest
news, and the featured report all sort by `date`, newest first —
there is nothing else to update when you add a file.

## Style rules for content

- Numbers always carry units and, where relevant, a comparison
  (year-on-year, versus plan, versus consensus). Never publish a bare
  number.
- No invented facts. If a figure cannot be verified, leave the item
  unpublished rather than guessing.
- Research reports make **no investment recommendations** (no
  buy/sell calls, no target prices presented as the site's own view).
- Japanese text: complete sentences with natural endings — no
  headline-style noun fragments （体言止め） in body copy.
- Keep `title` and `summary` factual; the analysis and the judgement
  are Ken's, not the publishing agent's.

## Build and deploy facts

- Framework: Astro 5 + Tailwind CSS 4. Package manager: npm.
- Build command: `npm run build` → static output in `dist/`.
- Deploy: Cloudflare Workers with static assets (`wrangler.jsonc`,
  assets directory `./dist`). **Pushing to `main` triggers an
  automatic build and deploy** — a merged commit is a published
  change. There is no staging step.
- Before pushing anything, run `npm run build` locally and confirm
  it passes, and check the page count did not drop unexpectedly.

## Credential rule — read this before your first push

- Every agent uses **its own** GitHub fine-grained personal access
  token, scoped to this single repository (`kenmorowork/personal-site`)
  with **Contents: Read and write** and nothing more.
- Tokens are never shared between agents, never pasted into chat,
  issues or documents, never stored in this repository, and never
  committed — not in code, not in config, not in a `.env` file.
- If you do not have a token of your own, prepare your commits
  locally and hand them to Ken; do not borrow another agent's
  credential and do not ask for one in a channel that logs text.
- When a token is no longer needed, tell Ken so he can revoke it.

## What not to do

- Do not rename the collections, change the schemas, or restructure
  `src/pages/` as part of a content task. Structural changes are
  separate, deliberate work.
- Do not change the firm name: it is **J-Core Fundamental Research**.
- Do not publish a real photograph of Ken anywhere on this site;
  profile imagery is the Ragdoll cat photo only.
- Do not add analytics, trackers or third-party embeds without
  Ken's explicit instruction.
