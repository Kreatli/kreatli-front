import { SEO_PAGES } from './registry';
import { SeoPage, SeoPageType } from './types';

export const SITE_URL = 'https://kreatli.com';

export const getPageUrl = (type: SeoPageType, slug: string) => `/${type === 'guide' ? 'guides' : type}/${slug}`;

export const getPageBySlug = (type: SeoPageType, slug: string): SeoPage | undefined =>
  SEO_PAGES.find((page) => page.type === type && page.slug === slug);

export const getPublishedPagesByType = (type: SeoPageType): SeoPage[] =>
  SEO_PAGES.filter((page) => page.type === type && page.status === 'published');

export const SEO_SECTION_PATHS: Record<SeoPageType, string> = {
  compare: '/compare',
  glossary: '/glossary',
  guide: '/guides',
  hire: '/hire',
};

export const SEO_PAGE_TYPES: SeoPageType[] = ['compare', 'glossary', 'guide', 'hire'];

export const getRelatedPages = (page: SeoPage, limit = 3): SeoPage[] => {
  if (page.relatedSlugs?.length) {
    return page.relatedSlugs
      .map((relatedSlug) => SEO_PAGES.find((entry) => entry.slug === relatedSlug && entry.status === 'published'))
      .filter((entry): entry is SeoPage => Boolean(entry))
      .slice(0, limit);
  }

  return SEO_PAGES.filter(
    (entry) =>
      entry.type === page.type &&
      entry.status === 'published' &&
      entry.slug !== page.slug &&
      (entry.funnelSide === page.funnelSide || entry.funnelSide === 'both' || page.funnelSide === 'both'),
  ).slice(0, limit);
};

export const estimateReadTimeMinutes = (body: string): number => {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const STATIC_SITE_PATHS = [
  '/',
  '/blog',
  '/blog/getting-started-as-a-clipper',
  '/blog/how-to-find-the-perfect-clipper',
  '/blog/clipping-best-practices',
  '/blog/building-your-clipper-portfolio',
  '/faq',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
  '/compare',
  '/glossary',
  '/guides',
  '/hire',
];
