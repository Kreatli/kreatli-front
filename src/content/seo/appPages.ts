import { SeoPageTargets } from './types';

/*
 * Search targets for app pages: pages built in src/pages, not from the markdown registry (SEO-25, SEO-45). Same shape
 * as a registry entry's `targets`, so the on-page check, `seo:gate` and the weekly ranking check treat them alike.
 * `primary` is the page's main search. Questions are checked against the rendered page by the on-page check (the
 * markdown heading test in seo:test can't see TSX headings). Read by SEO scripts only; never imported by a page.
 */
export const APP_PAGE_TARGETS: Record<string, SeoPageTargets> = {
  '/clipping-jobs': {
    primary: { query: 'clipping jobs', variants: ['clipping job'], volume: 480 },
    secondary: [
      { query: 'get paid for clipping', volume: 390 },
      { query: 'get paid to clip', volume: 320 },
      { query: 'get paid to clip streamers', volume: 210 },
      { query: 'clipping jobs online', volume: 110 },
      { query: 'short form video editing jobs', volume: 90 },
      { query: 'clipper jobs for streamers', volume: 30 },
    ],
    questions: [
      { id: 'what', label: 'What are clipping jobs?', headingPhrases: ['what are clipping jobs'] },
      { id: 'pay', label: 'How do clipping jobs pay?', headingPhrases: ['how do clipping jobs pay'] },
      { id: 'legit', label: 'Are clipping jobs legit?', headingPhrases: ['are clipping jobs legit'] },
      { id: 'remote', label: 'Are clipping jobs remote?', headingPhrases: ['are clipping jobs remote'] },
      {
        id: 'experience',
        label: 'Do I need experience to get clipping jobs?',
        headingPhrases: ['need experience to get clipping jobs'],
      },
    ],
    ownedElsewhere: [
      { query: 'clipping campaigns', owner: '/glossary/what-is-a-clipping-campaign' },
      { query: 'how to become a clipper', owner: '/guides/how-to-become-a-clipper' },
    ],
    exceptions: [],
  },
  '/hire': {
    primary: { query: 'hire clippers', variants: ['hire clipper'], volume: 140 },
    secondary: [
      { query: 'clippers for hire', variants: ['clipper for hire'], volume: 50 },
      { query: 'hire a clipper', volume: 30 },
    ],
    questions: [
      { id: 'how', label: 'How do I hire a clipper?', headingPhrases: ['how do i hire a clipper', 'how hiring a clipper works'] },
      {
        id: 'cost',
        label: 'How much does it cost to hire a clipper?',
        headingPhrases: ['cost to hire a clipper', 'what clippers cost'],
      },
      { id: 'free', label: 'Is it free to post a clipping job?', headingPhrases: ['free to post a clipping job'] },
      {
        id: 'vs-cpm',
        label: 'Hire a clipper or run a CPM clipping campaign?',
        headingPhrases: ['clipping campaigns', 'cpm clipping campaign'],
      },
    ],
    ownedElsewhere: [
      { query: 'how to hire a clipper', owner: '/guides/how-to-hire-a-clipper' },
      { query: 'how much to pay clippers', owner: '/guides/how-much-to-pay-clippers' },
    ],
    exceptions: [],
  },
  '/tools/clipping-campaign-cost-calculator': {
    primary: { query: 'clipping campaign cost calculator', variants: ['clipping campaign calculator'], volume: null },
    secondary: [{ query: 'how much does a clipping campaign cost', volume: null }],
    questions: [],
    ownedElsewhere: [],
    exceptions: [],
  },
};

/** Every search an app page owns, so registry pages can point at it in `ownedElsewhere`. */
export const SEO_APP_PAGE_OWNERS: Record<string, string[]> = Object.fromEntries(
  Object.entries(APP_PAGE_TARGETS).map(([path, targets]) => [
    path,
    [targets.primary, ...targets.secondary].flatMap((group) => [group.query, ...(group.variants ?? [])]),
  ]),
);
