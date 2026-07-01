import { Button } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { SeoPageWithBody } from '../../content/seo/types';

interface Props {
  page: SeoPageWithBody;
}

export const HirePageCta = ({ page }: Props) => (
  <div className="mt-12 p-8 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg text-center">
    <h2 className="text-2xl font-semibold mb-3">Find the right editor on Kreatli Marketplace</h2>
    <p className="text-foreground-600 mb-6 max-w-xl mx-auto">
      Post a job describing your niche, clip style, and turnaround needs. Kreatli Marketplace connects you with editors
      who specialize in short-form content — no Discord hunting required.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button as={NextLink} href={page.ctaHref ?? '/jobs/create'} color="secondary" size="lg">
        Post a job
      </Button>
      <Button as={NextLink} href="/signup/professional" variant="bordered" size="lg">
        Join as an editor
      </Button>
    </div>
    <p className="text-sm text-foreground-400 mt-4">
      Sign in required to browse listings. Create a free account to get started.
    </p>
  </div>
);
