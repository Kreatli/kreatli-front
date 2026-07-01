import { Chip, Link } from '@nextui-org/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { TableOfContents } from '../../components/blog';
import { TextLinear } from '../../components/home/TextLinear';

const GettingStartedAsClipper = () => {
  const siteUrl = 'https://kreatli.com';
  const postUrl = `${siteUrl}/blog/getting-started-as-a-clipper`;
  const title =
    'Getting Started as a Clipper: Your Complete Guide | Kreatli Blog';
  const description =
    'Learn the fundamentals of becoming a successful clipper on Kreatli. From setting up your profile to landing your first clipping project.';
  const publishedTime = '2024-01-15';
  const category = 'For Clippers';
  const keywords = [
    'clipper guide',
    'video editing',
    'kreatli',
    'marketplace tips',
  ];
  const ogImage = `${siteUrl}/logo.png?post=getting-started-as-a-clipper`;

  const tocItems = [
    { id: 'create-profile', title: 'Create Your Profile' },
    { id: 'build-portfolio', title: 'Build Your Portfolio' },
    { id: 'understand-marketplace', title: 'Understand the Marketplace' },
    { id: 'set-rates', title: 'Set Your Rates' },
    { id: 'communicate', title: 'Communicate Effectively' },
    { id: 'deliver-quality', title: 'Deliver Quality Work' },
    { id: 'build-reputation', title: 'Build Your Reputation' },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        <meta name="author" content="Kreatli" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={postUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Kreatli" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Kreatli logo" />
        <meta property="article:section" content={category} />
        <meta property="article:published_time" content={publishedTime} />
        <meta property="article:modified_time" content={publishedTime} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Kreatli logo" />
        <script
          type="application/ld+json"
          // Article structured data for better SEO snippets
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': postUrl,
              },
              headline: title,
              description,
              datePublished: publishedTime,
              dateModified: publishedTime,
              articleSection: category,
              keywords,
              author: {
                '@type': 'Organization',
                name: 'Kreatli',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Kreatli',
                logo: {
                  '@type': 'ImageObject',
                  url: `${siteUrl}/logo.png`,
                  width: 512,
                  height: 512,
                },
              },
              image: [ogImage],
            }),
          }}
        />
        <script
          type="application/ld+json"
          // Breadcrumbs help search engines understand page context
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: siteUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Blog',
                  item: `${siteUrl}/blog`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Getting Started as a Clipper',
                  item: postUrl,
                },
              ],
            }),
          }}
        />
      </Head>
      <article className="container max-w-screen-xl mx-auto px-6 py-12">
        <div className="mb-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-3 text-sm text-foreground-500"
          >
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  as={NextLink}
                  href="/"
                  color="foreground"
                  underline="hover"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  as={NextLink}
                  href="/blog"
                  color="foreground"
                  underline="hover"
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                Getting Started
              </li>
            </ol>
          </nav>
          <Link
            as={NextLink}
            href="/blog"
            color="secondary"
            underline="hover"
            className="mb-4 inline-block"
          >
            ← Back to Blog
          </Link>
          <Chip
            variant="flat"
            color="secondary"
            classNames={{ content: 'font-semibold' }}
            className="mb-4"
          >
            For Clippers
          </Chip>
          <h1 className="text-4xl font-semibold mb-4">
            Getting Started as a <TextLinear>Clipper</TextLinear>: Your Complete
            Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-foreground-500 mb-8">
            <span>January 15, 2024</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>

        <div className="flex gap-8 lg:gap-12">
          <div className="flex-1 prose prose-lg max-w-none text-foreground-700">
            <p className="text-xl text-foreground-600 mb-6">
              Welcome to Kreatli! If you&apos;re new to the clipping
              marketplace, this guide will help you get started on your journey
              as a professional clipper.
            </p>

            <h2
              id="create-profile"
              className="text-3xl font-semibold mt-8 mb-4 scroll-mt-20"
            >
              1. Create Your Profile
            </h2>
            <p className="mb-4">
              Your profile is your first impression. Make it count by including
              a professional bio, showcasing your editing skills, and
              highlighting your experience with video clip creation. Be specific
              about the types of content you excel at—whether it&apos;s gaming
              highlights, educational content, or entertainment clips.
            </p>

            <h2
              id="build-portfolio"
              className="text-3xl font-semibold mt-8 mb-4 scroll-mt-20"
            >
              2. Build Your Portfolio
            </h2>
            <p className="mb-4">
              A strong portfolio is essential for attracting creators. Select
              your best clips that demonstrate your range and quality. Include
              clips from different genres to show versatility. Each portfolio
              piece should tell a story and highlight your ability to identify
              key moments and create engaging short-form content.
            </p>

            <h2
              id="understand-marketplace"
              className="text-3xl font-semibold mt-8 mb-4 scroll-mt-20"
            >
              3. Understand the Marketplace
            </h2>
            <p className="mb-4">
              Kreatli offers two ways to find work: applying to clipping
              campaigns posted by creators, or proactively offering your
              services through service listings. Both approaches have their
              advantages—campaigns let you respond to specific needs, while
              service listings allow you to showcase your expertise and attract
              creators looking for ongoing partnerships.
            </p>

            <h2
              id="set-rates"
              className="text-3xl font-semibold mt-8 mb-4 scroll-mt-20"
            >
              4. Set Your Rates
            </h2>
            <p className="mb-4">
              Research the marketplace to understand competitive rates. Consider
              factors like clip length, complexity, and turnaround time when
              pricing your services. Start with competitive rates to build your
              reputation, then adjust as you gain experience and positive
              reviews.
            </p>

            <h2
              id="communicate"
              className="text-3xl font-semibold mt-8 mb-4 scroll-mt-20"
            >
              5. Communicate Effectively
            </h2>
            <p className="mb-4">
              Clear communication is key to successful collaborations. Respond
              promptly to messages, ask clarifying questions about project
              requirements, and keep creators updated on your progress. Good
              communication builds trust and leads to repeat business.
            </p>

            <h2
              id="deliver-quality"
              className="text-3xl font-semibold mt-8 mb-4 scroll-mt-20"
            >
              6. Deliver Quality Work
            </h2>
            <p className="mb-4">
              Quality should always be your top priority. Take time to
              understand the creator&apos;s vision, pay attention to details,
              and ensure your clips meet or exceed expectations. High-quality
              work leads to positive reviews, which in turn attract more
              opportunities.
            </p>

            <h2
              id="build-reputation"
              className="text-3xl font-semibold mt-8 mb-4 scroll-mt-20"
            >
              7. Build Your Reputation
            </h2>
            <p className="mb-4">
              Every successful project helps build your reputation on Kreatli.
              Focus on delivering consistent quality, meeting deadlines, and
              maintaining professional relationships. As your reputation grows,
              so will your opportunities in the marketplace.
            </p>

            <div className="mt-12 p-6 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg">
              <p className="text-lg font-semibold mb-2">Ready to start?</p>
              <p className="mb-4">
                Join Kreatli today and start connecting with creators who need
                your clipping expertise. Whether you&apos;re just starting out
                or looking to expand your client base, the marketplace offers
                opportunities for clippers at every level.
              </p>
              <Link
                as={NextLink}
                href="/signup/professional"
                color="secondary"
                underline="hover"
              >
                Sign up as a Clipper →
              </Link>
            </div>
          </div>
          <div className="hidden lg:block w-64 flex-shrink-0">
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </article>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'signIn', 'signUp'])),
    },
  };
}

export default GettingStartedAsClipper;
