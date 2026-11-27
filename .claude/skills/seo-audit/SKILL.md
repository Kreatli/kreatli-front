---
name: seo-audit
description: Weekly Search Console audit of published marketplace.kreatli.com SEO pages. Runs `npm run seo:audit`, applies judgement to each finding, and files `rewrite` / `technical` tickets in Linear (Marketplace SEO) without duplicates. Use when asked to "run the SEO audit", "check how pages are doing", or for the weekly SEO run.
---

# SEO audit

Output: Linear tickets that improve **existing** pages. This skill never edits content. The `seo-writer`
picks up its tickets.

## 1. Load context and run the audit

Read `.claude/seo/kreatli-context.md`, then:

```bash
npm run seo:audit -- --inspect
```

This needs the Composio CLI with Search Console linked. It writes `.seo-reports/audit-<date>.md` and `.json`.
Read the markdown report.

## 2. What each rule means

| Rule | Signal | Ticket |
|---|---|---|
| `low-ctr` | Page 1 position, ≥100 impressions in 28 days, CTR under 2% | `rewrite`: title, meta and opening paragraph to match the top queries |
| `striking` | Position 8 to 20, ≥50 impressions in 90 days | `rewrite`: expand coverage of the queries it ranks for, plus FAQs and internal links to it |
| `poor-fit` | Position 40+, ≥200 impressions in 90 days | `rewrite`: retarget to a winnable angle, or merge into a stronger page with a redirect |
| `declining` | Impressions down 40%+ or position 5+ worse vs the previous 28 days | Check for a cause first (a competitor, a site change, a seasonal dip) before filing |
| `no-impressions` | Published 14+ days, zero impressions in 90 days | `technical`: indexing. Include the URL Inspection status from the report |
| Held | Changed in the last 28 days | No ticket. The data reflects the old version. Re-check next week |

## 3. Turn findings into tickets

- **Group by page:** one ticket per page, even when it triggers several rules.
- **Check Linear first,** only through `npm run seo:linear` (see "Tickets" in the context file): `-- list` for open
  tickets, `-- search "<slug or keyword>"` for older ones. If an open ticket already covers the page, add a comment with
  the new numbers (`-- comment <ID> --file <note.md>`) instead of filing a duplicate.
- **File** with `npm run seo:linear -- create --title "..." --label rewrite|technical --priority 1-4 --file <brief.md>`.
  A ticket that must wait (for example a page in its 28-day hold) gets `--due <date the hold ends>`, never a date in the
  title.
- **Look up volumes** for the page's main queries in one call, `npm run seo:volumes -- "<query>" "<query>"` (exact,
  worldwide; write "/mo worldwide" in the ticket), so the ticket's priority reflects demand, not just impressions.
- **Read the page** before writing the brief, so the "why it underperforms" is specific (e.g. "title says CPM
  Explained, a third of queries are about Whop").
- **Priority:**
  - Urgent: indexing problems on funnel pages
  - High: `low-ctr` on page 1, or `striking` with 500+/mo volume
  - Medium: other `striking` and `declining`
  - Low: `poor-fit` on off-funnel topics

Each ticket description includes: page URL and file paths, the data table (28d / prev 28d / 90d), top queries
with impressions and position, volumes, why it underperforms, a concrete brief (title/meta direction, sections to
add or cut, links), and a measurable success criterion with a check-back date.

For section index pages or non-registry pages in "Other pages with traffic" (e.g. `/hire`, `/guides`), file a
`technical` ticket only when the numbers point to a clear fix.

## 4. Tell Bing and Yandex (IndexNow)

Weekly catch-up for pages the writer didn't submit (it submits each page right after publishing). Submit the SEO
pages published or updated in the last 7 days. Google doesn't use IndexNow; it gets the Request indexing list instead.

```bash
npm run seo:indexnow -- --changed-since <date 7 days ago>            # dry run: check the list
npm run seo:indexnow -- --changed-since <date 7 days ago> --submit
```

Only pages that changed, once each: repeated pings for unchanged pages can get the key throttled. 200 or 202 from
both engines is success. Any other answer: report it, and don't retry in a loop.

## 5. Report

Reply with a table of tickets filed or updated (ID, page, rule, priority), plus the list of held pages and when
they leave the hold, and the IndexNow result (URLs sent, status from Bing and Yandex). Add any new lesson to the
context file's "Lessons from past runs".
