import { Chip, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { FUNNEL_SIDE_LABELS, SEO_SECTION_LABELS, SeoPageType } from '../../content/seo/types';
import { SEO_SECTION_PATHS } from '../../content/seo/utils';
import { TextLinear } from '../home/TextLinear';

interface Props {
  type: SeoPageType;
  title: string;
  funnelSide: keyof typeof FUNNEL_SIDE_LABELS;
  readTimeMinutes?: number;
  updatedAt?: string;
  children: React.ReactNode;
}

const splitTitleForGradient = (title: string) => {
  const words = title.split(' ');
  if (words.length <= 3) {
    return { prefix: '', highlight: title };
  }

  const highlight = words.slice(-3).join(' ');
  const prefix = words.slice(0, -3).join(' ');

  return { prefix: prefix ? `${prefix} ` : '', highlight };
};

const formatDate = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

export const ContentPageLayout = ({ type, title, funnelSide, readTimeMinutes, updatedAt, children }: Props) => {
  const sectionLabel = SEO_SECTION_LABELS[type];
  const sectionHref = SEO_SECTION_PATHS[type];
  const { prefix, highlight } = splitTitleForGradient(title);

  return (
    <article className="container max-w-screen-md mx-auto px-6 py-12">
      <div className="mb-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 mb-4 text-sm text-foreground-500">
          <Link as={NextLink} href="/" color="secondary" underline="hover" size="sm">
            Home
          </Link>
          <span>/</span>
          <Link as={NextLink} href={sectionHref} color="secondary" underline="hover" size="sm">
            {sectionLabel}
          </Link>
          <span>/</span>
          <span className="text-foreground-400" aria-current="page">
            {title}
          </span>
        </nav>
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }} className="mb-4">
          {FUNNEL_SIDE_LABELS[funnelSide]}
        </Chip>
        <h1 className="text-4xl font-semibold mb-4">
          {prefix}
          <TextLinear>{highlight}</TextLinear>
        </h1>
        {readTimeMinutes || updatedAt ? (
          <div className="flex items-center gap-4 text-sm text-foreground-500 mb-8">
            {readTimeMinutes ? <span>{readTimeMinutes} min read</span> : null}
            {updatedAt ? (
              <span>
                Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
      {children}
    </article>
  );
};
