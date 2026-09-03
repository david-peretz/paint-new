# Work Log

Reconstructed from git history (73 commits, `8700980`..`eef784d`, 2026-02-12 → 2026-09-03)
plus the audit session on 2026-09-03. Newest first.

---

## 2026-09-03 — Error audit (no code changed)

Full read of all 794 lines of `src/`, plus `index.html`, configs, and the SQL migration.
Verified against a live `npm run dev` on `:5173` and a production `npm run build`.

Ran: `npm install` (exit 0) · `tsc --noEmit` (7 errors) · `eslint .` (2 errors) ·
`vite build` (passes, 1 warning) · HTTP checks on all remote + local assets ·
anchor-vs-`id` diff.

**16 findings, none fixed.** Full detail in [ERROR-AUDIT-2026-09-03.md](ERROR-AUDIT-2026-09-03.md).
The three that break the conversion funnel:

1. `href="#contact"` × 3 — no element with `id="contact"` exists. The form is
   `id="contact-form"`. The main pricing CTA is one of the three dead links.
2. `/painter-bg.jpg` — **never committed to this repo.** `git log --all -- "*painter-bg*"`
   returns nothing, yet `Pricing.tsx` has referenced it since `a76a77a` (2026-03-15).
   The pricing background has been broken from the moment it was written.
3. The Google Fonts `@import` in `index.css` sits after the `@tailwind` directives, so
   PostCSS strips it. Rubik/Heebo have never loaded — in dev or prod.

Also traced: the UTF-8 BOM on `Pricing.tsx` was introduced by `8a84290`
("Fix Hebrew encoding in pricing section", 2026-03-19). Before that commit the file
started `69 6d 70` (`imp`); after, `ef bb bf`. The encoding fix added the BOM.

Same session: wrote `CLAUDE.md` and this log.

## 2026-09-03 — Second Google Ads tag
`eef784d` — added `gtag('config','AW-1060439344')` next to the existing `AW-951047760`.
The conversion event still only targets the first ID.

## 2026-03-19 — Mobile pricing polish (9 commits)
CTA buttons moved into the pricing section, mobile header refined, CTAs kept on one row,
button width/height/spacing iterated four separate times, `totalAdditions` column dropped
from the desktop table (the field stayed in the data and is still used to derive the
unfurnished price). Hebrew encoding "fix" that added the BOM.

## 2026-03-18 — Pricing removed, then restored
`ba9b9b9` "without price" → `70e8c57` "return pricing". Two commits, net zero.

## 2026-03-17 — Big restructure (18 commits)
Dead code removed: the `Contact` component and its lib files, other unused components.
Section order inverted — pricing moved to the top, catalog directly after it, so the
price table is the first thing a visitor sees. Standalone services block folded into the
pricing note. Pricing display reworked into a large vertical list, then a table. Catalog
images swapped to local `CAT1`–`CAT5` in five incremental commits.

## 2026-03-15 — Images and layout churn (19 commits)
The `Gallery` component removed. Heavy back-and-forth on images (`Added image.png`,
`Updated image.png`, `add img`, `remove img`, `fix`, `כןס`, `fix`). Ceiling pricing line
dropped. This is where `painter-bg.jpg` was first referenced without ever being added.

## 2026-03-12 — Pricing table iterations (13 commits)
Grew to a 3-column layout (unfurnished / furnished / ceiling), then the unfurnished and
ceiling columns were removed again and prices updated. Five consecutive
"Updated Hero.tsx" commits.

## 2026-03-10 & 2026-02-12 — Initial build (9 commits)
Repository started. Hero, Header, and Contact components. Phone number changed three
times across the two days before settling on `0543051679` (`40a152e`, 2026-03-16).

---

## Patterns worth knowing

- **The pricing section is the churn center.** Roughly half of all commits touch
  `Pricing.tsx`. Columns, prices, and CTA geometry have each been reverted at least once.
  Expect the current layout to be deliberate, not accidental — check `git log` on the
  file before "fixing" spacing.
- **Bolt-generated repo** (`.bolt/` present). Commit messages are mostly
  "Updated X.tsx", so `git log -S<string>` on a specific symbol is far more useful than
  reading messages.
- `vite.config.ts.timestamp-*.mjs` artifacts were committed and deleted three separate
  times. They are still not in `.gitignore`.
- **No tests, no CI.** Nothing catches the `tsc` and `eslint` errors automatically —
  `npm run build` passes right through them.

---

## 2026-09-03 (later) — Fixed the 4 severe findings

`index.css` `@import` hoisted to line 1 · 3 dead `#contact` links repointed to
`#contact-form` (plus `scroll-mt-28` on the form wrapper, or the scroll lands under the
fixed header) · `/painter-bg.jpg` → `/image2.png` (the original was never committed, so
intent was unrecoverable — see audit §2 for the assumption) · `setTimeout` fallback added
to `gtag_report_conversion` so a blocked `gtag.js` no longer swallows phone clicks.

Verified: build warning gone, `@import` first in `dist/assets/*.css`, all 5 anchors resolve,
all referenced assets present in `dist/`, fallback in built HTML, HMR clean.
`tsc` still 7 `TS6133` and eslint still 2 — unchanged, no regressions.
13 insertions, 7 deletions across 5 files.

## 2026-09-03 (later still) — Fixed the remaining 12 findings

`<html lang="he" dir="rtl">` · high-contrast filter re-scoped to `.high-contrast #app-root > *`
so it stops un-fixing the sticky header · `public/favicon.svg` created · aria-label /
aria-expanded / aria-controls on both toggle buttons · mobile menu closes on navigate ·
`.env` untracked + `.gitignore` hardened + `.env.example` added · VAT line removed from
the "what's included" list · 5 unused `React` imports and 1 unused `Eye` import dropped
(`jsx: react-jsx` makes them unnecessary; `Header`/`Hero` keep theirs for `React.*` types) ·
submit failures now `console.error` instead of vanishing · BOM stripped · phone pattern
loosened to `[0-9+() -]{9,20}` with a JS digit-count check and a new `invalid-phone` state ·
`@supabase/supabase-js` uninstalled.

Also unified the desktop and mobile navs onto one `navLinks` array. They had drifted, which
is how three links came to point at a `#contact` id that never existed — worth keeping as
one source of truth.

**End state: `tsc` 0 errors (was 7), `eslint` 0 errors (was 2), `vite build` 0 warnings.**
All 16 audited findings closed. One product decision deliberately left open: leads are
still not persisted to any database (audit §16).
