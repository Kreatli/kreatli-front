---
name: seo-writer
description: Writes or rewrites a marketplace.kreatli.com SEO page from a Linear ticket (new-page or rewrite), runs the QA gate until it passes, and commits it straight to main, which deploys it to production. Use when asked to "pick up an SEO ticket", "write the next page", or to work on a specific SEO-123 ticket.
---

# SEO writer

One ticket → one commit on `main`. There is no PR or human review: pushing to `main` deploys the page to production through Vercel. That makes the QA gate the only safeguard, so never skip or weaken it.

## 1. Pick the ticket

- If the user named a ticket, use it. Otherwise, in Linear (Composio account `marketplace-kreatli-seo`, see "Tickets" in the context file; project
  **Marketplace SEO**), take the highest-priority `new-page` or `rewrite` issue in Backlog/Todo (skip anything already In Progress).
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

## 6. Commit to main and publish

- Work on `main`. Run `git pull --ff-only` before you start editing and again just before you commit. If the working tree has changes you didn't make, stop and report instead of committing them.
- Commit only the files for this ticket (the body, the registry entry, any link-back edits and redirects), as **one commit**: `feat(seo): <what changed> (<TICKET-ID>)`, with the repo's co-author trailer. Keep it to one ticket per commit so it's easy to revert.
- Push with `git push origin main`. Never force-push.
- After pushing, wait for the Vercel deployment and confirm the page is live (`curl -s <url> | grep -o '<title>[^<]*'`). If the deploy fails, or the page 404s or shows the old title, revert your commit (`git revert <sha>` and push), then report what happened.
- Comment on the Linear ticket with the commit link, a one-line summary and the QA result, then move it to **Done**. Include the check-back date (8 weeks out) and the baseline numbers. The SEO team's statuses are Backlog, Todo, In Progress, Done and Canceled.
- In Search Console, Request indexing can only be done by hand in the UI. List the URL in your report so someone can do it.

## 7. If something goes wrong after publishing

- A fact, figure or claim turns out wrong: fix it in a new commit on `main` (don't rewrite history), and note it on the ticket.
- The page breaks the site (build error, broken layout): `git revert` the commit, push, and reopen the ticket as In Progress with the reason.
