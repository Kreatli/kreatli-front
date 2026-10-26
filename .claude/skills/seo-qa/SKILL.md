---
name: seo-qa
description: Quality gate for marketplace.kreatli.com SEO pages. Runs `npm run seo:qa` plus a manual review of claims, accuracy, usefulness and tone, and returns PASS or a list of fixes. Use before publishing any SEO page, when reviewing an SEO commit, or when asked to "QA" a page.
---

# SEO QA

A page ships only when **both** parts pass. If either fails, return the fixes to the writer (or make them),
then run both parts again.

## Part 1: automated checks

```bash
npm run seo:qa -- <type>/<slug>      # one page, exit code 1 on FAIL
npm run seo:qa -- --all              # sweep every published page
```

| Check | FAIL when | WARN when |
|---|---|---|
| Reading level (Flesch-Kincaid) | grade > 9 | grade > 7 |
| Em dashes | any | |
| Filler phrases | any from the list in `scripts/seo-qa.ts` | |
| Keyword in title | < half the topic words | some topic words missing |
| Broken internal links | any link to a missing or unpublished page | |
| Redirected links | | any link to an old URL that 301s |
| Unique meta / unique keyword | duplicates another page | |
| Related pages | any not published | |
| Word count, FAQ (3+), internal links (3+), title ≤ 60, meta 110 to 160 | | outside range |

The script can't judge meaning. That's Part 2.

## Part 2: manual review

Read the page as the target reader from `.claude/seo/kreatli-context.md`, and check each item:

1. **Answers the query first.** The first paragraph answers the target keyword on its own.
2. **No invented claims.** Every figure matches the pages in the context file's "Facts and figures" list or a
   cited, dated source. Competitor statements are fair and current. Nothing promises income or Kreatli
   features that don't exist.
3. **Covers the real queries.** For rewrites, each Search Console query listed in the ticket has a section or a
   FAQ answer.
4. **Useful, not padded.** Each section adds something: a number, an example, a step or a decision. Cut
   paragraphs that restate the heading.
5. **Reads like a person wrote it.** No staged openers, no "not X but Y" contrasts used as filler, no lists of
   three where one item would do, and no closing summary paragraph.
6. **Right funnel and CTA.** `funnelSide` matches the reader, so the page's CTA (clipper sign-up or post a job)
   makes sense after the last section.
7. **Links help.** Internal links point at the next useful page, not just any page. At least one link leads
   toward the funnel page (`/clipping-jobs`, `/hire`, or a hire page).
8. **Renders.** For a new layout element (tables, long FAQ), run `npm run dev` and check the page in the browser.

## Output

Reply with `QA: PASS`, or `QA: FAIL` followed by a numbered list of concrete fixes (file, section, what to
change). When QA runs inside the `seo-writer` flow, fix the issues and run it again instead of stopping.
