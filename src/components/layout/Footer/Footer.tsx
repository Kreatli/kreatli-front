import { Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import LogoIcon from '../../../assets/images/logo.svg';
import { BRAND_NAME } from '../../../constants/brand';
import { getPageUrl, SEO_PAGE_TYPES, SEO_SECTION_PATHS } from '../../../content/seo/paths';
import { SEO_SECTION_LABELS, SeoPageType } from '../../../content/seo/types';
import { useSession } from '../../../hooks/useSession';

const miscLinks = [
  { href: '/clipping-jobs', label: 'Clipping jobs' },
  { href: '/tools', label: 'Free tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy policy' },
  { href: '/terms-and-conditions', label: 'Terms and conditions' },
];

// Hand-picked so the footer stays short and the shared app bundle doesn't carry the SEO registry.
// Each section heading links to its hub, which lists every page.
const FOOTER_LINKS: Record<SeoPageType, { slug: string; label: string }[]> = {
  hire: [
    { slug: 'hire-a-twitch-clipper', label: 'Hire a Twitch clipper' },
    { slug: 'hire-a-kick-clipper', label: 'Hire a Kick clipper' },
    { slug: 'hire-a-youtube-clipper', label: 'Hire a YouTube clipper' },
    { slug: 'hire-a-podcast-clipper', label: 'Hire a podcast clipper' },
    { slug: 'hire-a-tiktok-clipper', label: 'Hire a TikTok clipper' },
    { slug: 'hire-a-gaming-clipper', label: 'Hire a gaming clipper' },
  ],
  guide: [
    { slug: 'how-to-hire-a-clipper', label: 'How to hire a clipper' },
    { slug: 'how-much-to-pay-clippers', label: 'How much to pay clippers' },
    { slug: 'how-to-become-a-clipper', label: 'How to become a clipper' },
    { slug: 'how-much-do-clippers-make', label: 'How much clippers make' },
    { slug: 'clipper-pay-rates', label: 'Clipper pay rates' },
    { slug: 'best-clipping-platforms', label: 'Best clipping platforms' },
  ],
  compare: [
    { slug: 'kreatli-vs-fiverr', label: 'Kreatli vs. Fiverr' },
    { slug: 'kreatli-vs-upwork', label: 'Kreatli vs. Upwork' },
    { slug: 'kreatli-vs-whop-clips', label: 'Kreatli vs. Whop' },
    { slug: 'kreatli-vs-vyro', label: 'Kreatli vs. Vyro' },
    { slug: 'kreatli-vs-discord-clipping-communities', label: 'Clipping Discord servers' },
    { slug: 'clipping-agency-vs-clipping-marketplace', label: 'Clipping agency vs. marketplace' },
  ],
  alternatives: [
    { slug: 'whop-content-rewards-alternatives', label: 'Whop alternatives' },
    { slug: 'vyro-alternatives', label: 'Vyro alternatives' },
    { slug: 'clipfarm-alternatives', label: 'ClipFarm alternatives' },
  ],
  glossary: [
    { slug: 'what-is-a-clipper', label: 'What is a clipper?' },
    { slug: 'what-is-a-clipping-campaign', label: 'What is a clipping campaign?' },
    { slug: 'cpm-meaning-clipping', label: 'CPM in clipping' },
    { slug: 'what-is-clip-farming', label: 'What is clip farming?' },
    { slug: 'payout-cap-meaning', label: 'Payout caps' },
    { slug: 'what-is-a-vod', label: 'What is a VOD?' },
  ],
};

const seoSections = SEO_PAGE_TYPES.map((type) => ({
  type,
  label: SEO_SECTION_LABELS[type],
  href: SEO_SECTION_PATHS[type],
  links: FOOTER_LINKS[type].map(({ slug, label }) => ({ href: getPageUrl(type, slug), label })),
}));

export const Footer = () => {
  const { isSignedIn } = useSession();

  if (isSignedIn) {
    return null;
  }

  return (
    <footer className="shadow-medium border-t border-default-100 mt-auto">
      <div className="max-w-screen-xl mx-auto px-6 py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <NextLink href="/" aria-label={BRAND_NAME} className="shrink-0">
            <LogoIcon viewBox="0 0 90 22" />
          </NextLink>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 flex-1 lg:max-w-5xl">
            {seoSections.map(({ type, label, href, links }) => (
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
                <ul className="flex flex-col gap-1">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link as={NextLink} href={link.href} size="sm" className="text-foreground-500" underline="hover">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link as={NextLink} href={href} size="sm" color="secondary" underline="hover">
                      View all →
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-default-100">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {miscLinks.map(({ href, label }) => (
              <Link
                key={href}
                as={NextLink}
                href={href}
                size="sm"
                className="text-foreground-500"
                underline="hover"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {legalLinks.map(({ href, label }) => (
              <Link
                key={href}
                as={NextLink}
                href={href}
                size="sm"
                className="text-foreground-500"
                underline="hover"
              >
                {label}
              </Link>
            ))}
            <Link
              href="mailto:support@kreatli.com"
              size="sm"
              className="text-foreground-500"
              underline="hover"
            >
              support@kreatli.com
            </Link>
          </div>
        </div>

        <span className="text-sm text-foreground-500">
          © {BRAND_NAME} 2026. All rights reserved.
        </span>
      </div>
    </footer>
  );
};
