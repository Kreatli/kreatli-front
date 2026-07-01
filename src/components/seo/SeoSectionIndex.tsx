import { Card, CardBody, CardFooter, CardHeader, Chip, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { SEO_SECTION_LABELS, SeoPage, SeoPageType } from '../../content/seo/types';
import { getPageUrl } from '../../content/seo/utils';
import { TextLinear } from '../home/TextLinear';

interface Props {
  type: SeoPageType;
  pages: SeoPage[];
  description: string;
}

export const SeoSectionIndex = ({ type, pages, description }: Props) => {
  const sectionLabel = SEO_SECTION_LABELS[type];

  return (
    <div className="container max-w-screen-xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          Resources
        </Chip>
        <h1 className="text-5xl font-semibold mt-4 mb-4">
          <TextLinear>{sectionLabel}</TextLinear>
        </h1>
        <p className="text-lg text-foreground-500 max-w-2xl mx-auto">{description}</p>
      </div>

      {pages.length === 0 ? (
        <p className="text-center text-foreground-500">New {sectionLabel.toLowerCase()} pages are coming soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pages.map((page) => (
            <Card key={page.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-start gap-2">
                <Chip variant="flat" color="secondary" size="sm" classNames={{ content: 'font-semibold' }}>
                  {page.primaryKeyword}
                </Chip>
                <h2 className="text-2xl font-semibold">{page.title}</h2>
              </CardHeader>
              <CardBody>
                <p className="text-foreground-500">{page.metaDescription}</p>
              </CardBody>
              <CardFooter>
                <Link as={NextLink} href={getPageUrl(page.type, page.slug)} color="secondary" underline="hover">
                  Read more →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center">
        <Link as={NextLink} href="/" color="secondary" underline="hover">
          ← Back to home
        </Link>
      </div>
    </div>
  );
};
