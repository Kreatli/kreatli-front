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
- **Check Linear first.** Use the connector for **seo-automation-blog** (`get_workspace` returns
  "SEO-automation"). If an open ticket in **Marketplace SEO** already covers the page, add a comment with the new
  numbers instead of filing a duplicate.
- **Look up volumes** for the page's main queries (`cd "$KEYWORD_PLANNER_DIR" && pnpm -s google-ads:keywords -- "<query>"`)
  so the ticket's priority reflects demand, not just impressions.
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

## 4. Report

Reply with a table of tickets filed or updated (ID, page, rule, priority), plus the list of held pages and when
they leave the hold. Add any new lesson to the context file's "Lessons from past runs".
