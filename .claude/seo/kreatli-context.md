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
- Tickets: Linear workspace **seo-automation-blog**, team **SEO**, project **Marketplace SEO**, labels
  `new-page` / `rewrite` / `technical`. Use the Linear connector whose `get_workspace` returns "SEO-automation".
  Other Linear connectors in this app point at different workspaces.

## Lessons from past runs

- 2026-10-25: pages changed in the last 28 days were held from the audit, because their Search Console data
  still reflects the old content. Keep doing this.
- 2026-10-25: generic film terms (b-roll, jump cut) rank 55+ and don't convert. Prefer short-form angles.
