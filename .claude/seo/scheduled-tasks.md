# Scheduled tasks for the SEO loop

Create these in the Claude desktop app (sidebar → Scheduled → New task), or ask Claude to create them and
approve the prompt. They run locally while the app is open (both are saved in Auto mode), because the Keyword Planner token only exists in the
anidachi repo on this Mac.

| Task | Schedule | What it does |
|---|---|---|
| `kreatli-seo-weekly-audit-research` | Mondays 09:00 (`0 9 * * 1`) | Audit + keyword research, then files Linear tickets. No code changes. |
| `kreatli-seo-writer` | Tue and Thu 12:00 (`0 12 * * 2,4`) | Writes the top ticket and commits it straight to main, which deploys to production. |

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
   - Use Linear only through `npm run seo:linear` (see "Tickets" in the context file). It refuses any workspace but the marketplace's. Never call Composio's Linear tools or a Linear MCP connector directly.
   - Check open tickets first. If a page already has one, comment with the new numbers instead of filing a duplicate.

3. Keyword research: follow `.claude/skills/seo-keyword-research/SKILL.md` exactly
   - Run `npm run seo:keywords`, then read `.seo-reports/keywords-<today>.md`.
   - File 3 to 6 `new-page` tickets with full briefs. Skip off-funnel, already-covered or already-ticketed keywords.
   - Volumes: `npm run seo:volumes -- "<keyword>" "<keyword>" ...` (exact lookups, worldwide; pass all keywords in ONE call; close variants share one volume and are never added together; "no data" stays "no data", never guessed).

4. IndexNow catch-up: follow step 4 of the audit skill (`npm run seo:indexnow -- --changed-since <7 days ago> --submit`).

5. Conversions:
   - Amplitude is Composio `--account kreatli-com` (the marketplace project, despite the name; see "Accounts" in the context file). Never call AMPLITUDE_ tools without `--account`, and never use `amplitude-kreatli-site` (kreatli.com). Use `AMPLITUDE_GET_EVENT_SEGMENTATION` on `signup_completed`, `job_created` and `clipper_applied`, grouped by `first_landing_type` / `first_landing_path`, to see which page types convert, and use that to set ticket priorities. If the account fails, say so in the report and skip this step.

Rules: never edit page content in this task. If Composio or the Keyword Planner script fails, report the exact error and stop that step. Never invent numbers. If the run learned something new, add it to "Lessons from past runs" in `.claude/seo/kreatli-context.md`, then `git pull --ff-only`, commit only that file as one `docs(seo): ...` commit ending with "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>", and `git push origin main`. Never leave it uncommitted: the writer task stops when a tracked file is modified.

Report: a table of tickets filed or updated (ID, page/keyword, label, priority, reason), the pages held as too fresh, the IndexNow result, and any errors.
```

## kreatli-seo-writer

```
SEO writing run for Kreatli Marketplace (https://marketplace.kreatli.com). It publishes straight to main, which deploys to production. Work in the repo at /Users/macgeorge/Downloads/Kreatli/kreatli-front.

1. Prepare the repo
   - `git status --porcelain --untracked-files=no`. If any tracked file is modified, stop and report. Do not stash or discard anything.
   - `git checkout main && git pull --ff-only`.
   - Read `.claude/seo/kreatli-context.md`, then follow `.claude/skills/seo-writer/SKILL.md` exactly. Use `.claude/skills/seo-qa/SKILL.md` for QA.

2. Pick ONE ticket
   - Use Linear only through `npm run seo:linear` (see "Tickets" in the context file). It refuses any workspace but the marketplace's. Never call Composio's Linear tools or a Linear MCP connector directly. Run `npm run seo:linear -- list`.
   - Take the highest-priority Backlog/Todo issue labelled `rewrite` or `new-page` with no future due date (skip anything already In Progress).

3. Write the page and registry entry. Loop on `npm run seo:qa -- <type>/<slug>` until there are no FAILs, do the manual review, and run `npx tsc --noEmit`.

4. Publish on main (there are no PRs; a push to main deploys to production)
   - `git pull --ff-only`. Commit only this ticket's files as ONE commit `feat(seo): ... (<TICKET-ID>)`, ending with "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>".
   - `git push origin main`. Never force-push.
   - Wait for the Vercel deploy and confirm the page is live (`curl -s <url> | grep -o '<title>[^<]*'`). If the deploy fails or the page is wrong, `git revert` the commit, push, and report.
   - Submit the live URL to Bing and Yandex: `npm run seo:indexnow -- <path> --submit`.
   - Comment on the Linear ticket with the commit link, QA result and IndexNow result, move it to Done, and add a check-back date 8 weeks out.

5. Housekeeping: list every URL published this run so someone can Request indexing in the Search Console UI.

If nothing is eligible, say so and stop. Report: the ticket, commit link, live URL, QA result, and anything left unverified.
```
