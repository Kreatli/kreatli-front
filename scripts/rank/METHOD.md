# marketplace.kreatli.com weekly ranking check: locked method

**Version v3, 27 Nov 2026 (SEO-46, owner-approved).** v3 = v2 with the keyword map rebuilt after targets batch 2: 21
clipper-side and glossary pages added (47 pages, 144 searches). v2 (SEO-40) rebuilt the map after the cannibalization
sweep: "hire a clipper" moves to `/hire` (the hire guide now targets "how to hire a clipper"), "how much does a
clipping campaign cost" moves to the campaign cost calculator, the jump cut page's primary is "what is a jump cut", and
the freelance editor guide's is "how to become a freelance video editor". The numbers are computed the same way.
v1 (27 Nov 2026, SEO-41) was ported from kreatli.com's locked method v3 (KRE-82). Search Console only, by owner
decision: no Serper, no live rank checks.

## What it measures

Every search in `keyword-map.json`. The map is built from the registry's `targets` (`src/content/seo/registry.ts`)
by `build-map.mjs`: 47 pages and 144 searches on 27 Nov 2026 (v3). The marketplace has no brand targets yet, so there's no
brand section.

- **Matching:** a Search Console query counts for a search when it equals the label or one of its variants. Case,
  punctuation and spacing are ignored, so "opus clip alternative" equals "opus-clip alternative".
- **Position:** Search Console query x device, aggregated by property (`sc-domain:marketplace.kreatli.com`, which has
  only the marketplace). That's Google's own per-search position, never added up across pages. All devices plus
  desktop, worldwide. Weeks run Monday to Sunday.
- **Week over week:** the country mix is held at the earlier week's shares, so a shift in which countries searched
  doesn't read as a rank change. The report names a country when it explains more than half of a move.
- **Per-search threshold:** a move is flagged (‼) when it's at least max(0.5, 2 x that search's median weekly move)
  over final weeks with 20+ impressions both weeks, and 20+ impressions in both compared weeks. Fewer than 3 usable
  week pairs use 1.5.
- **Confirmed:** the week before moved the same way past the threshold, or two weeks in a row at 10+ impressions.
  Only confirmed moves count as trends.
- **Seen in:** weekly impressions ÷ (monthly exact volume ÷ 4.345), capped at 100%, shown only for searches with
  200+ a month. Below that, impressions are shown. Without live checks, "edge of page 1" isn't reported.
- **Thin data:** most target searches get under 20 impressions a week (27 Nov 2026: 123 queries had 20+ impressions
  in 4 weeks), so most rows show impressions only. That is expected; nothing is flagged on thin data.

## Alerts

- **Lost visibility:** 10+ impressions the week before, 0 last week.
- **First impressions:** 0 the week before, 5+ last week.
- **URL switch:** Google shows another of our URLs than the target, after showing the target the week before.
- **Clicks halved** on a target page (from 10+).

kreatli.com's "mixed with the marketplace" alert is dropped: this property covers only the marketplace.

## Context in every report

- Confirmed Google ranking updates (status.search.google.com).
- Our commits to `src/pages`, `src/content/seo`, `src/components` and `next.config.js` that week.
- Clicks and impressions per target page.
- Sign-ups by first landing page: Amplitude `signup_completed` grouped by `first_landing_path`, Composio account
  `kreatli-com` (the marketplace project, despite its name). If Amplitude isn't reachable, the report says so.

## Provisional data and revisions

Search Console data for Sunday is incomplete on Tuesday, so last week is marked provisional. The next report lists
searches whose position for that week was revised by 0.5 or more.

## Output and posting

Reports go to `.seo-reports/rank/<Sunday>/`, which is git-ignored.

With `--post` (once per week: a second `--post` for the same week refuses, and `--repost` overrides it), through
`npm run seo:linear`, so only the marketplace workspace is reached:

- **SEO-41** gets the full summary.
- **Each rewrite ticket that's In Progress, and each ticket whose page the writer published or rewrote in the last
  8 weeks** (a `feat(seo): ... (SEO-n)` commit touching the page's markdown body), gets one comment with its own
  target searches. That replaces the page-average 8-week check-back.

Never re-run a posting command to see its output: read `.seo-reports/rank/<Sunday>/` instead.

## The lock

`npm run seo:rank -- --lock <version>` snapshots SHA-256 checksums of `report.mjs`, `build-map.mjs`,
`keyword-map.json` and this file in `lock/<version>/MANIFEST.sha256`. Every run checks them, and stops on any
difference. Nothing is posted before a lock exists. Changing the method or the keyword map needs the owner's OK, a
new lock version, and an updated method description on SEO-41.
