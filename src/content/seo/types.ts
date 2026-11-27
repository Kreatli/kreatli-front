export type SeoPageType = 'compare' | 'glossary' | 'guide' | 'hire' | 'alternatives';

export type FunnelSide = 'creator' | 'clipper' | 'both';

export type SeoWave = 1 | 2 | 3;

export type SearchIntent = 'commercial' | 'informational' | 'transactional';

export type SeoPageStatus = 'draft' | 'ready' | 'published';

export interface SeoPage {
  id: number;
  type: SeoPageType;
  funnelSide: FunnelSide;
  slug: string;
  title: string;
  /** Shorter <title> tag when the H1 is too long for search results (aim for <= 60 chars incl. brand). */
  seoTitle?: string;
  metaDescription: string;
  primaryKeyword: string;
  searchIntent: SearchIntent;
  wave: SeoWave;
  dependency?: string;
  status: SeoPageStatus;
  notes?: string;
  relatedSlugs?: string[];
  ctaHref?: string;
  /** ISO date (YYYY-MM-DD) the page was first published. */
  publishedAt?: string;
  /** ISO date (YYYY-MM-DD) of the last meaningful content update. */
  updatedAt?: string;
  /** Searches this page should win, beyond `primaryKeyword` (SEO-38). Read by SEO scripts, never rendered. */
  targets?: SeoPageTargets;
}

/*
 * Search targets (SEO-38, same shape as kreatli.com's SEO_TARGETS). The on-page check and the ranking check read them.
 *
 * - A group is one search plus the variants Google treats as the same search. `volume` is the exact Keyword Planner
 *   volume of `query` alone, for SEO_TARGETS_MARKET; variants share it and are never added to it. `null` means
 *   Keyword Planner has no data; judge those on Search Console impressions.
 * - `primary` is `primaryKeyword` (lower case) with its volume and variants.
 * - `questions` are what searchers ask. A question counts as answered when a heading contains one of its phrases.
 * - `ownedElsewhere` are searches another page targets; this page shouldn't put them in its title or H1. `owner` is a
 *   path, e.g. `/guides/clipper-pay-rates` or `/hire`.
 * - `exceptions` are rule exceptions the owner approved, with the reason and the ticket.
 * - No search is targeted by two pages. scripts/seo-targets.test.ts checks this and the rest.
 */
export interface SeoSearchGroup {
  query: string;
  variants?: string[];
  volume: number | null;
}

export interface SeoTargetQuestion {
  id: string;
  label: string;
  headingPhrases: string[];
}

export interface SeoTargetException {
  rule: string;
  reason: string;
  ticket: string;
}

export interface SeoPageTargets {
  primary: SeoSearchGroup;
  secondary: SeoSearchGroup[];
  questions: SeoTargetQuestion[];
  ownedElsewhere: { query: string; owner: string }[];
  exceptions: SeoTargetException[];
}

export const SEO_TARGETS_MARKET = {
  label: 'Worldwide, English',
  market: 'worldwide',
  volumesCheckedOn: '2026-11-27',
} as const;

/** Pages outside the registry that own a search, so other pages can point at them in `ownedElsewhere`. */
export const SEO_APP_PAGE_OWNERS: Record<string, string[]> = {
  '/hire': ['hire clippers', 'hire a clipper'],
  '/clipping-jobs': ['clipping jobs', 'get paid to clip', 'get paid to clip streamers', 'get paid for clipping'],
  '/tools/clipping-campaign-cost-calculator': ['how much does a clipping campaign cost'],
};

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface SeoPageWithBody extends SeoPage {
  body: string;
  readTimeMinutes: number;
  faqs: SeoFaq[];
}

export const SEO_SECTION_LABELS: Record<SeoPageType, string> = {
  compare: 'Compare',
  glossary: 'Glossary',
  guide: 'Guides',
  hire: 'Hire Clippers',
  alternatives: 'Alternatives',
};

export const FUNNEL_SIDE_LABELS: Record<FunnelSide, string> = {
  creator: 'For Creators',
  clipper: 'For Clippers',
  both: 'For Everyone',
};
