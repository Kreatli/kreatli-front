import { BRAND_NAME } from '../../constants/brand';
import { getAbsoluteUrl, getPageUrl, SEO_SECTION_PATHS, SITE_URL } from './paths';
import { SEO_SECTION_LABELS, SeoFaq, SeoPage } from './types';

type JsonLd = Record<string, unknown>;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const getOgImageUrl = (title: string) => getAbsoluteUrl(`/api/og?title=${encodeURIComponent(title)}`);

export const organizationSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: BRAND_NAME,
  url: `${SITE_URL}/`,
  logo: getAbsoluteUrl('/logo.png'),
  email: 'support@kreatli.com',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Kreatli',
    url: 'https://kreatli.com/',
  },
});

export const websiteSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: BRAND_NAME,
  url: `${SITE_URL}/`,
  publisher: { '@id': ORGANIZATION_ID },
});

export const organizationRef = () => ({
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: BRAND_NAME,
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: getAbsoluteUrl('/logo.png') },
});

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export const breadcrumbSchema = (items: BreadcrumbItem[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: getAbsoluteUrl(item.path),
  })),
});

export const faqSchema = (faqs: SeoFaq[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
});

interface WebApplicationSchemaInput {
  name: string;
  description: string;
  path: string;
}

export const webApplicationSchema = ({ name, description, path }: WebApplicationSchemaInput): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  description,
  url: getAbsoluteUrl(path),
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: organizationRef(),
});

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string;
}

export const articleSchema = ({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  keywords,
}: ArticleSchemaInput): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  description,
  url: getAbsoluteUrl(path),
  mainEntityOfPage: getAbsoluteUrl(path),
  image: getOgImageUrl(headline),
  ...(datePublished && { datePublished }),
  ...((dateModified ?? datePublished) && { dateModified: dateModified ?? datePublished }),
  ...(keywords && { keywords }),
  author: organizationRef(),
  publisher: organizationRef(),
});

const getMainEntitySchema = (page: SeoPage): JsonLd => {
  const path = getPageUrl(page.type, page.slug);
  const url = getAbsoluteUrl(path);

  if (page.type === 'glossary') {
    return {
      '@context': 'https://schema.org',
      '@type': 'DefinedTerm',
      name: page.title,
      description: page.metaDescription,
      url,
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: `${BRAND_NAME} Clipping Glossary`,
        url: getAbsoluteUrl(SEO_SECTION_PATHS.glossary),
      },
    };
  }

  if (page.type === 'hire') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.title,
      description: page.metaDescription,
      url,
      serviceType: page.primaryKeyword,
      areaServed: 'Worldwide',
      provider: organizationRef(),
    };
  }

  return articleSchema({
    headline: page.title,
    description: page.metaDescription,
    path,
    datePublished: page.publishedAt,
    dateModified: page.updatedAt,
    keywords: page.primaryKeyword,
  });
};

export const getSeoPageSchemas = (page: SeoPage, faqs: SeoFaq[] = []): JsonLd[] => {
  const schemas = [
    getMainEntitySchema(page),
    breadcrumbSchema([
      { name: SEO_SECTION_LABELS[page.type], path: SEO_SECTION_PATHS[page.type] },
      { name: page.title, path: getPageUrl(page.type, page.slug) },
    ]),
  ];

  if (faqs.length > 0) {
    schemas.push(faqSchema(faqs));
  }

  return schemas;
};
