# Marketplace SEO Pages

## Background and Motivation

Implement 66 SEO pages from the marketplace plan spreadsheet using data-driven dynamic routes.

## Project Status Board

- [x] Create SEO types and registry (66 pages)
- [x] Add import-seo-plan script
- [x] Build shared SEO components
- [x] Add dynamic routes for compare, glossary, guides, hire
- [x] Add robots.txt, sitemap, typography
- [x] Publish Wave 1 compare pages (10/10)
- [x] Publish Wave 1 glossary pages (5/20)
- [x] Publish high-conversion batch: 3 hire + 7 guides (10 pages)
- [ ] Publish remaining glossary #16–#30 (15 pages)
- [ ] Publish remaining Wave 2 hire niches (5 pages: Twitch, gaming, Reels, faceless, livestream)
- [ ] Publish remaining creator guides (7 drafts)
- [ ] Publish Wave 3 hire niches (12 pages)

## Current Status / Progress Tracking

Infrastructure complete. **25 SEO pages published** (10 compare, 5 glossary, 7 guides, 3 hire).

### Published in high-conversion batch (2026-07-02)

**Hire (creator → /jobs/create):**
- `/hire/hire-a-podcast-clip-editor` — hire a podcast clip editor
- `/hire/hire-a-youtube-shorts-editor` — hire a YouTube Shorts editor
- `/hire/hire-a-tiktok-editor` — hire a TikTok editor

**Guides — creator side:**
- `/guides/cost-to-hire-a-video-editor` — cost to hire a video editor
- `/guides/vet-a-freelance-video-editor` — vet a freelance video editor
- `/guides/repurpose-podcast-into-clips` — repurpose podcast into clips

**Guides — clipper side (→ /signup/professional):**
- `/guides/find-first-video-editing-client` — find first video editing client
- `/guides/how-to-price-video-editing-services` — how to price video editing services
- `/guides/become-a-freelance-video-editor` — become a freelance video editor
- `/guides/fiverr-vs-upwork-for-video-editors` — Fiverr vs Upwork for video editors

`npm run build` passes after all 10 publishes. Footer Guides and Hire sections now list published pages.

### Next batch recommendation

1. **Glossary #16–#20** (talking-head, podcast-clipping, 9:16, video-hook, retention) — traffic volume + snippet targets
2. **Wave 2 hire** — Twitch, gaming, Reels, faceless, livestream (transactional)
3. **Creator guides** — find-a-tiktok-editor, how-to-brief, how-to-write-job-post, ai-clipping-tool-vs-human-editor

## Executor's Feedback or Assistance Requests

High-conversion batch complete. Ready for planner review. User can test locally with `npm run dev` and visit `/hire`, `/guides`, or any URL above.

## Lessons

- Split `fs`-based page loading into `loadPage.ts` to avoid bundling Node modules on the client.
- Registry is auto-generated via `npm run import-seo-plan` from the xlsx spreadsheet.
- For conversion-focused batches, skip default glossary queue — prioritize hire + guides by search intent.
- `bodies/hire/` and `bodies/guide/` directories created with first publishes in each type.
