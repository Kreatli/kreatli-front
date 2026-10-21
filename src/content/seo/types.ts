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
}

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
