import { Chip, Link } from '@nextui-org/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { TextLinear } from '../../components/home/TextLinear';

const GettingStartedAsClipper = () => {
  return (
    <>
      <Head>
        <title>Getting Started as a Clipper: Your Complete Guide | Kreatli Marketplace Blog</title>
        <meta
          name="description"
          content="Learn the fundamentals of becoming a successful clipper on Kreatli Marketplace. From setting up your profile to landing your first clipping project."
        />
      </Head>
      <article className="container max-w-screen-md mx-auto px-6 py-12">
        <div className="mb-8">
          <Link as={NextLink} href="/blog" color="secondary" underline="hover" className="mb-4 inline-block">
            ← Back to Blog
          </Link>
          <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }} className="mb-4">
            For Clippers
          </Chip>
          <h1 className="text-4xl font-semibold mb-4">
            Getting Started as a <TextLinear>Clipper</TextLinear>: Your Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-foreground-500 mb-8">
            <span>January 15, 2024</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-foreground-700">
          <p className="text-xl text-foreground-600 mb-6">
            Welcome to Kreatli Marketplace! If you&apos;re new to clipping, this guide will help you get started
            on your journey as a professional clipper.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">1. Create Your Profile</h2>
          <p className="mb-4">
            Your profile is your first impression. Make it count by including a professional bio, showcasing your
            editing skills, and highlighting your experience with video clip creation. Be specific about the types of
            content you excel at—whether it&apos;s gaming highlights, educational content, or entertainment clips.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">2. Build Your Portfolio</h2>
          <p className="mb-4">
            A strong portfolio is essential for attracting creators. Select your best clips that demonstrate your range
            and quality. Include clips from different genres to show versatility. Each portfolio piece should tell a
            story and highlight your ability to identify key moments and create engaging short-form content.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">3. Understand the Marketplace</h2>
          <p className="mb-4">
            Kreatli Marketplace offers two ways to find work: applying to campaigns posted by creators, or
            proactively offering your services through service listings. Both approaches have their advantages—
            campaigns let you respond to specific needs, while service listings allow you to showcase your expertise
            and attract creators looking for ongoing partnerships.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">4. Set Your Rates</h2>
          <p className="mb-4">
            Research the marketplace to understand competitive rates. Consider factors like clip length, complexity, and
            turnaround time when pricing your services. Start with competitive rates to build your reputation, then
            adjust as you gain experience and positive reviews.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">5. Communicate Effectively</h2>
          <p className="mb-4">
            Clear communication is key to successful collaborations. Respond promptly to messages, ask clarifying
            questions about project requirements, and keep creators updated on your progress. Good communication builds
            trust and leads to repeat business.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">6. Deliver Quality Work</h2>
          <p className="mb-4">
            Quality should always be your top priority. Take time to understand the creator&apos;s vision, pay attention
            to details, and ensure your clips meet or exceed expectations. High-quality work leads to positive reviews,
            which in turn attract more opportunities.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">7. Build Your Reputation</h2>
          <p className="mb-4">
            Every successful project helps build your reputation on Kreatli Marketplace. Focus on delivering
            consistent quality, meeting deadlines, and maintaining professional relationships. As your reputation grows,
            so will your
            opportunities in the marketplace.
          </p>

          <div className="mt-12 p-6 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg">
            <p className="text-lg font-semibold mb-2">Ready to start?</p>
            <p className="mb-4">
              Join Kreatli Marketplace today and start connecting with creators who need your clipping expertise.
              Whether you&apos;re just starting out or looking to expand your client base, the marketplace offers
              opportunities for clippers at every level.
            </p>
            <Link as={NextLink} href="/signup/professional" color="secondary" underline="hover">
              Sign up as a Clipper →
            </Link>
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
