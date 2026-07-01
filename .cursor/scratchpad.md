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

Infrastructure complete. One page published: `/compare/clipping-marketplace-vs-video-editor-marketplace`.

To publish more pages:
1. Add markdown to `src/content/seo/bodies/{type}/{slug}.md`
2. Set `status: 'published'` in `src/content/seo/registry.ts` (or re-import spreadsheet with Drafted status)
3. Run `npm run build`

Hire pages (Wave 2/3) remain `draft` until manually published when listing density is met.

## Executor's Feedback or Assistance Requests

Ready for planner review. User can test locally with `npm run dev` and visit `/compare`, `/compare/clipping-marketplace-vs-video-editor-marketplace`.

## Lessons

- Split `fs`-based page loading into `loadPage.ts` to avoid bundling Node modules on the client.
- Registry is auto-generated via `npm run import-seo-plan` from the xlsx spreadsheet.
