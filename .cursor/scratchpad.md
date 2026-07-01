# Marketplace SEO Pages

## Background and Motivation

Implement 66 SEO pages from the marketplace plan spreadsheet using data-driven dynamic routes.

## Project Status Board

- [x] Create SEO types and registry (66 pages)
- [x] Add import-seo-plan script
- [x] Build shared SEO components
- [x] Add dynamic routes for compare, glossary, guides, hire
- [x] Add robots.txt, sitemap, typography
- [x] Publish Wave 1 page 1 (compare disambiguation)
- [x] Wire hire pages with CTA gating (draft until published)
- [x] Add Resources links to Header and Home footer

## Current Status / Progress Tracking

Infrastructure complete. **10 compare + 5 glossary pages published**.

Published glossary (new):
- `/glossary/what-is-a-clipper`
- `/glossary/what-is-a-clipping-marketplace`
- `/glossary/cpm-meaning-clipping`
- `/glossary/what-is-b-roll`
- `/glossary/jump-cut-definition`

Next batch: glossary pages #16–#30, then guides, then hire.

## Executor's Feedback or Assistance Requests

Ready for planner review. User can test locally with `npm run dev` and visit `/compare`, `/compare/clipping-marketplace-vs-video-editor-marketplace`.

## Lessons

- Split `fs`-based page loading into `loadPage.ts` to avoid bundling Node modules on the client.
- Registry is auto-generated via `npm run import-seo-plan` from the xlsx spreadsheet.
