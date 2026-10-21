import { Link } from '@nextui-org/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { PageHead } from '../../components/seo/PageHead';
import { CampaignCostCalculator } from '../../components/tools/CampaignCostCalculator';
import { StaticPageLayout } from '../../components/tools/StaticPageLayout';
import { breadcrumbSchema, faqSchema, webApplicationSchema } from '../../content/seo/schema';

const PATH = '/tools/clipping-campaign-cost-calculator';
const NAME = 'Clipping Campaign Cost Calculator';
const DESCRIPTION =
  'Free clipping campaign cost calculator: compare what hiring clippers at a fixed rate costs with a CPM campaign that pays per 1,000 views.';

const BREADCRUMBS = [
  { name: 'Free tools', path: '/tools' },
  { name: NAME, path: PATH },
];

const FAQS = [
  {
    question: 'How much does a clipping campaign cost?',
    answer:
      'A CPM clipping campaign costs whatever budget you fund. At $1 per 1,000 views, a $1,000 budget pays for up to 1,000,000 paid views. Hiring clippers instead typically costs $15 to $35 per simple clip, so 15 clips a week is about $1,500 a month at $25 each.',
  },
  {
    question: 'How much should I pay clippers?',
    answer:
      'For fixed-pay work, $15 to $35 per clip is typical for talking-head or podcast clips and $50 to $75 or more for complex gaming or motion graphics clips. CPM campaigns commonly advertise roughly $0.50 to $3 per 1,000 views.',
  },
  {
    question: 'Is a CPM campaign cheaper than hiring a clipper?',
    answer:
      'It depends on your views. Compare the effective cost per 1,000 views of hired clips with the campaign rate. CPM campaigns spread clips across many accounts, while hired clippers build your own channels and give you control over quality and brand.',
  },
  {
    question: 'What else should I budget for in a CPM campaign?',
    answer:
      'Platform fees, time to review submissions and verify views, and clear rules on payout caps, minimum views and allowed content. Without verification you can end up paying for botted views.',
  },
];

const ClippingCampaignCostCalculatorPage = () => (
  <>
    <PageHead
      title="Clipping Campaign Cost Calculator | Kreatli"
      description={DESCRIPTION}
      path={PATH}
      ogImageTitle={NAME}
      jsonLd={[
        webApplicationSchema({ name: NAME, description: DESCRIPTION, path: PATH }),
        breadcrumbSchema(BREADCRUMBS),
        faqSchema(FAQS),
      ]}
    />
    <StaticPageLayout
      breadcrumbs={BREADCRUMBS}
      eyebrow="Free tool for creators"
      titlePrefix="Clipping Campaign"
      titleHighlight="Cost Calculator"
      intro={
        <p>
          Work out what clipping will cost you. Price a fixed-pay clipper for your own channels, price a CPM campaign
          that pays per 1,000 views, and compare the two. Defaults use the typical rates from our guide on{' '}
          <Link as={NextLink} href="/guides/how-much-to-pay-clippers" color="secondary" underline="hover" className="text-lg">
            how much to pay clippers
          </Link>
          .
        </p>
      }
      faqs={FAQS}
      relatedLinks={[
        { href: '/guides/how-much-to-pay-clippers', label: 'How much to pay clippers' },
        { href: '/guides/how-to-run-a-clipping-campaign', label: 'How to run a clipping campaign' },
        { href: '/guides/how-to-hire-a-clipper', label: 'How to hire a clipper' },
        { href: '/guides/how-to-verify-clip-views', label: 'How to verify clip views' },
        { href: '/hire', label: 'Hire clippers by platform' },
      ]}
    >
      <CampaignCostCalculator />
      <section className="mt-12 flex flex-col gap-4 text-foreground-600">
        <h2 className="text-3xl font-semibold text-foreground">How the calculator works</h2>
        <p>
          <strong>Hiring clippers:</strong> clips per week × rate per clip, over a four-week month. The effective
          cost per 1,000 views divides that by the views the clips are likely to get on your channels, so you can
          compare it with a campaign rate.
        </p>
        <p>
          <strong>CPM campaign:</strong> (paid views ÷ 1,000) × rate, plus any platform fee. Paid views are the
          views that clear the minimum threshold and are verified. Payout caps don&apos;t raise the total, but they
          stop one viral clip from using up the whole budget.
        </p>
        <p>
          Ready to hire?{' '}
          <Link as={NextLink} href="/jobs/create" color="secondary" underline="hover">
            Post a clipping job on Kreatli Marketplace
          </Link>{' '}
          and agree project, hourly or monthly pay up front.
        </p>
      </section>
    </StaticPageLayout>
  </>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'signIn', 'signUp'])),
  },
});

export default ClippingCampaignCostCalculatorPage;
