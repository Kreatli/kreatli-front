import { Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

interface Props {
  title?: string;
  links: { href: string; label: string }[];
}

/** Hand-picked internal links for pages outside the SEO registry (blog posts, tools). */
export const RelatedLinks = ({ title = 'Related pages', links }: Props) => {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-default-200 pt-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link as={NextLink} href={href} color="secondary" underline="hover">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
