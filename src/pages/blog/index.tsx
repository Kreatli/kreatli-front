import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Link,
} from '@nextui-org/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { TextLinear } from '../../components/home/TextLinear';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'getting-started-as-a-clipper',
    title: 'Getting Started as a Clipper: Your Complete Guide',
    excerpt:
      'Learn the fundamentals of becoming a successful clipper on Kreatli. From setting up your profile to landing your first clipping project, this guide covers everything you need to know.',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'For Clippers',
  },
  {
    slug: 'how-to-find-the-perfect-clipper',
    title: 'How to Find the Perfect Clipper for Your Content',
    excerpt:
      'Discover strategies for creators to identify and hire the right clipper for their video projects. Learn what to look for in portfolios, how to evaluate skills, and make informed hiring decisions.',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'For Creators',
  },
  {
    slug: 'clipping-best-practices',
    title: 'Clipping Best Practices: Creating Engaging Short-Form Content',
    excerpt:
      'Master the art of creating compelling video clips. Explore techniques for identifying key moments, maintaining narrative flow, and optimizing clips for maximum engagement.',
    date: '2024-01-05',
    readTime: '7 min read',
    category: 'Tips & Tricks',
  },
  {
    slug: 'building-your-clipper-portfolio',
    title: 'Building Your Clipper Portfolio: Showcase Your Best Work',
    excerpt:
      'Learn how to create a standout portfolio that attracts creators. Tips on selecting your best clips, writing compelling descriptions, and positioning yourself in the marketplace.',
    date: '2024-01-01',
    readTime: '5 min read',
    category: 'For Clippers',
  },
];

const siteUrl = 'https://kreatli.com';
const blogPageUrl = `${siteUrl}/blog`;
const BlogPage = () => {
  return (
    <>
      <Head>
        <title>Blog | Kreatli</title>
        <meta
          name="description"
          content="Read the latest tips, guides, and insights about clipping, video editing, and the Kreatli marketplace."
        />
        <link rel="canonical" href={blogPageUrl} />
        <meta name="robots" content="index,follow" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kreatli" />
        <meta property="og:title" content="Blog | Kreatli" />
        <meta
          property="og:description"
          content="Read the latest tips, guides, and insights about clipping, video editing, and the Kreatli marketplace."
        />
        <meta property="og:url" content={blogPageUrl} />
        <meta property="og:image" content={`${siteUrl}/logo.png`} />
        <meta property="og:image:alt" content="Kreatli logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Kreatli" />
        <meta
          name="twitter:description"
          content="Read the latest tips, guides, and insights about clipping, video editing, and the Kreatli marketplace."
        />
        <meta name="twitter:image" content={`${siteUrl}/logo.png`} />
        <script
          type="application/ld+json"
          // Structured data for the blog listing page to improve SEO
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              url: blogPageUrl,
              name: 'Kreatli Blog',
              description:
                'Read the latest tips, guides, and insights about clipping, video editing, and the Kreatli marketplace.',
              publisher: {
                '@type': 'Organization',
                name: 'Kreatli',
                logo: {
                  '@type': 'ImageObject',
                  url: `${siteUrl}/logo.png`,
                },
              },
            }),
          }}
        />
      </Head>
      <div className="container max-w-screen-xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <Chip
            variant="flat"
            color="secondary"
            classNames={{ content: 'font-semibold' }}
          >
            Blog
          </Chip>
          <h1 className="text-5xl font-semibold mt-4 mb-4">
            <TextLinear>Kreatli Blog</TextLinear>
          </h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Tips, guides, and insights for creators and clippers in the video
            clip marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-start gap-2">
                <Chip
                  variant="flat"
                  color="secondary"
                  size="sm"
                  classNames={{ content: 'font-semibold' }}
                >
                  {post.category}
                </Chip>
                <h2 className="text-2xl font-semibold">{post.title}</h2>
              </CardHeader>
              <CardBody>
                <p className="text-foreground-500 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-foreground-400">
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </CardBody>
              <CardFooter>
                <Link
                  as={NextLink}
                  href={`/blog/${post.slug}`}
                  color="secondary"
                  underline="hover"
                >
                  Read more →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
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

export default BlogPage;
