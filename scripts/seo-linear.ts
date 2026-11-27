/**
 * Linear access for the marketplace SEO loop, through the Composio CLI (SEO-36). Every command first checks that the
 * connected account reaches the workspace in .claude/seo/linear.json, so marketplace tickets never land in another
 * Linear (kreatli.com's tickets live in a different workspace and must never mix with these).
 *
 * Usage:
 *   npm run seo:linear -- check                         # which workspace, team and project the account reaches
 *   npm run seo:linear -- list                          # open tickets in the project, by priority
 *   npm run seo:linear -- search "nexus clips"          # tickets in the project (any state) whose title matches
 *   npm run seo:linear -- show SEO-28                   # one ticket with its description and recent comments
 *   npm run seo:linear -- create --title "..." --label rewrite --priority 2 --file brief.md
 *                                 [--state Backlog] [--due 2026-12-22]
 *   npm run seo:linear -- comment SEO-28 --file note.md  # or --body "..."
 *   npm run seo:linear -- move SEO-28 "In Progress"
 *   npm run seo:linear -- priority SEO-28 2              # 1-4, or urgent/high/medium/low
 *   npm run seo:linear -- due SEO-28 2026-12-22          # or "none" to clear it (the writer skips future due dates)
 *
 * Settings live in .claude/seo/linear.json: the Composio account alias, the workspace URL key it must reach, the
 * team key and the project name. Ticket IDs must belong to that team and project, or the command refuses.
 * Priorities: 1 Urgent, 2 High, 3 Medium, 4 Low.
 */

import fs from 'fs';
import path from 'path';

import { runComposio } from './lib/gsc';

interface LinearConfig {
  account: string;
  workspaceUrlKey: string;
  teamKey: string;
  projectName: string;
}

interface Node {
  id: string;
  name: string;
}

interface Workspace {
  organization: { name: string; urlKey: string };
  team: Node & { key: string; labels: { nodes: Node[] }; states: { nodes: Node[] } };
  project: Node & { url: string };
}

interface IssueSummary {
  identifier: string;
  title: string;
  priority: number;
  url: string;
  dueDate: string | null;
  state: { name: string };
  labels: { nodes: { name: string }[] };
}

const CONFIG_FILE = path.join(process.cwd(), '.claude/seo/linear.json');
const config: LinearConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
const PRIORITY_BY_NAME: Record<string, number> = { urgent: 1, high: 2, medium: 3, low: 4 };
const ISSUE_FIELDS = 'identifier title priority url dueDate state { name } labels { nodes { name } }';
const UPDATE = 'mutation($id: String!, $input: IssueUpdateInput!) { issueUpdate(id: $id, input: $input) { success } }';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const graphql = (query: string, variables: Record<string, unknown> = {}): any => {
  const data = runComposio(
    'LINEAR_RUN_QUERY_OR_MUTATION',
    { query_or_mutation: query, variables },
    { account: config.account },
  );
  if (data.errors?.length) {
    throw new Error(`Linear: ${JSON.stringify(data.errors)}`);
  }
  return data.data;
};

const loadWorkspace = (): Workspace => {
  const data = graphql(`{
    organization { name urlKey }
    teams { nodes { id key name
      labels { nodes { id name } }
      states { nodes { id name } }
      projects { nodes { id name url } } } }
  }`);
  const { organization } = data;

  if (organization.urlKey !== config.workspaceUrlKey) {
    throw new Error(
      `Composio account "${config.account}" reaches Linear workspace "${organization.name}" ` +
        `(${organization.urlKey}), not ${config.workspaceUrlKey}. Nothing was changed. Reconnect it with ` +
        `\`composio link linear --alias ${config.account}\` while the right workspace is open in the browser.`,
    );
  }

  const team = data.teams.nodes.find((node: { key: string }) => node.key === config.teamKey);
  if (!team) {
    throw new Error(`No team with key ${config.teamKey} in ${organization.name}.`);
  }
  const project = team.projects.nodes.find((node: Node) => node.name === config.projectName);
  if (!project) {
    throw new Error(`No project "${config.projectName}" in team ${team.name}.`);
  }

  return { organization, team, project };
};

const findByName = (nodes: Node[], name: string, kind: string) => {
  const match = nodes.find((node) => node.name.toLowerCase() === name.toLowerCase());
  if (!match) {
    throw new Error(`No ${kind} "${name}". Options: ${nodes.map((node) => node.name).join(', ')}`);
  }
  return match.id;
};

/** The ticket, only if it belongs to this team and project; anything else is refused. */
const projectIssue = (workspace: Workspace, identifier: string | undefined) => {
  if (!identifier || !new RegExp(`^${config.teamKey}-\\d+$`).test(identifier)) {
    throw new Error(`Give a ${config.teamKey}-<number> ticket ID (got "${identifier ?? ''}").`);
  }
  const { issue } = graphql(
    `query($id: String!) { issue(id: $id) { id ${ISSUE_FIELDS} description project { id }
      comments(last: 5) { nodes { createdAt body } } } }`,
    { id: identifier },
  );
  if (issue.project?.id !== workspace.project.id) {
    throw new Error(`${identifier} isn't in the "${config.projectName}" project. Nothing was changed.`);
  }
  return issue;
};

const parseFlags = (args: string[]) => {
  const flags: Record<string, string> = {};
  const positional: string[] = [];
  for (let i = 0; i < args.length; i += 1) {
    if (args[i].startsWith('--')) {
      flags[args[i].slice(2)] = args[i + 1];
      i += 1;
    } else {
      positional.push(args[i]);
    }
  }
  return { flags, positional };
};

const readBody = (flags: Record<string, string>) => (flags.file ? fs.readFileSync(flags.file, 'utf8') : flags.body ?? '');

const parsePriority = (value: string | undefined) => {
  const priority = PRIORITY_BY_NAME[value?.toLowerCase() ?? ''] ?? Number(value);
  if (![1, 2, 3, 4].includes(priority)) {
    throw new Error('Priority must be 1 to 4, or urgent, high, medium or low.');
  }
  return priority;
};

const parseDue = (value: string | undefined) => {
  if (value?.toLowerCase() === 'none') return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) {
    throw new Error('Due date must be YYYY-MM-DD, or "none" to clear it.');
  }
  return value as string;
};

const printIssue = (issue: IssueSummary) => {
  const labels = issue.labels.nodes.map((node) => node.name).join(',');
  const due = issue.dueDate ? ` due ${issue.dueDate}` : '';
  const meta = `P${issue.priority} ${issue.state.name} ${labels}${due}`;
  console.log(`${issue.identifier} [${meta}] ${issue.title} ${issue.url}`);
};

const projectIssues = (workspace: Workspace, filter: Record<string, unknown>): IssueSummary[] =>
  graphql(
    `query($id: String!, $filter: IssueFilter) { project(id: $id) {
      issues(first: 100, filter: $filter) { nodes { ${ISSUE_FIELDS} } } } }`,
    { id: workspace.project.id, filter },
  ).project.issues.nodes.sort((a: IssueSummary, b: IssueSummary) => (a.priority || 5) - (b.priority || 5));

const run = () => {
  const [command, ...rest] = process.argv.slice(2).filter((arg) => arg !== '--');
  const { flags, positional } = parseFlags(rest);
  const workspace = loadWorkspace();

  switch (command) {
    case 'check': {
      const { name, urlKey } = workspace.organization;
      console.log(`Workspace ${name} (${urlKey}), team ${workspace.team.key}, project ${workspace.project.url}`);
      break;
    }

    case 'list':
      projectIssues(workspace, { state: { type: { nin: ['completed', 'canceled'] } } }).forEach(printIssue);
      break;

    case 'search': {
      if (!positional[0]) throw new Error('Give the words to search for in ticket titles.');
      projectIssues(workspace, { title: { containsIgnoreCase: positional.join(' ') } }).forEach(printIssue);
      break;
    }

    case 'show': {
      const issue = projectIssue(workspace, positional[0]);
      printIssue(issue);
      console.log(`\n${issue.description ?? ''}\n`);
      issue.comments.nodes.forEach((comment: { createdAt: string; body: string }) => {
        console.log(`--- comment ${comment.createdAt.slice(0, 16)}\n${comment.body}\n`);
      });
      break;
    }

    case 'create': {
      if (!flags.title) throw new Error('--title is required.');
      const input: Record<string, unknown> = {
        teamId: workspace.team.id,
        projectId: workspace.project.id,
        title: flags.title,
        description: readBody(flags),
        priority: parsePriority(flags.priority ?? '3'),
        stateId: findByName(workspace.team.states.nodes, flags.state ?? 'Backlog', 'state'),
        labelIds: flags.label ? [findByName(workspace.team.labels.nodes, flags.label, 'label')] : [],
      };
      if (flags.due) input.dueDate = parseDue(flags.due);
      const { issue } = graphql(
        'mutation($input: IssueCreateInput!) { issueCreate(input: $input) { success issue { identifier url } } }',
        { input },
      ).issueCreate;
      console.log(`${issue.identifier} ${issue.url}`);
      break;
    }

    case 'comment': {
      const issue = projectIssue(workspace, positional[0]);
      const body = readBody(flags);
      if (!body.trim()) throw new Error('Give the comment with --file or --body.');
      graphql('mutation($input: CommentCreateInput!) { commentCreate(input: $input) { success } }', {
        input: { issueId: issue.id, body },
      });
      console.log(`Commented on ${issue.identifier}`);
      break;
    }

    case 'move': {
      const issue = projectIssue(workspace, positional[0]);
      if (!positional[1]) throw new Error('Give the state, e.g. "In Progress".');
      graphql(UPDATE, { id: issue.id, input: { stateId: findByName(workspace.team.states.nodes, positional[1], 'state') } });
      console.log(`${issue.identifier} -> ${positional[1]}`);
      break;
    }

    case 'priority': {
      const issue = projectIssue(workspace, positional[0]);
      const priority = parsePriority(positional[1]);
      graphql(UPDATE, { id: issue.id, input: { priority } });
      console.log(`${issue.identifier} -> P${priority}`);
      break;
    }

    case 'due': {
      const issue = projectIssue(workspace, positional[0]);
      const dueDate = parseDue(positional[1]);
      graphql(UPDATE, { id: issue.id, input: { dueDate } });
      console.log(`${issue.identifier} -> due ${dueDate ?? 'none'}`);
      break;
    }

    default:
      console.error('Commands: check, list, search, show, create, comment, move, priority, due');
      process.exitCode = 2;
  }
};

try {
  run();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
