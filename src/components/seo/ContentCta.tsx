import { Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { SeoPage, SeoPageType } from '../../content/seo/types';

interface Props {
  type: SeoPageType;
  funnelSide: SeoPage['funnelSide'];
}

export const ContentCta = ({ type, funnelSide }: Props) => {
  if (type === 'hire') {
    return null;
  }

  const isClipperFocused = funnelSide === 'clipper';
  const title = isClipperFocused ? 'Ready to find clipping work?' : 'Ready to hire a clip editor?';
  const description = isClipperFocused
    ? 'Create your clipper profile on Kreatli and start applying to clipping jobs from creators who need short-form editors.'
    : 'Post a clipping job on Kreatli and connect with vetted editors who specialize in short-form content.';
  const href = isClipperFocused ? '/signup/professional' : '/jobs/create';
  const label = isClipperFocused ? 'Join as a clipper →' : 'Post a clipping job →';

  return (
    <div className="mt-12 p-6 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg">
      <p className="text-lg font-semibold mb-2">{title}</p>
      <p className="mb-4">{description}</p>
      <Link as={NextLink} href={href} color="secondary" underline="hover">
        {label}
      </Link>
    </div>
  );
};
