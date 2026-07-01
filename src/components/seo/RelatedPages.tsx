import { Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { SeoPage } from '../../content/seo/types';
import { getPageUrl } from '../../content/seo/utils';

interface Props {
  pages: SeoPage[];
}

export const RelatedPages = ({ pages }: Props) => {
  if (pages.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 border-t border-default-200 pt-8">
      <h2 className="text-2xl font-semibold mb-4">Related pages</h2>
      <ul className="space-y-2">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link as={NextLink} href={getPageUrl(page.type, page.slug)} color="secondary" underline="hover">
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
