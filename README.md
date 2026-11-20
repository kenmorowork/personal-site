# Ken Morozumi — Personal Hub Site

A minimal, bilingual (Japanese / English) static site for Ken Morozumi,
sell-side equity analyst in Tokyo. Built with **Astro + Tailwind CSS**,
static output, designed to deploy to **Cloudflare Pages** behind a domain
registered at **Cloudflare Registrar** — the architecture Ken adopted on
2026-11-20. No database, no server code, almost no JavaScript.

## What is built

- **Bilingual trees** — `/ja/` and `/en/`. The root `/` reads the browser
  language and redirects to `/ja/` or `/en/`, with manual language links
  as a fallback. Every page has a JP/EN toggle in the header that jumps
  to the same page in the other language.
- **Pages** (each in both languages):
  - **Home** — name, the role line "JP Equity Analyst (Industrials,
    Materials, others) | Tokyo |", a short intro, a "Where I publish"
    section linking all five profiles (X, Threads, Instagram, Substack,
    note), and a newsletter section marked **Coming soon** (the paid
    newsletter is a future plan, not launched).
  - **About / CV** — analyst profile, coverage areas (industrials,
    materials, energy), and publishing activity (short reports 3×/day,
    long-form Mon/Wed/Sat).
  - **Works / Content** — cards linking the five platforms, plus the
    publishing schedule.
  - **Contact** — custom-domain email placeholder (marked "coming soon")
    and the social links; DMs on X / Threads are the working contact route.
- **Dark mode** — class-based, follows the OS setting on first visit,
  toggle in the header, choice remembered in `localStorage`.
- **Design** — minimal and intellectual: serif display headings, neutral
  palette, single 768px column, system fonts (no webfont downloads).

## Run it locally

```bash
npm install
npm run dev      # local preview
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Placeholders to fill

| Placeholder | Where | Replace with |
|---|---|---|
| `https://example.com` | `astro.config.mjs` → `site` | The real domain, e.g. `https://kenmorozumi.com` |
| `hello@example.com` | `src/data/site.ts` → `EMAIL_PLACEHOLDER` | `hello@<your-domain>` once mail is set up |

Everything else (name, tagline, social links) is already final and lives
in `src/data/site.ts` — edit there and both languages update.

## Domain candidates (lookup only, checked 2026-11-20 via Verisign RDAP)

- **kenmorozumi.com** — RDAP 404 → appears unregistered ✅
- **morozumi-research.com** — RDAP 404 → appears unregistered ✅
- morozumi.com — registered ❌
- moroken.com — registered ❌
- moro-ken.com — registered ❌

(RDAP 404 strongly suggests availability but is not a guarantee — the
registrar's search at purchase time is the final word, and premium
pricing can apply.)

## Launch steps (in order — nothing here is done yet)

1. **Accounts** — Ken creates a Cloudflare account and a GitHub account
   using his new Gmail address. Enable passkey / 2FA on both.
2. **Domain** — Register the chosen domain via **Cloudflare Registrar**
   (at-cost pricing, WHOIS privacy and DNSSEC included). Confirm the
   card on file for auto-renewal.
3. **Push this repo to GitHub** — `git init`, commit, create a private
   (or public) repository and push `~/workspace/personal-site/`.
4. **Cloudflare Pages** — Create a Pages project connected to the GitHub
   repo (framework preset: Astro; build command `npm run build`, output
   `dist`), then attach the custom domain in Pages → Custom domains.
   Fill in the two placeholders above and push again.
5. **Custom-domain email** — Set up **iCloud+ custom domain** (if Ken is
   on iCloud+) or **Zoho Mail Lite**, following their Cloudflare
   integration so SPF / DKIM / DMARC records are added to DNS. Do **not**
   use the free "Cloudflare forwarding + Gmail Send-as" route — Google
   ends third-party "Send mail as" support in January 2027. Test sending
   and receiving at `hello@<domain>`, then update `EMAIL_PLACEHOLDER`.

## Later (Phase D — not built)

- Products / Store pages linking out to external checkout (note /
  Stripe Payment Links for Japanese products; Lemon Squeezy or Gumroad
  for EU-facing digital products, so EU VAT is handled by the merchant
  of record). No payment data ever touches this site.
