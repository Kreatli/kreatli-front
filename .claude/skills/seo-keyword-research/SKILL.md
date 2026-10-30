---
name: seo-keyword-research
description: Weekly keyword research for marketplace.kreatli.com. Finds queries we already appear for but don't target, checks Keyword Planner volumes, and files `new-page` tickets with full briefs in Linear (Marketplace SEO). Use when asked to "find keywords", "run keyword research", or plan new SEO pages.
---

# SEO keyword research

Output: `new-page` tickets in Linear, each a complete brief the `seo-writer` skill can pick up without
asking questions. Never write page content in this skill.

## 1. Load context

Read `.claude/seo/kreatli-context.md`. It covers who we write for, the funnel sides, and the claims to avoid.

## 2. Gather candidates

```bash
npm run seo:keywords                                  # Search Console queries no page targets, with volumes
npm run seo:keywords -- --seed "clipping jobs" --seed "whop clipping"   # add seeds for themes you want to test
```

This needs the Composio CLI with Search Console linked, and the anidachi Keyword Planner script
(`KEYWORD_PLANNER_DIR`, which defaults to the anidachi `apps/web` folder). It writes
`.seo-reports/keywords-<date>.md`. Read that file.

For single lookups while writing briefs:

```bash
cd "$KEYWORD_PLANNER_DIR" && pnpm -s google-ads:keywords -- "seed one" "seed two"
```

## 3. Choose what to target

Keep a candidate only if all of these hold:

- **Fits a funnel side:** a creator hiring clippers, or a clipper looking for work or pay info. Drop generic
  video editing, software pricing ("filmora cost") and brand queries we can't serve.
- **Has demand:** about 30+ searches a month, or real Search Console impressions. Low-volume long-tail is
  fine if the intent is commercial ("hire a podcast clipper").
- **Isn't covered:** check `src/content/seo/registry.ts`, including drafts. If an existing page is close,
  file a `rewrite` ticket for that page instead of a new page. Two pages must never share a primary keyword.
- **Is winnable:** prefer LOW/MEDIUM competition, and queries where we already rank on pages 2 to 5.
- **Converts:** once Amplitude landing-page attribution exists, prioritise the page types that drive sign-ups.

Aim for 3 to 6 tickets a week. Quality beats volume.

## 4. Check Linear for duplicates

Use Linear through Composio as described under "Tickets" in the context file (`--account marketplace-kreatli-seo`).
List open issues in project **Marketplace SEO** and skip any keyword that already has a ticket.

## 5. File one ticket per page

`save_issue` with team `SEO`, project `Marketplace SEO`, label `new-page`, and a priority from volume × fit
(High = 500+/mo and on-funnel). The description must include:

- **Target keyword**, volume, competition, and the 3 to 8 secondary queries to cover (with volumes)
- **Page type and slug**, following the registry's conventions: `hire/hire-a-<niche>-clipper`,
  `guide/<question-as-slug>`, `glossary/<term>-meaning`, `compare/kreatli-vs-<x>`
- **Funnel side** and the CTA it implies
- **Search intent**, and what the current top results do (search the keyword and read the top 3 to 5). Say
  what they miss that we can do better.
- **Outline:** H2s, the questions the FAQ must answer, and the facts and figures to use (from the pages
  listed in the context file)
- **Internal links:** 3 to 6 existing pages to link to, and 1 to 3 existing pages that should link back to it
- **Evidence:** Search Console impressions/position if any, and the date of the research run
- **Done when:** passes `npm run seo:qa`, merged, and indexing requested

## 6. Report

Reply with a short table of the tickets filed (ID, keyword, volume, priority) and anything dropped as
off-funnel. Add any new lesson to the "Lessons from past runs" section of the context file.
