import { Button, Card, CardBody, Link } from '@nextui-org/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { PageHead } from '../components/seo/PageHead';
import { StaticPageLayout } from '../components/tools/StaticPageLayout';
import { breadcrumbSchema, faqSchema } from '../content/seo/schema';

const PATH = '/clipping-jobs';
const BREADCRUMBS = [{ name: 'Clipping jobs', path: PATH }];

const JOB_TYPES = [
  {
    title: 'Twitch and Kick stream clipping',
    description: 'Turn stream VODs into Shorts, TikToks, Reels and highlight videos for the streamer’s own channels.',
    links: [
      { href: '/guides/get-paid-to-clip-twitch-streams', label: 'Get paid to clip Twitch streams' },
      { href: '/guides/get-paid-to-clip-kick-streams', label: 'Get paid to clip on Kick' },
    ],
  },
  {
    title: 'YouTube clipping',
    description: 'Cut long-form uploads and livestreams into hook-first YouTube Shorts and vertical clips.',
    links: [{ href: '/guides/get-paid-to-clip-youtube-videos', label: 'YouTube clipper jobs explained' }],
  },
  {
    title: 'Podcast clipping',
    description: 'Find the strongest moments in interviews and episodes and edit them into captioned vertical clips.',
    links: [{ href: '/glossary/podcast-clipping-meaning', label: 'What podcast clipping involves' }],
  },
  {
    title: 'Gaming highlights',
    description: 'Edit gameplay moments with timing, captions, sound effects and memes that work for viewers who missed the stream.',
    links: [{ href: '/hire/hire-a-gaming-clipper', label: 'What creators look for in gaming clippers' }],
  },
];

const STEPS = [
  {
    title: 'Create your clipper profile',
    description: 'Sign up as a clipper and list your skills, the platforms and niches you know, and your availability.',
  },
  {
    title: 'Add samples that match the jobs you want',
    description: 'Three to five vertical clips in your target niche do more than a long general reel.',
  },
  {
    title: 'Apply to clipping jobs',
    description: 'Creators post jobs with the pay type, deliverables and availability they need. Apply with a short, specific cover letter.',
  },
  {
    title: 'Get hired and agree the details',
    description: 'Chat with the creator, confirm scope, turnaround and pay, then deliver finished clips for their channels.',
  },
];

const FAQS = [
  {
    question: 'What are clipping jobs?',
    answer:
      'Clipping jobs pay you to turn a creator’s long videos, streams or podcasts into short vertical clips for TikTok, YouTube Shorts and Instagram Reels. On Kreatli Marketplace the creator pays you for the editing work and posts the clips on their own channels.',
  },
  {
    question: 'How do clipping jobs pay?',
    answer:
      'Creators on Kreatli Marketplace set project, hourly, monthly or yearly pay when they post a job, so your income does not depend on how many views a clip gets. Freelance clippers typically charge $15 to $35 for a simple clip and $50 to $75 or more for complex gaming or motion graphics work.',
  },
  {
    question: 'Are clipping jobs remote?',
    answer: 'Most clipping jobs are remote. Creators share footage online and you deliver finished files, so you can work with creators anywhere.',
  },
  {
    question: 'Do I need experience to get clipping jobs?',
    answer:
      'No formal experience is required, but creators hire based on samples. Build a few vertical clips in the niche you want to work in before you apply.',
  },
  {
    question: 'Is it free to join Kreatli Marketplace as a clipper?',
    answer:
      'Yes. Creating a clipper profile and applying to clipping jobs is free. Premium and points are optional extras that boost your visibility.',
  },
  {
    question: 'What is the difference between clipping jobs and clipping campaigns?',
    answer:
      'In a clipping job you are hired to edit clips for a creator at an agreed rate. In a CPM clipping campaign you post clips on your own accounts and are paid per 1,000 views, often with view minimums and payout caps.',
  },
];

const ClippingJobsPage = () => (
  <>
    <PageHead
      title="Clipping Jobs: Get Paid to Clip Streams & Videos | Kreatli"
      description="Find remote clipping jobs from streamers, YouTubers and podcasters. Get paid per project, hour or month to clip Twitch, Kick and YouTube videos."
      path={PATH}
      ogImageTitle="Clipping jobs: get paid to clip streams and videos"
      jsonLd={[breadcrumbSchema(BREADCRUMBS), faqSchema(FAQS)]}
    />
    <StaticPageLayout
      breadcrumbs={BREADCRUMBS}
      eyebrow="For clippers"
      titlePrefix="Clipping Jobs: Get Paid to"
      titleHighlight="Clip Streams and Videos"
      intro={
        <>
          <p>
            Kreatli Marketplace is where streamers, YouTubers and podcasters post clipping jobs and hire clippers to
            turn their long videos into Shorts, TikToks and Reels. You get paid for the editing work at a rate agreed
            up front, not per view.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button as={NextLink} href="/signup/professional" color="secondary" size="lg">
              Join as a clipper, free
            </Button>
            <Button as={NextLink} href="/jobs" variant="bordered" size="lg">
              Browse clipping jobs
            </Button>
          </div>
          <p className="text-small">Browsing job posts requires a free account.</p>
        </>
      }
      faqs={FAQS}
      relatedLinks={[
        { href: '/guides/how-to-become-a-clipper', label: 'How to become a clipper' },
        { href: '/guides/how-much-do-clippers-make', label: 'How much do clippers make?' },
        { href: '/tools/clipping-earnings-calculator', label: 'Clipping earnings calculator' },
        { href: '/guides/is-clipping-legit', label: 'Is clipping legit? How to spot scams' },
        { href: '/guides/do-you-need-permission-to-clip-streams', label: 'Do you need permission to clip streams?' },
      ]}
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Types of clipping jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {JOB_TYPES.map((jobType) => (
            <Card key={jobType.title} shadow="sm">
              <CardBody className="p-5 gap-2">
                <h3 className="text-xl font-semibold">{jobType.title}</h3>
                <p className="text-foreground-500">{jobType.description}</p>
                <ul className="mt-auto pt-2">
                  {jobType.links.map(({ href, label }) => (
                    <li key={href}>
                      <Link as={NextLink} href={href} color="secondary" underline="hover" size="sm">
                        {label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">How to get hired as a clipper</h2>
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

      <section className="mt-12 flex flex-col gap-4 text-foreground-600">
        <h2 className="text-3xl font-semibold text-foreground">Clipping jobs vs. CPM clipping campaigns</h2>
        <p>
          In a <strong>clipping job</strong>, a creator hires you to edit clips for their channels and pays per project,
          hour or month. In a{' '}
          <Link as={NextLink} href="/glossary/what-is-a-clipping-campaign" color="secondary" underline="hover">
            clipping campaign
          </Link>
          , you post clips on your own accounts and earn per 1,000 views, usually with a{' '}
          <Link as={NextLink} href="/glossary/payout-cap-meaning" color="secondary" underline="hover">
            payout cap
          </Link>{' '}
          and a minimum view threshold. Jobs give you predictable income; campaigns can pay more on a viral clip but
          often pay little for most clips.
        </p>
        <p>
          Compare both with the{' '}
          <Link as={NextLink} href="/tools/clipping-earnings-calculator" color="secondary" underline="hover">
            clipping earnings calculator
          </Link>
          .
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

export default ClippingJobsPage;
