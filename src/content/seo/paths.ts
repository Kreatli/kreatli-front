import { SeoPageType } from './types';

// URL helpers kept apart from the registry so client components (head tags, footer) can use them
// without pulling every SEO page's metadata into the shared app bundle.

// The marketplace lives on its own subdomain; kreatli.com is a different product.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://marketplace.kreatli.com').replace(/\/$/, '');

export const getAbsoluteUrl = (path: string) => `${SITE_URL}${path}`;

export const SEO_SECTION_PATHS: Record<SeoPageType, string> = {
  compare: '/compare',
  glossary: '/glossary',
  guide: '/guides',
  hire: '/hire',
  alternatives: '/alternatives',
};

export const getPageUrl = (type: SeoPageType, slug: string) => `${SEO_SECTION_PATHS[type]}/${slug}`;

export const SEO_PAGE_TYPES: SeoPageType[] = ['hire', 'guide', 'compare', 'alternatives', 'glossary'];
