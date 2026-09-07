# CLAUDE.md

Landing page for a Hebrew (RTL) house-painting business — "צביעה מקצועית".
Single-page marketing site. The whole product is: show prices, get the visitor to call, WhatsApp, or submit the lead form.

## Commands

```bash
npm install          # deps (verified clean, exit 0)
npm run dev          # Vite dev server on :5173, host:true (LAN-exposed)
npm run build        # client build + SSR build + prerender -> dist/  (NO typecheck)
npm run preview      # serve dist/
npm run lint         # eslint .

npx tsc --noEmit -p tsconfig.app.json    # typecheck — must be run separately
```

**`npm run build` does not typecheck.** `vite build` only transpiles, so type errors ship
silently. The tree is currently clean (`tsc` 0, `eslint` 0, build 0 warnings) — keep it
that way by running `tsc --noEmit` explicitly; the build alone will not tell you.

**The build is three steps, not one** (see `package.json`):

```
vite build                              -> dist/            client bundle
vite build --ssr src/entry-server.tsx   -> dist-ssr/        throwaway Node bundle
node scripts/prerender.mjs              -> dist/index.html  markup injected into #root
```

The third step imports the second's output and runs the component tree in Node, so
**a component that touches the DOM during render now fails the build.** Every browser
API on the page (`localStorage` in `Hero`, `document` in `AccessibilityWidget`) sits
inside an event handler for this reason — handlers never fire during `renderToString`.
Don't move one into a component body or a `useState` initialiser.

## Stack

Vite 5 + React 18 + TypeScript + Tailwind 3. `lucide-react` for icons. No router, no
state library, no tests, no CI.

## Architecture

`src/App.tsx` renders a flat, fixed list of sections. **Visual order ≠ file order** —
`Pricing` is rendered first (above `Hero`) because the price table is the hook:

```
Header · Pricing · Catalog · Hero(form) · Services · About · Faq · Footer · AccessibilityWidget
```

Each section owns its `id` for anchor navigation. Component-local `useState` only;
nothing is shared or lifted.

## Layout

Sections alternate background bands so their edges are visible — the old
white/`gray-50` gradients were indistinguishable:

```
Pricing  photo + bg-white/80     Hero      photo + bg-white/90
Catalog  bg-slate-100 + border   Services  bg-slate-100 + border
About    bg-white                Faq       bg-slate-100 + border
Footer   bg-gray-800
```

Keep no two adjacent sections on the same background. Vertical rhythm is
`py-10 md:py-14`; don't reintroduce `py-20` or `min-h-screen` (Hero had both and forced
an empty viewport). Pricing's `pt-36 md:pt-28` is clearance for the fixed header — tuned
over several commits, leave it alone.

**Anchor clearance is global.** `index.css` sets `scroll-padding-top: var(--header-offset)`
on `html` (6rem, 6.5rem from `md`), so every anchor — including any added later — stops
below the fixed header. Do **not** add `scroll-mt-*` to individual targets; it stacks on
top of this and over-scrolls. If the header's height changes, change `--header-offset`.

Mobile: headings step `text-3xl sm:text-4xl md:*`, cards use `p-5 sm:p-8`, and the mobile
pricing table scrolls inside `overflow-x-auto`. `About` and `Services` are single-column
below `sm` — two columns at 320px left ~92px of content per card.

Rubik's digits are wider than the old fallback font, so text that used to fit no longer
does. The phone number is wrapped in `whitespace-nowrap` for exactly this reason: it was
splitting as `043-220-` / `6365` mid-number.

## Conventions that matter here

- **RTL is the default.** `lang="he" dir="rtl"` on `<html>`, plus `dir="rtl"` on the
  `#app-root` wrapper in `App.tsx`. This inverts
  Tailwind's directional utilities: use `ml-*` for what looks like right spacing, and
  `space-x-reverse` alongside `space-x-*` or the gaps come out backwards.
- **All copy is Hebrew, inline in JSX.** No i18n layer. Don't extract strings.
- **The phone number lives only in `src/contact.ts`.** It exports `PHONE_DIGITS`,
  `PHONE_DISPLAY`, `PHONE_TEL`, `WHATSAPP_LINK` and `WHATSAPP_VIDEO_LINK`; `Header` and
  `Pricing` import them. It was hardcoded 9 times before — don't re-inline it.
  Two WhatsApp openers, not one: `WHATSAPP_LINK` asks for work type / size / city,
  `WHATSAPP_VIDEO_LINK` asks for a walk-through clip instead (the Pricing CTA under
  "רוצה הצעת מחיר מדויקת?", next to the lead-form button, with the what-to-film list
  beneath it). Neither WhatsApp button reports an Ads conversion — `gtag_report_conversion`
  is for `tel:` clicks only.
- **Both navs come from one `navLinks` array** in `Header.tsx`. Don't re-inline the links —
  they drifted before and left three CTAs pointing at an id that never existed. A link may
  carry `highlight: true` (only `#faq` does) — both navs render it as an amber pill.
- The FAQ section is `Faq.tsx`, not `FAQ.tsx`: `eslint-plugin-react-refresh` reads an
  ALL-CAPS export as a constant rather than a component and warns on the file.
- `React` is only imported where `React.*` types are used (`Header`, `Hero`).
  `jsx: react-jsx` makes the import unnecessary for JSX alone, and `noUnusedLocals` will
  fail the typecheck if you add it back.
- Tailwind config extends `primary`/`accent` color scales and an `xs: 375px` screen —
  but the components use raw `blue-600`/`green-600` instead. Match the surrounding code.

## SEO

The domain is a **placeholder** (`https://www.example.co.il`). It is written in three
places and all three must change together:

```
src/seo.ts          SITE_URL          -> canonical/og:url/@id in the JSON-LD
index.html          the SEO block     -> canonical, og:url, og:image, twitter:image
public/sitemap.xml  <loc>             -> and the Sitemap: line in public/robots.txt
```

**Static `<meta>` in `index.html`, structured data from React.** WhatsApp, Facebook and
Twitter scrape raw HTML and never run JS, so title/description/Open Graph have to be in
`index.html`. The schema.org graph is the exception: it is emitted by
`src/components/JsonLd.tsx` so it can be built from `contact.ts`, `faqs.ts` and
`pricing.ts` rather than being retyped and drifting. Googlebot renders JS before reading
JSON-LD, and every visible word on this page already needs that same pass.

Three data modules exist purely so the page and its structured data cannot disagree:

- `src/seo.ts` — `SITE_URL`, business name/description, `SERVICE_AREA_CITIES`, geo.
  The service-area copy in `Pricing`, `Hero`, `Services`, `About` and `Footer` all
  interpolate `SERVICE_AREA_LABEL`; adding a city to `SERVICE_AREA_CITIES` adds it to
  the footer list and to `areaServed` at once.
- `src/faqs.ts` — the FAQ text, shared by `Faq.tsx` and the `FAQPage` markup. The
  three "כמה עולה לצבוע דירת N חדרים" answers read their numbers from `pricing.ts`
  rather than restating them; `rowFor()` throws if a row it names is gone, and because
  the prerender step runs this module in Node, that throw fails the build.
- `src/pricing.ts` — the rows, `unfurnishedPrice()`, and the `includes` list, shared by
  `Pricing.tsx` and the `Offer` markup.

Separate `.ts` files rather than exports from the components, because
`eslint-plugin-react-refresh` warns on non-component exports from a component file.

**One `<h1>`, and it lives in `Pricing`.** `Pricing` renders first in `App.tsx`, so its
heading is the first one in the DOM — that is the page's h1. `Hero`'s headline is an
`<h2>` for exactly this reason. Don't add a second h1.

**FAQ answers are hidden, never unmounted.** `Faq.tsx` renders every answer and toggles
`hidden`; a collapsed answer that does not render is text Google cannot index, and 11 of
the 12 are collapsed on load. Don't put the `{isOpen && ...}` back.

**Images are `.webp`.** `cat1-5`, `image1`, `image2` were 2752px PNGs totalling ~15 MB
for a grid that renders at ~400px; the `.webp` versions are 1200px and total ~440 KB.
The `.png` originals are still in `public/` and still ship to `dist/`, but nothing
references them — delete them when you are sure you won't want to re-derive the WebP.
The Unsplash URLs in `Hero` and `Services` carry `&w=`; without it Unsplash serves the
full-resolution original.

**There is no `<noscript>` block any more.** There used to be one, because `#root` was
empty without JS and it was the only thing a non-rendering crawler could read. Prerender
made it redundant and then harmful: its `<h1>` was a *second* h1 in the shipped HTML,
competing with Pricing's. Don't add it back — the prerendered markup is the fallback now,
and the phone and WhatsApp links in it work with JS off (their `onClick` handlers are the
conversion tracking; the plain `href` still navigates without them).

`public/og-image.jpg` (1200×630) and `public/apple-touch-icon.png` are generated assets,
not photographs; regenerate them if the branding changes.

**The page is prerendered.** `scripts/prerender.mjs` renders `<App />` with
`react-dom/server` and injects the markup into `dist/index.html`; `main.tsx` calls
`hydrateRoot` when `#root` already has children and `createRoot` when it doesn't, so
`npm run dev` (empty `#root`) and the built page both work off the same entry. No
headless browser and no new dependency — `react-dom/server` ships with React.

One known wrinkle: `Footer.tsx` renders `new Date().getFullYear()`, which prerender
freezes at build time. A build served across a New Year boundary shows the old year and
logs a hydration text mismatch (React patches the text and carries on). A rebuild fixes
it; if that ever matters more than it does today, move the year out of render.

**Still not done:** `/` is one URL. Ranking for "צביעת דירה 3 חדרים מחיר", "צביעת בית"
and per-city queries at the same time needs separate pages, which needs a router — a
product decision, not a bug. See `docs/WORK-LOG.md`.

## Conversion tracking — read before touching phone buttons

`index.html` defines two globals, both typed for TS in `src/vite-env.d.ts`:
`gtag_report_conversion(url)` for phone clicks and `gtag_report_lead()` for the lead
form. There is no thank-you page on this single-page site, so `Hero.tsx` calls
`gtag_report_lead()` after a successful submit; it swallows its own errors so a blocked
gtag.js can never break the form's success path. Phone links call it from `onClick` after `e.preventDefault()`,
so **the function is solely responsible for performing the `tel:` navigation.**
It fires from gtag's `event_callback` *and* from a 1s `setTimeout`, guarded by a
`navigated` flag — do not remove the timeout, it is the only thing that makes the phone
button work when `gtag.js` is blocked. See `docs/ERROR-AUDIT-2026-09-03.md` §4.

One gtag.js loader serves three destinations: `AW-1060439344`, `AW-951047760` and the
GA4 property `G-QQCH0DE4P6`. **Never add a second loader script** — one Google tag per
page; add a `gtag('config', ...)` line instead. `gtag_report_conversion` fires the same phone
click at both Ads accounts, each with its own label: `AW-1060439344/lrJNCNDhfRCwitT5Aw`
and `AW-951047760/9csuCL2n87AaENCsv8UD`. The lead-form conversion is a separate action
in the newer account, `AW-1060439344/qa-zCN-ZqVkQsIrU-QM`. Only the second carries `event_callback`; the
1s timeout is what actually guarantees the `tel:` navigation.

## Lead flow

The form in `Hero.tsx` POSTs to FormSubmit at `LEAD_EMAIL` (assafbiton@gmail.com), with
`david82761@gmail.com` on `_cc`; both addresses and the fixed `_subject` live in
`src/contact.ts`. FormSubmit requires a one-time activation click on the first mail it
sends to a new recipient — until that is done, submissions do not arrive. Ticket numbers
come from `localStorage` — per-browser, so they are not unique across visitors.

**Leads are not persisted anywhere** — email only. `supabase/migrations/` and the `.env`
vars still exist, but the `@supabase/supabase-js` dependency was removed since nothing
imported it. Wiring the form to Supabase is an open product decision, not a bug; run
`npm i @supabase/supabase-js` if you take it on.

`.env` is untracked (see `.env.example`). The anon key remains in git history — it is a
client-side key so this is not urgent, but rotate it if you ever want it gone.

## Known state

`docs/ERROR-AUDIT-2026-09-03.md` — full audit, all 16 findings fixed and verified.
`docs/WORK-LOG.md` — history reconstructed from 73 commits, plus what changed and why.

Two things worth knowing before you touch the pricing section: the background was
`/painter-bg.jpg`, an image **never committed to this repo**, now pointed at `/image2.png`
as a stand-in — swap in a real one if you have it. And roughly half of all commits touch
`Pricing.tsx`, with columns and CTA geometry each reverted at least once, so check
`git log` on that file before "fixing" its layout.
