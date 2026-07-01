import { Chip, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { FUNNEL_SIDE_LABELS, SEO_SECTION_LABELS, SeoPageType } from '../../content/seo/types';
import { TextLinear } from '../home/TextLinear';

interface Props {
  type: SeoPageType;
  slug: string;
  title: string;
  funnelSide: keyof typeof FUNNEL_SIDE_LABELS;
  readTimeMinutes?: number;
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

export const ContentPageLayout = ({ type, slug, title, funnelSide, readTimeMinutes, children }: Props) => {
  const sectionLabel = SEO_SECTION_LABELS[type];
  const sectionHref = type === 'guide' ? '/guides' : `/${type}`;
  const { prefix, highlight } = splitTitleForGradient(title);

  return (
    <article className="container max-w-screen-md mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4 text-sm text-foreground-500">
          <Link as={NextLink} href={sectionHref} color="secondary" underline="hover">
            {sectionLabel}
          </Link>
          <span>/</span>
          <span className="text-foreground-400">{slug}</span>
        </div>
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }} className="mb-4">
          {FUNNEL_SIDE_LABELS[funnelSide]}
        </Chip>
        <h1 className="text-4xl font-semibold mb-4">
          {prefix}
          <TextLinear>{highlight}</TextLinear>
        </h1>
        {readTimeMinutes ? (
          <div className="flex items-center gap-4 text-sm text-foreground-500 mb-8">
            <span>{readTimeMinutes} min read</span>
          </div>
        ) : null}
      </div>
      {children}
    </article>
  );
};
