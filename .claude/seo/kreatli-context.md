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
- Scripts: `npm run seo:qa`, `npm run seo:audit`, `npm run seo:keywords`, `npm run seo:indexnow` (Bing and Yandex),
  `npm run seo:linear` (tickets), `npm run seo:volumes` (exact volumes, worldwide), `npm run seo:onpage` (on-page
  check), `npm run seo:gate` (the writer's pre-push gate), `npm run seo:test`, `npm run seo-pages:next`
- Search targets per page: `targets` on the registry entry (SEO-38). Known on-page findings: `scripts/onpage/onpage-baseline.json`.
- Publishing: commit straight to `main` and push. That deploys to production. No branches or PRs.
- Tickets: Linear workspace **marketplace-kreatli-seo** (https://linear.app/marketplace-kreatli-seo), team
  **Marketplace(Kreatli)-SEO-automation** (key `SEO`, tickets `SEO-*`), project **Marketplace SEO**, labels `new-page` /
  `rewrite` / `technical`, statuses Backlog, Todo, In Progress, Done, Canceled. Use it **only through
  `npm run seo:linear`** (settings in `.claude/seo/linear.json`): `list`, `search "<words>"`, `show <ID>`,
  `create --title ... --label ... --priority 1-4 --file brief.md [--due YYYY-MM-DD]`, `comment <ID> --file note.md`,
  `move <ID> "<status>"`, `priority <ID> <1-4>`, `due <ID> <YYYY-MM-DD|none>`. It checks the Composio account reaches
  this workspace before every command and refuses ticket IDs outside the project, so nothing lands in kreatli.com's
  Linear. Never call Composio's Linear tools or a Linear MCP connector directly. If `seo:linear` fails, report the
  error and stop that step.

## Accounts: the marketplace's own, never kreatli.com's

The marketplace and kreatli.com (the review tool, repo `kreatli-review-tool-front`) are separate businesses with
separate routines. Every data source below is pinned; always pass the account or property named here, never rely on a
default, and never touch kreatli.com's.

| Source | Marketplace (use) | kreatli.com (never use here) |
|---|---|---|
| Linear | `npm run seo:linear` (Composio `--account marketplace-kreatli-seo`, workspace `marketplace-kreatli-seo`) | `linear-kreatli-com`, `kreatli-reviewtool-seo` (workspace `kreatli-reviewtool-seo`, `KRE-*`) |
| Amplitude | Composio `--account kreatli-com`: despite the name, this is the **marketplace** project (`signup_completed`, `job_created`, `clipper_applied`, with `first_landing_type` / `first_landing_path`). `kreatli-all` is the same project. | `amplitude-kreatli-site` (`account_signup_completed`) |
| Search Console | `sc-domain:marketplace.kreatli.com` | `sc-domain:kreatli.com`, `https://kreatli.com/` |
| GA4 | `properties/424099578` (marketplace.kreatli.com) | `properties/497375961` (kreatli.com) |
| IndexNow | key `379261fdcb0dcbf2e5a3cf207855594c` (`public/`) | kreatli.com's key |
| Repo, publishing | `kreatli-front`, straight to `main` | `kreatli-review-tool-front`, one PR per ticket |

`composio execute AMPLITUDE_...` with no `--account` reaches an unrelated project: never call it that way. If a
pinned account fails, report it and skip the step rather than trying another account.

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
- 2026-11-02: b-roll and jump-cut glossary pages keep tripping `poor-fit` (position 50 to 60, 0 clicks). SEO-9 was
  cancelled on purpose, so don't refile. Only revisit if they start getting clicks or a short-form angle gains demand.
- 2026-11-02: most remaining Search Console candidates are the video-editing cost cluster, which belongs to the restored
  `/guides/cost-to-hire-a-video-editor` (SEO-23, held until about Nov 26). New ideas came from seeds instead:
  "how much do youtube editors make" (SEO-29), "youtube reused content policy" (SEO-30), "clipping streamers" (SEO-31).
  "how to add clips to twitch" / "how to clip a twitch stream" are Twitch tutorials, not a fit.
- 2026-11-02: Amplitude via Composio still shows no `signup_completed` / `job_created` / `clipper_applied` events (only
  autocapture, `cta_click`, `faq_expand`, `guide_scroll_75`, `outbound_click`, scroll and session events).
- 2026-11-09: seed ideas are drying up. Seeds like "klap alternatives", "munch alternatives", "hire clippers", "freelance
  clipper", "video clipping jobs" return 0 to 50/mo, and the Search Console candidates are all the video-editing cost
  cluster (SEO-23, held) or already covered. "clip farming" is 5,400/mo, but it has a page (held until about Nov 26) that
  shows only 12 impressions at position 4.7, so check its SERP before filing a rewrite. Don't force 3 to 6 new-page tickets.
- 2026-11-09: `no-impressions` pages at 19 days: "Discovered/Crawled - currently not indexed" get a `technical` ticket
  (SEO-32, SEO-33); pages already "Submitted and indexed" (royalty-free-music-for-clips, best-video-editing-software-for-clippers)
  are too early to judge, so re-check next week.
- 2026-11-09: `composio execute AMPLITUDE_LIST_EVENTS` needs `-d '{}'`. Conversion events are still absent.
- 2026-11-16: keyword run found nothing new. Search Console candidates are the held cost cluster (SEO-23), b-roll variants
  ("broll meaning" 720/mo, don't refile per SEO-9), job-board and UGC terms. Seeds "podcast clipper" (40), "youtube shorts
  clipper" (50), "how to find clippers" (10) are too small, so 0 new-page tickets were filed. Don't force them.
- 2026-11-16: `no-impressions` at 18 to 26 days: "URL is unknown to Google" pages get a `technical` ticket (SEO-34, SEO-35),
  because SEO-32's page moved from "Discovered" to "Submitted and indexed" within a week, so recheck "Submitted and indexed" pages
  before acting. A glossary rewrite ticket (SEO-21) is pointless until its page is indexed.
- 2026-11-23 prep (run of 2026-11-16 audit): b-roll and jump-cut `poor-fit` findings recur weekly and were skipped again (SEO-9). Indexing tickets get a comment, not a new ticket, when status is unchanged or improved (SEO-32 now indexed, SEO-35 moved from "unknown" to "Discovered"). The keyword report's new rows are the held cost cluster, press-clipping and UGC terms, so 0 new-page tickets again.
- 2026-11-26: the "no conversion events" notes from 28 Oct to 9 Nov were wrong account, not missing data. `AMPLITUDE_*` with no
  `--account` reaches an unrelated project. The marketplace project is Composio `--account kreatli-com` (also `kreatli-all`):
  105 `signup_completed` from 29 Oct to 25 Nov, with `first_landing_type`. Always pin accounts (see "Accounts").
- 2026-11-27: volumes are now exact lookups, **worldwide English** (owner decision), via `seo:keywords` and `seo:volumes`.
  Worldwide is often 3x US for clipping searches ("clip farming" 14,800 vs 5,400; "clipping jobs" 480 vs 110), so
  volumes in older tickets and lessons above are US-only and not comparable. Say "/mo worldwide" in new tickets.
