---
name: seo-writer
description: Writes or rewrites a marketplace.kreatli.com SEO page from a Linear ticket (new-page or rewrite), runs the QA gate until it passes, and commits it straight to main, which deploys it to production. Use when asked to "pick up an SEO ticket", "write the next page", or to work on a specific SEO-123 ticket.
---

# SEO writer

One ticket → one commit on `main`. There is no PR or human review: pushing to `main` deploys the page to production through Vercel. That makes the QA gate the only safeguard, so never skip or weaken it.

## 1. Pick the ticket

Use Linear only through `npm run seo:linear` (see "Tickets" in the context file). It refuses any workspace but the
marketplace's, so never call Composio's Linear tools or a Linear MCP connector directly.

- If the user named a ticket, use it. Otherwise run `npm run seo:linear -- list` and take the highest-priority
  `new-page` or `rewrite` ticket in Backlog/Todo. Skip anything already In Progress and tickets with a future due date.
- `npm run seo:linear -- move <ID> "In Progress"`.
- Read `.claude/seo/kreatli-context.md` and the whole ticket (`npm run seo:linear -- show <ID>`).
- **Start from the page's targets** (the `targets` on its registry entry): the primary and secondary searches, the
  questions it must answer, and the searches other pages own. Those other searches stay out of your title and H1.

## 2. Research before writing

- Read the current page if it's a rewrite, plus every page the brief says to link to. Reuse their figures.
- Search the target keyword and skim the top results so you know what has to be beaten.
- For a rewrite, read the ticket's Search Console queries. Those are the phrases readers actually use. Cover them.

## 3. Write the body

File: `src/content/seo/bodies/<type>/<slug>.md`

- First line `# <H1>`. The layout renders the H1 from the registry title and strips this line, so keep the two the same.
- **Opening paragraph:** answer the target question directly in 2 to 4 sentences, written to be quoted as a
  featured snippet. Use the primary search's words in it. This first paragraph becomes the page's `id="answer"`,
  which the on-page check reads; don't put anything else (a note, an image) before it.
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
- **Targets:** every page you write or rewrite needs `targets` (same shape as the pages that have them). For a page
  without them, add them: primary = `primaryKeyword` in lower case, 2 to 5 secondary searches from the ticket and
  Search Console, the questions the page answers (each tied to a real heading), and `ownedElsewhere` for close
  searches another page owns. Volumes come from `npm run seo:volumes` (exact, worldwide; `null` when there's no
  data). If a new target is wrong for what the page says, fix the target, not the page. Then run `npm run seo:test`:
  it refuses a search on two pages and a question with no matching heading.
- **Changing a slug or merging pages:** add a permanent redirect in `next.config.js` (`renamedSlugs` or the
  list below it), and update every body that links to the old URL.

## 5. QA gate (blocks the push)

Pushing to `main` deploys to production with no review, so this gate is the only check. It runs on the rendered
page from a local production build, not just the markdown.

```bash
npm run seo:test                                   # targets and opening answers are well formed
npm run seo:gate -- <type>/<slug> [<other pages you edited>] --all
```

`seo:gate` builds the site, starts it on port 3100, runs `seo:qa` (the markdown checks plus the on-page SEO check),
and stops the server. A draft doesn't render, so for a new page set `status: 'published'` before running it.

- Any **FAIL** (including a **NEW** on-page must-fix) → fix it and re-run. Repeat until the gate passes. **Never
  commit while it fails.** Fix warnings where you reasonably can, without stuffing keywords: no extra H2s or FAQ
  entries only to fit wording, and repetition over 2.5% of the words is itself a warning.
- **Known** must-fix findings (in `scripts/onpage/onpage-baseline.json`) are warnings. Fix them when the ticket
  touches that part of the page.
- **Never add keys to the baseline to pass the gate.** An exception needs the owner's OK and a ticket, and goes in
  the page's `targets.exceptions`.
- Then run the `seo-qa` skill's manual checks: claims, accuracy, usefulness and tone.
- Run `npx tsc --noEmit` before committing.
- Put the gate result in the commit message (for example "seo:gate PASS, 2 warnings: ...") and in the ticket comment.

## 6. Commit to main and publish

- Work on `main`. Run `git pull --ff-only` before you start editing and again just before you commit. If the working tree has changes you didn't make, stop and report instead of committing them.
- Commit only the files for this ticket (the body, the registry entry, any link-back edits and redirects), as **one commit**: `feat(seo): <what changed> (<TICKET-ID>)`, with the repo's co-author trailer. Keep it to one ticket per commit so it's easy to revert.
- Push with `git push origin main`. Never force-push.
- After pushing, wait for the Vercel deployment and confirm the page is live (`curl -s <url> | grep -o '<title>[^<]*'`). If the deploy fails, or the page 404s or shows the old title, revert your commit (`git revert <sha>` and push), then report what happened.
- Once the page is live, tell Bing and Yandex: `npm run seo:indexnow -- <path> --submit` (plus any page you edited
  for link-backs). 200 or 202 from both is success. Any other answer: note it in the report and on the ticket, don't
  retry in a loop; the Monday audit's catch-up sends it again.
- Comment on the ticket with the commit link, a one-line summary, the QA result and the IndexNow result
  (`npm run seo:linear -- comment <ID> --file <note.md>`), include the baseline numbers, then
  `npm run seo:linear -- move <ID> Done` and `npm run seo:linear -- due <ID> <check-back date 8 weeks out>`.
  The statuses are Backlog, Todo, In Progress, Done and Canceled.
- In Search Console, Request indexing can only be done by hand in the UI. List the URL in your report so someone can do it.

## 7. If something goes wrong after publishing

- A fact, figure or claim turns out wrong: fix it in a new commit on `main` (don't rewrite history), and note it on the ticket.
- The page breaks the site (build error, broken layout): `git revert` the commit, push, and reopen the ticket as In Progress with the reason (`seo:linear -- move` and `-- comment`).
