---
name: marketplace-kreatli-seo-pages
description: >-
  Creates and publishes Kreatli Marketplace SEO pages (compare, glossary, guides,
  hire) from the content registry. Writes markdown bodies, updates registry status,
  related links, and verifies build. Use when the user asks to create, publish, or
  generate new SEO/AEO marketing pages, batch content from the 66-page plan, or
  invoke the marketplace SEO page agent.
---

# Kreatli Marketplace SEO Pages Agent

Ship keyword-aligned public marketing pages for **Kreatli Marketplace** (vetted freelance clip-editor hiring — **not** CPM/content-rewards clipping). Read [reference.md](reference.md) for positioning, templates, and E-E-A-T rules.

## When invoked

The user will specify how many pages to create (e.g. "publish the next 3 glossary pages"). Default workflow:

1. **Discover candidates** — run `npm run seo-pages:list` (or `npx tsx scripts/seo-pages-agent.ts list`).
2. **Select pages** — pick the next N `draft` entries by priority: Wave 1 before Wave 2/3; within a wave prefer compare → glossary → guide → hire; respect `notes` in registry.
3. **Read gold standards** — open an existing published page of the same `type` under `src/content/seo/bodies/{type}/`.
4. **Write content** — create `src/content/seo/bodies/{type}/{slug}.md` following the template for that type (see reference.md).
5. **Update registry** — in `src/content/seo/registry.ts` for each page:
   - Set `status: 'published'`
   - Add `relatedSlugs` (2–3 published siblings in same or adjacent section)
   - Improve `metaDescription` if the auto-generated one is weak (keep under ~160 chars, include primary keyword)
6. **Verify** — `npm run build` must pass. Footer auto-lists published pages (no footer edit needed).
7. **Report** — list new URLs (`/{type}/{slug}` or `/guides/{slug}`), target keywords, and any pages skipped (hire wave 2/3 gated).

## Codebase map (Pages Router — not App Router)

| Concern | Location |
|--------|----------|
| Page metadata registry | `src/content/seo/registry.ts` |
| Markdown bodies | `src/content/seo/bodies/{compare,glossary,guide,hire}/{slug}.md` |
| Types & labels | `src/content/seo/types.ts` |
| Load/publish logic | `src/content/seo/loadPage.ts`, `pageProps.ts` |
| Dynamic routes | `src/pages/compare/[slug].tsx`, `glossary/`, `guides/`, `hire/` |
| SEO components | `src/components/seo/` (`SeoHead`, `ContentPageLayout`, `ContentBody`, `ContentCta`, `HirePageCta`) |
| Brand constants | `src/constants/brand.ts` (`BRAND_NAME`, `getPageTitle`) |
| Sitemap | `src/pages/sitemap.xml.ts` |
| Re-import spreadsheet metadata | `npm run import-seo-plan` |
| List/publish helper | `npm run seo-pages:list`, `npm run seo-pages:next` |

**Publishing rule:** `getStaticPaths` only includes `status === 'published'` pages that have a markdown body file. Missing body → 404 even if published.

## Hard boundaries

- **Include:** public SEO routes, registry, markdown bodies, `src/components/seo/`, sitemap, footer (auto).
- **Exclude:** dashboard, admin, auth, chat, API — do not change.
- **Never** imply Kreatli Marketplace pays per view or runs content-rewards/CPM campaigns.
- **Never** mention AniDachi or Blou in marketing copy.
- **Brand:** always **Kreatli Marketplace** in user-facing copy (`BRAND_NAME` in `src/constants/brand.ts`).
- **Hire pages (wave 2/3):** do not publish until user confirms listing density gate is met (`minListingsRequired: 5`).

## CTAs (this codebase)

| Audience | Button copy | Href |
|----------|-------------|------|
| Creator | Post a clipping job → | `/jobs/create` |
| Clipper | Join as a clipper → | `/signup/professional` |
| Hire pages | Post a job / Join as an editor | `HirePageCta` component |

## Content templates (summary)

### Compare (`type: 'compare'`, `funnelSide` from registry)

Required sections: Quick comparison table (include **Payment model** row), direct-answer opening (3 sentences), What is [competitor]?, How Kreatli Marketplace is different, Who should use which?, Verdict. Tone: factual, not adversarial. Gold standard: `bodies/compare/kreatli-vs-fiverr.md`.

### Glossary (`type: 'glossary'`)

600–900 words. H1-style title in markdown `#`. Opening definition (2 sentences), why it matters, examples, link to 2–3 related glossary slugs in prose. Gold standard: follow structure in reference.md.

### Guide (`type: 'guide'`)

800–1500 words. Numbered steps for how-tos. Mid-content CTA implied via `ContentCta` at bottom. Creator vs clipper tone per `funnelSide` in registry.

### Hire (`type: 'hire'`)

Transactional landing only (no live listings embed — auth-gated). Hero copy, what to expect, how it works (4–5 steps), FAQ (≥3 niche-specific questions). Use `HirePageCta`. Only publish when wave gate allows.

## Markdown conventions

- Write in **markdown** only (no frontmatter required).
- Use `##` for sections; tables use GitHub markdown.
- Link internally: `[hire a podcast clip editor](/hire/hire-a-podcast-clip-editor)` — use `getPageUrl` paths (`/guides/` not `/guide/`).
- Disambiguation anchor: `/compare/clipping-marketplace-vs-video-editor-marketplace`

## Internal linking

When publishing, set `relatedSlugs` in registry to build clusters:

- Compare ↔ compare + disambiguation page
- Glossary ↔ glossary + relevant guide or hire
- Guide ↔ guide + glossary + compare where intent overlaps

## Checklist before marking done

- [ ] Markdown file exists at correct path
- [ ] Registry `status: 'published'`
- [ ] `relatedSlugs` set (2–3 entries)
- [ ] Copy uses **Kreatli Marketplace**; CPM vs fixed-price distinction honoured on compare pages
- [ ] `npm run build` passes
- [ ] No hire wave 2/3 pages published without explicit user approval

## Additional resources

- Full SEO/AEO playbook (positioning, FAQ strategy, E-E-A-T): [reference.md](reference.md)
- Original 66-page plan metadata: re-run `npm run import-seo-plan` from spreadsheet (preserves manual `status`/`relatedSlugs` only if you merge carefully — prefer hand-editing registry for publishes)
