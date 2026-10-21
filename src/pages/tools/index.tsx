import { Card, CardBody, CardFooter, CardHeader, Chip, Link } from '@nextui-org/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { TextLinear } from '../../components/home/TextLinear';
import { PageHead } from '../../components/seo/PageHead';
import { breadcrumbSchema } from '../../content/seo/schema';

const TOOLS = [
  {
    href: '/tools/clipping-earnings-calculator',
    audience: 'For clippers',
    title: 'Clipping Earnings Calculator',
    description: 'Estimate weekly and monthly earnings from fixed-pay clips and CPM campaigns, with view minimums and payout caps.',
  },
  {
    href: '/tools/clipping-campaign-cost-calculator',
    audience: 'For creators',
    title: 'Clipping Campaign Cost Calculator',
    description: 'Compare the cost of hiring clippers at a fixed rate with a CPM campaign that pays per 1,000 views.',
  },
];

const ToolsIndexPage = () => (
  <>
    <PageHead
      title="Free Clipping Calculators | Kreatli"
      description="Free calculators for clipping: estimate clipper earnings per clip and per 1,000 views, or work out what a clipping campaign or hired clipper will cost."
      path="/tools"
      jsonLd={breadcrumbSchema([{ name: 'Free tools', path: '/tools' }])}
    />
    <div className="container max-w-screen-xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          Free tools
        </Chip>
        <h1 className="text-5xl font-semibold mt-4 mb-4">
          Clipping <TextLinear>Calculators</TextLinear>
        </h1>
        <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
          Run the numbers before you take a clipping job or fund a campaign.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {TOOLS.map((tool) => (
          <Card key={tool.href} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-start gap-2">
              <Chip variant="flat" color="secondary" size="sm" classNames={{ content: 'font-semibold' }}>
                {tool.audience}
              </Chip>
              <h2 className="text-2xl font-semibold">{tool.title}</h2>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-500">{tool.description}</p>
            </CardBody>
            <CardFooter>
              <Link as={NextLink} href={tool.href} color="secondary" underline="hover">
                Open calculator →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  </>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'signIn', 'signUp'])),
  },
});

export default ToolsIndexPage;
