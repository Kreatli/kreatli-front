import { Accordion, AccordionItem, Chip, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { BreadcrumbItem } from '../../content/seo/schema';
import { SeoFaq } from '../../content/seo/types';
import { TextLinear } from '../home/TextLinear';
import { RelatedLinks } from '../seo/RelatedLinks';

interface Props {
  /** Trail after "Home"; the last item is the current page. */
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  intro: React.ReactNode;
  faqs?: SeoFaq[];
  relatedLinks?: { href: string; label: string }[];
  children: React.ReactNode;
}

/** Layout for hand-built public pages (tools, clipping jobs) that aren't markdown SEO pages. */
export const StaticPageLayout = ({
  breadcrumbs,
  eyebrow,
  titlePrefix,
  titleHighlight,
  intro,
  faqs = [],
  relatedLinks = [],
  children,
}: Props) => (
  <article className="container max-w-screen-md mx-auto px-6 py-12">
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 mb-4 text-sm text-foreground-500">
      <Link as={NextLink} href="/" color="secondary" underline="hover" size="sm">
        Home
      </Link>
      {breadcrumbs.map((item, index) =>
        (index === breadcrumbs.length - 1 ? (
          <React.Fragment key={item.path}>
            <span>/</span>
            <span className="text-foreground-400" aria-current="page">
              {item.name}
            </span>
          </React.Fragment>
        ) : (
          <React.Fragment key={item.path}>
            <span>/</span>
            <Link as={NextLink} href={item.path} color="secondary" underline="hover" size="sm">
              {item.name}
            </Link>
          </React.Fragment>
        )))}
    </nav>
    <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }} className="mb-4">
      {eyebrow}
    </Chip>
    <h1 className="text-4xl sm:text-5xl font-semibold mb-4">
      {titlePrefix} <TextLinear>{titleHighlight}</TextLinear>
    </h1>
    <div className="text-lg text-foreground-500 mb-10 flex flex-col gap-4">{intro}</div>

    {children}

    {faqs.length > 0 && (
      <section className="mt-16">
        <h2 className="text-3xl font-semibold mb-4">Frequently asked questions</h2>
        {/* keepContentMounted keeps collapsed answers in the server-rendered HTML */}
        <Accordion keepContentMounted variant="splitted" className="px-0">
          {faqs.map(({ question, answer }) => (
            <AccordionItem key={question} title={<h3 className="text-base font-semibold">{question}</h3>} aria-label={question}>
              <p className="text-foreground-500">{answer}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    )}

    <RelatedLinks links={relatedLinks} />
  </article>
);
