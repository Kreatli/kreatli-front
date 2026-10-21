import { Card, CardBody, CardFooter, CardHeader, Chip, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { TextLinear } from '../../components/home/TextLinear';
import { PageHead } from '../../components/seo/PageHead';
import { breadcrumbSchema } from '../../content/seo/schema';

interface BlogPost {
  href: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    href: '/guides/how-to-become-a-clipper',
    title: 'How to Become a Clipper: The 2026 Step-by-Step Guide',
    excerpt: 'The skills and software you need, how to build samples, and how to find fixed-pay clipping jobs or CPM campaigns.',
    date: '2026-10-21',
    readTime: '8 min read',
    category: 'Guide for clippers',
  },
  {
    href: '/guides/how-to-hire-a-clipper',
    title: 'How to Hire a Clipper: A Step-by-Step Guide for Creators',
    excerpt: 'Choose a pay model, write the job post, vet portfolios, run a paid test clip and onboard a clipper who learns your style.',
    date: '2026-10-21',
    readTime: '7 min read',
    category: 'Guide for creators',
  },
  {
    href: '/blog/clipping-best-practices',
    title: 'Clipping Best Practices: Creating Engaging Short-Form Content',
    excerpt: 'Master the art of creating compelling video clips. Explore techniques for identifying key moments, maintaining narrative flow, and optimizing clips for maximum engagement.',
    date: '2024-01-05',
    readTime: '7 min read',
    category: 'Tips & Tricks',
  },
  {
    href: '/guides/video-editing-portfolio-no-clients',
    title: 'How to Build a Portfolio Before You Have Clients',
    excerpt: 'What samples to make, which niches to pick, and how to present a clipping portfolio before you have paid clients.',
    date: '2026-07-09',
    readTime: '6 min read',
    category: 'Guide for clippers',
  },
];

const BlogPage = () => {
  return (
    <>
      <PageHead
        title="Clipping Blog: Tips for Clippers and Creators | Kreatli"
        description="Tips for clippers and creators: getting started as a clipper, building a portfolio, clipping best practices and finding the right clipper for your content."
        path="/blog"
        jsonLd={breadcrumbSchema([{ name: 'Blog', path: '/blog' }])}
      />
      <div className="container max-w-screen-xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
            Blog
          </Chip>
          <h1 className="text-5xl font-semibold mt-4 mb-4">
            <TextLinear>Kreatli Marketplace Blog</TextLinear>
          </h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Tips, guides, and insights for creators and clippers in the video clip marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.href} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-start gap-2">
                <Chip variant="flat" color="secondary" size="sm" classNames={{ content: 'font-semibold' }}>
                  {post.category}
                </Chip>
                <h2 className="text-2xl font-semibold">{post.title}</h2>
              </CardHeader>
              <CardBody>
                <p className="text-foreground-500 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-foreground-400">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </CardBody>
              <CardFooter>
                <Link as={NextLink} href={post.href} color="secondary" underline="hover">
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
