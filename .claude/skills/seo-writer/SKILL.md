---
name: seo-writer
description: Writes or rewrites a marketplace.kreatli.com SEO page from a Linear ticket (new-page or rewrite), runs the QA gate until it passes, and opens a PR linked to the ticket. Use when asked to "pick up an SEO ticket", "write the next page", or to work on a specific SEO-123 ticket.
---

# SEO writer

One ticket → one branch → one PR. The PR is the publish step: a human merges it, and merging deploys the page.

## 1. Pick the ticket

- If the user named a ticket, use it. Otherwise, in Linear (**seo-automation-blog** workspace, project
  **Marketplace SEO**), take the highest-priority `new-page` or `rewrite` issue in Backlog/Todo with no open PR.
  Skip tickets with a future due date.
- Move it to **In Progress**.
- Read `.claude/seo/kreatli-context.md` and the whole ticket.

## 2. Research before writing

- Read the current page if it's a rewrite, plus every page the brief says to link to. Reuse their figures.
- Search the target keyword and skim the top results so you know what has to be beaten.
- For a rewrite, read the ticket's Search Console queries. Those are the phrases readers actually use. Cover them.

## 3. Write the body

File: `src/content/seo/bodies/<type>/<slug>.md`

- First line `# <H1>`. The layout renders the H1 from the registry title and strips this line, so keep the two the same.
- **Opening paragraph:** answer the target question directly in 2 to 4 sentences, written to be quoted as a
  featured snippet.
- `##` sections that follow the brief's outline. Use tables for rates and comparisons, and worked examples for any maths.
- **`## FAQ`** with `### Question` subheadings and one-paragraph answers. These become FAQPage schema, so
  each answer must stand on its own. Aim for 4 to 6.
- **Internal links:** relative paths (`/guides/clipper-pay-rates`). 3+ of them, never to a redirected URL.
- No CTA block in the markdown. The page adds one from `funnelSide`.
- Follow the voice rules in the context file, especially: no em dashes, short sentences, no invented figures.
- Length: glossary 600 to 1,500 words, guides and hire pages 1,000 to 2,000, unless the brief says otherwise.

## 4. Update the registry

`src/content/seo/registry.ts`:

- **New page:** add an entry with the next free `id`, then `type`, `funnelSide`, `slug`, `title`,
  `metaDescription` (110 to 160 chars, answer plus hook), `primaryKeyword`, `searchIntent`, `wave`,
  `status: 'draft'`, `relatedSlugs` (3, published only) and `publishedAt`.
- **Rewrite:** update `title`/`seoTitle`/`metaDescription`/`relatedSlugs` as needed and set `updatedAt` to today.
- If the title plus " | Kreatli" is over 60 chars, add a shorter `seoTitle`.
- **Changing a slug or merging pages:** add a permanent redirect in `next.config.js` (`renamedSlugs` or the
  list below it), and update every body that links to the old URL.

## 5. QA gate

```bash
npm run seo:qa -- <type>/<slug>
```

- Any **FAIL** → fix it and re-run. Repeat until it passes. Fix WARNs where you reasonably can.
- Then run the `seo-qa` skill's manual checks: claims, accuracy, usefulness and tone.
- Only after both pass: for a new page, set `status: 'published'` and run QA once more.
- Run `npx tsc --noEmit` before committing.

## 6. Open the PR

- Branch: `seo/<ticket-id-lowercase>-<slug>` (e.g. `seo/seo-7-cpm-meaning-clipping`).
- Commit message `feat(seo): <what changed> (<TICKET-ID>)`, with the repo's co-author trailer.
- PR body: link the Linear ticket, why (data from the ticket), what changed, QA output summary, and after-merge
  steps (Request indexing for the URL in Search Console).
- Attach the PR to the Linear ticket as a link, comment with a one-line summary, and keep it **In Progress** (the SEO team has no "In Review" status: Backlog, Todo, In Progress, Done, Canceled).

## 7. After merge (if asked, or on the next run)

- Confirm the page is live (`curl -s <url> | grep -o '<title>[^<]*'`).
- Move the ticket to **Done**, and comment with the check-back date (8 weeks out) and the baseline numbers.
