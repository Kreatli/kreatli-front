# Kreatli Marketplace SEO — Reference

Adapted from the marketplace SEO/AEO playbook for the **kreatli-front** Pages Router app.

## Core positioning

"Clipper" means two different jobs:

1. **CPM/content-rewards clipping** (Vyro, Whop Clips, ClipAffiliates): clipper posts on *their* account, paid per 1,000 views. Distribution play.
2. **Freelance clip editing (Kreatli Marketplace)**: creator hires a vetted editor who delivers finished clips to the *creator's channel* for agreed fixed price. Labour hire.

Every page must make clear which model is described. Link to `/compare/clipping-marketplace-vs-video-editor-marketplace` when confusion is likely.

---

## Opening answer format (compare, glossary, guides)

First paragraph below the H1 (first `##` section intro counts):

1. **Direct answer** — answer the H1 question in one sentence.
2. **Mechanism** — how it works, specific to the page.
3. **Qualifier** — audience, scope, or key differentiator.

---

## Compare page template

```
# [Title matching registry H1]

[3-sentence opening answer]

## Quick comparison
| Factor | Kreatli Marketplace | [Competitor] |
(include Payment model, Vetting rows)

## Where [competitor] works well
## Where [competitor] falls short for clipping
## How Kreatli Marketplace is different
## Who should use which?
## Verdict
```

`funnelSide: 'both'` — both creator and clipper angles in "Who should use which?"

---

## Glossary page template

```
# What Is [Term]? (Definition + Context)

[2-sentence direct definition]

## Why it matters for creators / clippers
## Examples
## Related terms
(link to 2–3 /glossary/ pages)

## FAQ
### Question 1?
Answer with ≥1 specific detail (price, platform, timeline, step count).
(min 3 page-specific questions)
```

Target 600–900 words.

---

## Guide page template

```
# [Title]

[3-sentence opening answer]

## [Section 1]
## [Section 2]
...
## [Final section / summary]

(Numbered lists for how-tos; steps must reflect Kreatli workflow: post job → review profiles → hire → receive clips)
```

- **Creator guides** (`funnelSide: 'creator'`): hiring, briefing, scaling production.
- **Clipper guides** (`funnelSide: 'clipper'`): honest about difficulty; predictable project pay vs view-chasing.

Target 800–1500 words.

---

## Hire page template

```
# Hire a [Niche] Editor

[Above-fold value prop — task + trust + action]

## What is a [niche] editor?
## What to expect
(deliverable format, cadence, platform destination — must differ per niche)

## How it works
1. Post your job brief
2. Review editor profiles
3. Agree scope and price
4. Receive finished clips

## FAQ
(min 3 niche-specific questions)
```

Differentiation per niche: deliverable format, session cadence, platform destination. Never swap only the niche name in identical copy.

---

## FAQ rules

- People Also Ask style questions.
- ≥3 questions answerable only on this page.
- Answers need ≥1 concrete detail (price range, platform name, timeline).
- Generic product FAQs belong on home/FAQ — link, don't duplicate.

---

## E-E-A-T

- Do not fabricate listing counts or social proof.
- No near-duplicate hire pages for the same keyword cluster.
- Competitor mentions: factual, not dismissive.

---

## URL paths in this repo

| type | URL prefix |
|------|------------|
| compare | `/compare/{slug}` |
| glossary | `/glossary/{slug}` |
| guide | `/guides/{slug}` |
| hire | `/hire/{slug}` |

Canonical site: `https://kreatli.com` (`SITE_URL` in `src/content/seo/utils.ts`).

---

## Published gold standards in repo

| Type | File |
|------|------|
| Compare (disambiguation) | `bodies/compare/clipping-marketplace-vs-video-editor-marketplace.md` |
| Compare (vs competitor) | `bodies/compare/kreatli-vs-fiverr.md` |
| Compare | `bodies/compare/kreatli-vs-upwork.md` |

Use these as voice/structure references when writing new pages of the same type.

---

## Wave ordering (registry)

| Wave | Pages | Notes |
|------|-------|-------|
| 1 | compare, glossary, guide | Publish when body is ready |
| 2 | 8 hire niches | Publish when body is ready |
| 3 | 12 hire niches | Publish when body is ready |

Hire entries use `ctaHref: '/jobs/create'`.
