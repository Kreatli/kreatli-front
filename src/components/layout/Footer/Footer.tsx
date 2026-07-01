import { Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import LogoIcon from '../../../assets/images/logo.svg';
import { SEO_SECTION_LABELS } from '../../../content/seo/types';
import { SEO_PAGE_TYPES, SEO_SECTION_PATHS, getPageUrl, getPublishedPagesByType } from '../../../content/seo/utils';

const miscLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy policy' },
  { href: '/terms-and-conditions', label: 'Terms and conditions' },
];

const seoSections = SEO_PAGE_TYPES.map((type) => ({
  type,
  label: SEO_SECTION_LABELS[type],
  href: SEO_SECTION_PATHS[type],
  pages: getPublishedPagesByType(type),
}));

export const Footer = () => (
  <footer className="shadow-medium border-t border-default-100 mt-auto">
    <div className="max-w-screen-xl mx-auto px-6 py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
        <NextLink href="/" aria-label="Kreatli" className="shrink-0">
          <LogoIcon viewBox="0 0 90 22" />
        </NextLink>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 flex-1 lg:max-w-4xl">
          {seoSections.map(({ type, label, href, pages }) => (
            <div key={type}>
              <Link
                as={NextLink}
                href={href}
                size="sm"
                className="text-foreground-700 font-semibold mb-2 inline-block"
                underline="hover"
              >
                {label}
              </Link>
              {pages.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {pages.map((page) => (
                    <li key={page.slug}>
                      <Link
                        as={NextLink}
                        href={getPageUrl(page.type, page.slug)}
                        size="sm"
                        className="text-foreground-500"
                        underline="hover"
                      >
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-foreground-400">Coming soon</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-default-100">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {miscLinks.map(({ href, label }) => (
            <Link key={href} as={NextLink} href={href} size="sm" className="text-foreground-500" underline="hover">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {legalLinks.map(({ href, label }) => (
            <Link key={href} as={NextLink} href={href} size="sm" className="text-foreground-500" underline="hover">
              {label}
            </Link>
          ))}
          <Link href="mailto:support@kreatli.com" size="sm" className="text-foreground-500" underline="hover">
            support@kreatli.com
          </Link>
        </div>
      </div>

      <span className="text-sm text-foreground-500">© Kreatli 2024. All rights reserved.</span>
    </div>
  </footer>
);
