export type SeoPageType = 'compare' | 'glossary' | 'guide' | 'hire';

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
  metaDescription: string;
  primaryKeyword: string;
  searchIntent: SearchIntent;
  wave: SeoWave;
  dependency?: string;
  status: SeoPageStatus;
  notes?: string;
  relatedSlugs?: string[];
  minListingsRequired?: number;
  ctaHref?: string;
}

export interface SeoPageWithBody extends SeoPage {
  body: string;
  readTimeMinutes: number;
}

export const SEO_SECTION_LABELS: Record<SeoPageType, string> = {
  compare: 'Compare',
  glossary: 'Glossary',
  guide: 'Guides',
  hire: 'Hire',
};

export const FUNNEL_SIDE_LABELS: Record<FunnelSide, string> = {
  creator: 'For Creators',
  clipper: 'For Clippers',
  both: 'For Everyone',
};
