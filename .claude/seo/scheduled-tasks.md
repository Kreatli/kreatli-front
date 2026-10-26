# Scheduled tasks for the SEO loop

Create these in the Claude desktop app (sidebar → Scheduled → New task), or ask Claude to create them and
approve the prompt. They run locally while the app is open, because the Keyword Planner token only exists in the
anidachi repo on this Mac.

| Task | Schedule | What it does |
|---|---|---|
| `kreatli-seo-weekly-audit-research` | Mondays 09:00 (`0 9 * * 1`), created 2026-10-26 | Audit + keyword research, then files Linear tickets. No code changes. |
| `kreatli-seo-writer` | Tue and Thu 10:00 (`0 10 * * 2,4`), created 2026-10-26 | Writes the top ticket and opens a PR. Never merges. |
| `kreatli-seo5-indexing-check` | Once, 2026-11-01 10:00 (already created) | Sitemap/indexing check for SEO-5. |

After creating a task, open it and click **Run now** once to pre-approve the tools it uses (Composio, Linear, `gh`).
Later runs then won't stop on permission prompts.

## kreatli-seo-weekly-audit-research

```
Weekly SEO run for Kreatli Marketplace (https://marketplace.kreatli.com). Work in the repo at /Users/macgeorge/Downloads/Kreatli/kreatli-front.

1. Prepare the repo
   - `cd /Users/macgeorge/Downloads/Kreatli/kreatli-front && git status --porcelain --untracked-files=no`. If any tracked file is modified, do NOT touch it. Stop and report that the working tree is dirty.
   - Otherwise run `git checkout main && git pull --ff-only`.
   - Read `.claude/seo/kreatli-context.md` first.

2. Audit: follow `.claude/skills/seo-audit/SKILL.md` exactly
   - Run `npm run seo:audit -- --inspect`, then read `.seo-reports/audit-<today>.md`.
   - File one Linear ticket per page (label `rewrite` or `technical`, team SEO, project "Marketplace SEO").
   - Use the Linear connector whose `get_workspace` returns "SEO-automation" (workspace seo-automation-blog), never another one.
   - Check open tickets first. If a page already has one, comment with the new numbers instead of filing a duplicate.

3. Keyword research: follow `.claude/skills/seo-keyword-research/SKILL.md` exactly
   - Run `npm run seo:keywords`, then read `.seo-reports/keywords-<today>.md`.
   - File 3 to 6 `new-page` tickets with full briefs. Skip off-funnel, already-covered or already-ticketed keywords.
   - Volumes: `cd /Users/macgeorge/Downloads/VibeProjects/anidachi-LP/anidachi/apps/web && pnpm -s google-ads:keywords -- "<seed>"`.

4. Conversions: once Amplitude has `signup_completed` / `job_created` / `clipper_applied` events with `first_landing_type` / `first_landing_path`, use the page types that convert to set ticket priorities. If you can't reach the data, say so.

Rules: never edit page content, commit, push or merge in this task. If Composio or the Keyword Planner script fails, report the exact error and stop that step. Never invent numbers. Add new lessons to `.claude/seo/kreatli-context.md` without committing it.

Report: a table of tickets filed or updated (ID, page/keyword, label, priority, reason), the pages held as too fresh, and any errors.
```

## kreatli-seo-writer

```
SEO writing run for Kreatli Marketplace (https://marketplace.kreatli.com). Work in the repo at /Users/macgeorge/Downloads/Kreatli/kreatli-front.

1. Prepare the repo
   - `git status --porcelain --untracked-files=no`. If any tracked file is modified, stop and report. Do not stash or discard anything.
   - `git checkout main && git pull --ff-only`.
   - Read `.claude/seo/kreatli-context.md`, then follow `.claude/skills/seo-writer/SKILL.md` exactly. Use `.claude/skills/seo-qa/SKILL.md` for QA.

2. Pick ONE ticket
   - Use the Linear connector whose `get_workspace` returns "SEO-automation" (seo-automation-blog), team SEO, project "Marketplace SEO".
   - Take the highest-priority Backlog/Todo issue labelled `rewrite` or `new-page` with no open PR and no future due date. Check `gh pr list --search "SEO-"` too.

3. Write the page and registry entry. For a new page, use the next registry id not already used on main or in an open PR, and insert the entry next to pages of the same type (not at the end of the file) so parallel PRs don't conflict. Loop on `npm run seo:qa -- <type>/<slug>` until there are no FAILs, do the manual review, and run `npx tsc --noEmit`.

4. Ship for review
   - Branch `seo/<ticket-id-lowercase>-<slug>`. Commit `feat(seo): ... (<TICKET-ID>)` ending with "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>".
   - Open a PR against main with `gh pr create --body-file <file>` (not inline). The body ends with "🤖 Generated with [Claude Code](https://claude.com/claude-code)".
   - Attach the PR to the ticket as a link, comment with a summary, and keep it In Progress (the SEO team has no "In Review" status).
   - NEVER merge.

5. Housekeeping: for In Progress tickets whose linked PR has merged, confirm the page is live, move them to Done, and comment with a check-back date 8 weeks out.

If nothing is eligible, say so and stop. Report: the ticket, PR link, QA result, and anything left unverified.
```
