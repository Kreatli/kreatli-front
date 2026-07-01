import { Chip, Link } from '@nextui-org/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { TextLinear } from '../../components/home/TextLinear';

const BuildingClipperPortfolio = () => {
  return (
    <>
      <Head>
        <title>Building Your Clipper Portfolio: Showcase Your Best Work | Kreatli Marketplace Blog</title>
        <meta
          name="description"
          content="Learn how to create a standout portfolio that attracts creators. Tips on selecting clips, writing descriptions, and positioning yourself in the marketplace."
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
            Building Your <TextLinear>Clipper Portfolio</TextLinear>: Showcase Your Best Work
          </h1>
          <div className="flex items-center gap-4 text-sm text-foreground-500 mb-8">
            <span>January 1, 2024</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-foreground-700">
          <p className="text-xl text-foreground-600 mb-6">
            Your portfolio is your storefront on Kreatli Marketplace. A well-crafted portfolio showcases your skills,
            attracts the right creators, and helps you stand out in a competitive marketplace. Here&apos;s how to
            build one that works.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">1. Quality Over Quantity</h2>
          <p className="mb-4">
            It&apos;s better to have 5-10 exceptional clips than 20 mediocre ones. Select only your absolute best work
            that demonstrates your skills and range. Each clip should represent a different strength—whether it&apos;s
            pacing, storytelling, or technical execution. Creators want to see what you&apos;re capable of at your best.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">2. Showcase Variety</h2>
          <p className="mb-4">
            While quality is paramount, variety shows versatility. Include clips from different content types—gaming,
            education, entertainment, tutorials. This demonstrates your ability to adapt to different styles and
            audiences. However, if you specialize in a particular niche, make that your focus.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">3. Tell the Story Behind Each Clip</h2>
          <p className="mb-4">
            Don&apos;t just show clips—explain your process. For each portfolio piece, describe the challenge, your
            approach, and the result. This helps creators understand your thinking and problem-solving skills. It also
            demonstrates professionalism and attention to detail.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">4. Highlight Before and After</h2>
          <p className="mb-4">
            When possible, show the original content alongside your clipped version. This helps creators see the
            transformation and understand the value you add. Before-and-after comparisons are powerful demonstrations of
            your editing skills and ability to identify key moments.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">5. Include Metrics When Available</h2>
          <p className="mb-4">
            If you have access to performance data, include it. Metrics like views, engagement rates, or growth
            attributed to your clips provide concrete proof of your impact. Real results speak louder than claims. Just
            ensure you have permission to share this information.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">6. Write Compelling Descriptions</h2>
          <p className="mb-4">
            Each portfolio piece needs a clear, concise description. Explain what the clip is, why it works, and what
            skills it demonstrates. Use keywords that creators might search for, but keep descriptions natural and
            readable. Good descriptions help your portfolio appear in relevant searches.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">7. Organize by Category or Style</h2>
          <p className="mb-4">
            Group similar clips together to make your portfolio easy to navigate. Creators often look for specific
            styles or content types. Organizing your work helps them quickly find relevant examples. Consider creating
            sections like &quot;Gaming Highlights,&quot; &quot;Educational Clips,&quot; or &quot;Entertainment
            Moments.&quot;
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">8. Keep It Updated</h2>
          <p className="mb-4">
            Regularly refresh your portfolio with new work. Remove older clips that no longer represent your current
            skill level. An updated portfolio shows you&apos;re active and continuously improving. It also gives
            creators confidence that you&apos;re currently available and engaged.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">9. Get Client Testimonials</h2>
          <p className="mb-4">
            If you&apos;ve worked with creators before, ask for testimonials or permission to showcase their projects.
            Client endorsements add credibility and social proof. Positive feedback from satisfied creators is one of
            the most effective ways to attract new clients.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">10. Make It Easy to Contact You</h2>
          <p className="mb-4">
            Ensure your portfolio clearly shows how creators can reach you. On Kreatli Marketplace, your profile
            should be complete with contact information and availability. Make it as easy as possible for interested
            creators to start a conversation about potential projects.
          </p>

          <div className="mt-12 p-6 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg">
            <p className="text-lg font-semibold mb-2">Ready to build your portfolio?</p>
            <p className="mb-4">
              Start showcasing your best work on Kreatli Marketplace. A strong portfolio is your ticket to connecting
              with creators who value quality clipping services.
            </p>
            <Link as={NextLink} href="/signup/professional" color="secondary" underline="hover">
              Create Your Profile →
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

export default BuildingClipperPortfolio;
