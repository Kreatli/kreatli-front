import { Link } from '@nextui-org/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { PageHead } from '../../components/seo/PageHead';
import { EarningsCalculator } from '../../components/tools/EarningsCalculator';
import { StaticPageLayout } from '../../components/tools/StaticPageLayout';
import { breadcrumbSchema, faqSchema, webApplicationSchema } from '../../content/seo/schema';

const PATH = '/tools/clipping-earnings-calculator';
const NAME = 'Clipping Earnings Calculator';
const DESCRIPTION =
  'Free clipping earnings calculator: estimate what you make per week and month from fixed-pay clips and CPM campaigns, with view minimums and payout caps.';

const BREADCRUMBS = [
  { name: 'Free tools', path: '/tools' },
  { name: NAME, path: PATH },
];

const FAQS = [
  {
    question: 'How much do clippers make per 1,000 views?',
    answer:
      'CPM clipping campaigns commonly advertise roughly $0.50 to $3 per 1,000 views. What you actually earn depends on the minimum view threshold, the payout cap per clip, platform fees and how many of your views are verified.',
  },
  {
    question: 'How much do freelance clippers charge per clip?',
    answer:
      'Freelance clippers typically charge $15 to $35 for a simple talking-head or podcast clip and $50 to $75 or more for complex gaming, motion graphics or heavy sound design work.',
  },
  {
    question: 'How is CPM clipping pay calculated?',
    answer:
      'Divide the clip’s views by 1,000 and multiply by the campaign rate. Clips below the minimum view threshold earn nothing, and a clip can never earn more than the per-clip payout cap.',
  },
  {
    question: 'Is fixed pay or CPM better for clippers?',
    answer:
      'Fixed pay is predictable: you are paid for the editing work whatever the views. CPM campaigns can pay more on a viral clip but often pay little or nothing for most clips. Many clippers use fixed-pay clients for base income and try campaigns on the side.',
  },
];

const ClippingEarningsCalculatorPage = () => (
  <>
    <PageHead
      title="Clipping Earnings Calculator (CPM & Per Clip) | Kreatli"
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
      eyebrow="Free tool for clippers"
      titlePrefix="Clipping Earnings"
      titleHighlight="Calculator"
      intro={
        <p>
          Estimate how much you can make as a clipper. Enter your fixed-pay clip work, your CPM campaign results, or
          both, and see weekly and monthly earnings. The defaults use the typical rates from our guide to{' '}
          <Link as={NextLink} href="/guides/how-much-do-clippers-make" color="secondary" underline="hover" className="text-lg">
            how much clippers make
          </Link>
          .
        </p>
      }
      faqs={FAQS}
      relatedLinks={[
        { href: '/guides/how-much-do-clippers-make', label: 'How much do clippers make?' },
        { href: '/guides/how-to-become-a-clipper', label: 'How to become a clipper' },
        { href: '/glossary/cpm-meaning-clipping', label: 'CPM meaning in clipping' },
        { href: '/glossary/payout-cap-meaning', label: 'What is a payout cap?' },
        { href: '/clipping-jobs', label: 'Find fixed-pay clipping jobs' },
      ]}
    >
      <EarningsCalculator />
      <section className="mt-12 flex flex-col gap-4 text-foreground-600">
        <h2 className="text-3xl font-semibold text-foreground">How the calculator works</h2>
        <p>
          <strong>Fixed pay:</strong> clips per week × pay per clip gives your weekly income. Your effective hourly rate
          divides that by the hours the clips take, which is the number to watch when deciding whether a client is worth
          keeping.
        </p>
        <p>
          <strong>CPM campaigns:</strong> only clips that clear the campaign&apos;s minimum views pay. Each of those
          earns (views ÷ 1,000) × the rate, up to the payout cap. Multiply by the number of qualifying clips for your
          weekly total.
        </p>
        <p>
          Months are counted as four weeks, so the numbers match the worked examples in our pay guides. Results are
          before platform fees and taxes.
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

export default ClippingEarningsCalculatorPage;
