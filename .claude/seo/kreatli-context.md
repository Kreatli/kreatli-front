# Kreatli Marketplace: context for the SEO skills

Read this before researching, writing, checking or auditing any SEO page. Update it when the user corrects
the agent's output, so the next run gets it right (step 8 of the loop: teach the agent about the business).

## What Kreatli Marketplace is

- **Site:** https://marketplace.kreatli.com. This is not kreatli.com, which is a different product.
- **Model:** a marketplace where creators hire **clippers**, the editors who turn long videos into short
  vertical clips. Pay is **fixed per clip, per batch or monthly**, and the clips go on the creator's own channels.
- **Not a CPM platform.** Kreatli does not run pay-per-view campaigns. Always explain CPM/content-rewards
  clipping (Whop, Vyro, ClipFarm, ClipAffiliates) fairly, but make clear it is a different model.

## The two audiences (registry `funnelSide`)

| Side | Who | What they search | Primary CTA |
|---|---|---|---|
| `creator` | Streamers, podcasters, YouTubers, brands who need clips | "hire a clipper", "how much to pay clippers", "kreatli vs fiverr" | Post a clipping job (`/jobs/create`) |
| `clipper` | Editors and would-be clippers looking for paid work | "what is a clipper", "clipping jobs", "how to become a clipper", "how much do clippers make" | Join as a clipper (`/signup/professional`), browse `/clipping-jobs` |
| `both` | Definitions both sides need | glossary terms | Defaults to the creator CTA |

## Voice

- Plain English, around a 7th-grade reading level. Short sentences. Explain jargon the first time it appears.
- Answer the question in the first sentence, then give detail.
- Concrete numbers and worked examples beat adjectives.
- No em dashes. No filler ("delve", "unlock", "in today's fast-paced world", "whether you're a...").
- Use "clipper" for the person and "clip" for the output. "Short-form" means TikTok, YouTube Shorts and Reels.
- Ranges are written "$15 to $35", not "$15–$35", in new copy.

## Facts and figures to stay consistent with

Use the figures in these pages and link to them. Don't invent new ones:

- Pay: `/guides/clipper-pay-rates` (simple clip $15 to $35, mid-level $30 to $50, complex $50 to $75+,
  retainers about $800 to $3,500+/month, CPM about $0.50 to $3 per 1,000 views)
- Earnings examples: `/guides/how-much-do-clippers-make`
- Scams and legitimacy: `/guides/is-clipping-legit`
- Permissions: `/guides/do-you-need-permission-to-clip-streams`

## Claims to avoid

- No specific rates for a named competitor campaign unless the page cites a dated public source.
- No income promises ("make $5k a month clipping").
- No claims about Kreatli features that don't exist. Check the app pages in `src/pages` when unsure.
  Kreatli **does not offer escrow and does not process payments**: creators and clippers agree payment terms
  directly (see `/glossary/escrow-payment-freelance-meaning`). Don't quote a number of clippers on the platform.
- No legal advice. Permission and copyright questions link to the permissions guide and stay general.

## Where things live

- Page registry: `src/content/seo/registry.ts`. Bodies: `src/content/seo/bodies/<type>/<slug>.md`
- URL sections: `guide` → `/guides`, `glossary`, `compare`, `hire`, `alternatives`
- Renamed slugs and merges: the `redirects()` in `next.config.js`
- Scripts: `npm run seo:qa`, `npm run seo:audit`, `npm run seo:keywords`, `npm run seo-pages:next`
- Publishing: commit straight to `main` and push. That deploys to production. No branches or PRs.
- Tickets: Linear workspace **seo-automation-blog**, team **SEO**, project **Marketplace SEO**, labels
  `new-page` / `rewrite` / `technical`. Use the Linear connector whose `get_workspace` returns "SEO-automation".
  Other Linear connectors in this app point at different workspaces.

## Lessons from past runs

- 2026-10-25: pages changed in the last 28 days were held from the audit, because their Search Console data
  still reflects the old content. Keep doing this.
- 2026-10-25: generic film terms (b-roll, jump cut) rank 55+ and don't convert. Prefer short-form angles.
- 2026-10-26: short-form versions of film terms ("b roll for tiktok", "jump cut tiktok") have ~0 to 10 searches a
  month. Leave the generic glossary pages alone rather than repositioning them (SEO-9 closed).
- 2026-10-26: check demand before merging or redirecting a page. become-a-freelance-video-editor looked like
  overlap but owns "freelance video editor" (1,300/mo), so it was kept and cross-linked (SEO-8).
- 2026-10-26: keep figures consistent across pages. The old CPM page said "$1 to $10+ CPM" while the pay guide
  said $0.50 to $3. When a page quotes a rate, use the pay guide's numbers and link to it.
- The SEO Linear team's statuses are Backlog, Todo, In Progress, Done and Canceled (no "In Review").
- 2026-10-26: check the search results page before targeting a big keyword. "clipper jobs" (1,600/mo) is fin-clipper,
  Clipper Logistics and Clipper Vacations jobs. "best clipping software" (880/mo) and "clipping software" (3,600/mo)
  mean gaming clip-capture apps (Medal, ShadowPlay). "clipping agency" is mostly press clipping. None of them fit.
  Good fit: "short form video editor" (job posts plus freelancer profiles), which is now a hire page.
- 2026-10-26: publishing is a direct commit to `main`, with no PRs (the owner's choice). A push deploys to production
  via Vercel, so the QA gate is the only review. One ticket per commit, so a bad page can be reverted on its own.
- 2026-10-27: "stream clips" (590/mo) is developer docs (Livepeer, Gcore, Mux) and Twitch clip charts. "youtube shorts
  editor" (390/mo) is YouTube's built-in editor and editing apps. "twitch clipper" (210/mo) is mostly "how to clip on
  Twitch" tutorials. "clipping service" (260/mo) is press clipping. None fit. "hire video editor for youtube" (140/mo)
  means long-form editing, which isn't the marketplace's model.
- 2026-10-27: "whop clipping" (2,900/mo) is clipper-side how-to intent. The creator-side compare page gets 0 impressions
  for it, so a separate clipper guide (SEO-19) owns it and the compare page keeps the "vs" angle.
- 2026-10-27: if the best match for a keyword is a page still in its 28-day hold, file a `rewrite` ticket due when the
  hold ends rather than a new page (SEO-21).
- 2026-10-28: a 301 merge can strand demand. The old `/guides/cost-to-hire-a-video-editor` queries ("video editing
  cost/rates/prices", ~320/mo each) still sit at positions 65 to 75 with 0 clicks after it was redirected into the clipper
  pay guide, whose intent is different. Before redirecting, check the merged page's queries match the target page (SEO-23).
- 2026-10-28: "clipper contract" (720/mo) is Clipper Logistics and Bay Area transit, "clipping program" (390/mo) is
  graphics algorithms, and "clipping meaning" (480/mo) is dictionaries. None fit. "how to clip a youtube video" (4,400/mo)
  is mostly the YouTube Clip button, but clipping platforms (contentrewards, luminaclippers) rank with clipper-side guides,
  so it was filed with a clipper angle (SEO-24).
- 2026-10-28: the Amplitude project that Composio reaches has none of the PR #8 events (`signup_completed`, `job_created`,
  `clipper_applied`), only autocapture plus `app_store_badge_click`, so it looks like a different app. Conversion-based
  priorities wait until the Kreatli Marketplace project is connected.
- 2026-10-30: "video editor jobs remote" (4,400/mo) and "remote video editor" (590/mo) are owned by job boards (FlexJobs,
  Jobgether) with live listings. Without public job listings we can't compete, so they were dropped. "clip editor",
  "clip maker", "youtube clip maker" (1,000 to 1,300/mo) are editing-software searches. "content creator for hire" /
  "hire ugc creators" mean UGC creators who make original content, not clippers. None fit.
- 2026-10-30: "how to get clips for edits" (1,300/mo) and "where to get clips for edits" (590/mo) are mostly fan
  editors, but a clipping platform (Lumina Clippers) ranks on page 1, so it was filed as a clipper guide with a
  legal-sources angle (SEO-26). Never give downloader instructions for other people's videos on these pages.
