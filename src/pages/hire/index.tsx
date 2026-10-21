import { Button, Card, CardBody, Link } from '@nextui-org/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { PageHead } from '../../components/seo/PageHead';
import { StaticPageLayout } from '../../components/tools/StaticPageLayout';
import { breadcrumbSchema, faqSchema, organizationRef } from '../../content/seo/schema';
import { SeoPage } from '../../content/seo/types';
import { getAbsoluteUrl, getPageUrl, getPublishedPagesByType } from '../../content/seo/utils';

const PATH = '/hire';
const BREADCRUMBS = [{ name: 'Hire clippers', path: PATH }];
const DESCRIPTION =
  'Hire clippers for your Twitch, Kick, YouTube and podcast content. Post a clipping job, set your pay, and pick a clipper whose samples match your style.';

const STEPS = [
  {
    title: 'Post a clipping job',
    description:
      'Describe your content, the clips you need each week, your style and turnaround, and set project, hourly or monthly pay.',
  },
  {
    title: 'Review clippers who apply',
    description: 'Compare portfolios and samples in your niche, then message the clippers you like.',
  },
  {
    title: 'Run a paid test clip',
    description: 'Send the same footage to your shortlist and hire the clipper whose cut fits your channel best.',
  },
  {
    title: 'Get clips every week',
    description: 'Your clipper delivers finished vertical clips for your own TikTok, Shorts and Reels accounts.',
  },
];

const PAY_MODELS = [
  { label: 'Simple talking-head or podcast clip', rate: '$15–$35 per clip' },
  { label: 'Clip with B-roll, zooms and branded captions', rate: '$30–$50 per clip' },
  { label: 'Gaming highlight with sound effects and memes', rate: '$50–$75+ per clip' },
  { label: 'Ongoing weekly volume', rate: 'Monthly retainer' },
];

const FAQS = [
  {
    question: 'How do I hire a clipper?',
    answer:
      'Post a clipping job on Kreatli Marketplace with your content type, weekly clip volume, style and pay. Review the clippers who apply, run a paid test clip with your shortlist, and hire the one whose work fits your channel.',
  },
  {
    question: 'How much does it cost to hire a clipper?',
    answer:
      'Freelance clippers typically charge $15 to $35 for a simple talking-head or podcast clip and $50 to $75 or more for complex gaming or motion graphics clips. Many creators move to a monthly retainer once volume is steady.',
  },
  {
    question: 'Is it free to post a clipping job?',
    answer:
      'Yes. Posting a clipping job and connecting with clippers on Kreatli Marketplace is free. You agree the clipper’s pay with them directly.',
  },
  {
    question: 'Should I hire a clipper or run a CPM clipping campaign?',
    answer:
      'Hire a clipper when you want consistent, on-brand clips for your own channels at a predictable cost. A CPM campaign pays many clippers per 1,000 views on their own accounts, which spreads reach but gives you less control over quality.',
  },
  {
    question: 'Who owns the clips a hired clipper makes?',
    answer:
      'Agree this in the job details. Typically the creator owns the finished clips and posts them on their own accounts, and the clipper may ask to show them in their portfolio.',
  },
];

interface Props {
  pages: SeoPage[];
}

const HireClippersPage = ({ pages }: Props) => (
  <>
    <PageHead
      title="Hire Clippers for Twitch, Kick, YouTube & TikTok | Kreatli"
      description={DESCRIPTION}
      path={PATH}
      ogImageTitle="Hire clippers for your streams and videos"
      jsonLd={[
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Hire clippers',
          serviceType: 'Video clipping',
          description: DESCRIPTION,
          url: getAbsoluteUrl(PATH),
          areaServed: 'Worldwide',
          provider: organizationRef(),
        },
        breadcrumbSchema(BREADCRUMBS),
        faqSchema(FAQS),
      ]}
    />
    <StaticPageLayout
      breadcrumbs={BREADCRUMBS}
      eyebrow="For creators"
      titlePrefix="Hire"
      titleHighlight="Clippers for Your Streams and Videos"
      intro={
        <>
          <p>
            Kreatli Marketplace connects streamers, YouTubers and podcasters with clippers who turn long videos into
            Shorts, TikToks and Reels. Post a clipping job, set the pay, and hire a clipper whose samples match your
            style. You pay for the editing work, not per view.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button as={NextLink} href="/jobs/create" color="secondary" size="lg">
              Post a clipping job, free
            </Button>
            <Button as={NextLink} href="/guides/how-to-hire-a-clipper" variant="bordered" size="lg">
              How hiring works
            </Button>
          </div>
        </>
      }
      faqs={FAQS}
      relatedLinks={[
        { href: '/guides/how-to-hire-a-clipper', label: 'How to hire a clipper, step by step' },
        { href: '/guides/how-much-to-pay-clippers', label: 'How much to pay clippers' },
        { href: '/guides/how-to-write-a-clipper-job-post', label: 'Clipper job post template' },
        { href: '/tools/clipping-campaign-cost-calculator', label: 'Clipping campaign cost calculator' },
        { href: '/compare/clipping-agency-vs-clipping-marketplace', label: 'Clipping agency vs. clipping marketplace' },
      ]}
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Hire a clipper for your platform</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pages.map((page) => (
            <Card key={page.slug} shadow="sm" as={NextLink} href={getPageUrl(page.type, page.slug)} isPressable>
              <CardBody className="p-5 gap-1">
                <h3 className="text-lg font-semibold">{page.title}</h3>
                <p className="text-small text-foreground-500">{page.metaDescription}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">How hiring a clipper works</h2>
        <ol className="flex flex-col gap-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-100 font-semibold text-secondary-600">
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-foreground-500">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">What clippers cost</h2>
        <p className="text-foreground-600">
          Typical freelance rates for short-form clipping. Work out your own budget with the{' '}
          <Link as={NextLink} href="/tools/clipping-campaign-cost-calculator" color="secondary" underline="hover">
            clipping cost calculator
          </Link>
          .
        </p>
        <dl className="flex flex-col gap-2 rounded-medium bg-secondary-50 dark:bg-secondary-900/20 p-4">
          {PAY_MODELS.map(({ label, rate }) => (
            <div key={label} className="flex items-baseline justify-between gap-4">
              <dt className="text-foreground-600">{label}</dt>
              <dd className="font-semibold whitespace-nowrap">{rate}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 flex flex-col gap-4 text-foreground-600">
        <h2 className="text-3xl font-semibold text-foreground">Hiring clippers vs. CPM clipping campaigns</h2>
        <p>
          A hired clipper edits clips for <strong>your own channels</strong> at an agreed rate, learns your style and
          delivers every week. A{' '}
          <Link as={NextLink} href="/glossary/what-is-a-clipping-campaign" color="secondary" underline="hover">
            CPM clipping campaign
          </Link>{' '}
          pays many clippers per 1,000 views on <strong>their</strong> accounts: more reach for the budget, less control
          over quality and brand. Plenty of creators do both. See{' '}
          <Link as={NextLink} href="/guides/how-to-run-a-clipping-campaign" color="secondary" underline="hover">
            how to run a clipping campaign
          </Link>{' '}
          for the trade-offs.
        </p>
      </section>
    </StaticPageLayout>
  </>
);

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    pages: getPublishedPagesByType('hire'),
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'signIn', 'signUp'])),
  },
});

export default HireClippersPage;
