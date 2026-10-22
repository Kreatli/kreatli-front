import { Card, CardBody, Chip, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { TextLinear } from '../TextLinear';

const creatorLinks = [
  { href: '/hire', label: 'Hire clippers for YouTube, Twitch, Kick and TikTok' },
  { href: '/guides/how-to-hire-a-clipper', label: 'How to hire a clipper, step by step' },
  { href: '/guides/how-much-to-pay-clippers', label: 'How much to pay clippers' },
  { href: '/tools/clipping-campaign-cost-calculator', label: 'Clipping campaign cost calculator' },
  { href: '/compare/clipping-agency-vs-clipping-marketplace', label: 'Hiring through an agency vs. a marketplace' },
];

const clipperLinks = [
  { href: '/clipping-jobs', label: 'Find clipping jobs from creators' },
  { href: '/guides/how-to-become-a-clipper', label: 'How to become a clipper' },
  { href: '/guides/how-much-do-clippers-make', label: 'How much clippers make' },
  { href: '/tools/clipping-earnings-calculator', label: 'Clipping earnings calculator' },
  { href: '/alternatives/whop-content-rewards-alternatives', label: 'Whop clipping alternatives compared' },
];

const LinkList = ({ title, links }: { title: string; links: { href: string; label: string }[] }) => (
  <Card shadow="sm" className="text-left">
    <CardBody className="p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link as={NextLink} href={href} color="secondary" underline="hover">
              {label} →
            </Link>
          </li>
        ))}
      </ul>
    </CardBody>
  </Card>
);

export const ExploreLinks = () => (
  <section className="flex flex-col gap-2 items-center container max-w-screen-lg mx-auto px-6 text-center mb-20 sm:mb-32">
    <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
      Resources
    </Chip>
    <h2 className="text-4xl font-semibold leading-tight max-w-lg mx-auto mb-8">
      Start with the <TextLinear>right guide</TextLinear>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <LinkList title="For creators hiring clippers" links={creatorLinks} />
      <LinkList title="For clippers looking for work" links={clipperLinks} />
    </div>
  </section>
);
