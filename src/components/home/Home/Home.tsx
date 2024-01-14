import { Accordion, AccordionItem, Chip } from '@nextui-org/react';
import React from 'react';

import { Video } from '../../various/Video';
import { Feature } from '../Feature';
import { DesktopFrame } from '../Frames';
import { Hero } from '../Hero';
import { TextLinear } from '../TextLinear';

export const Home = () => {
  const creatorFeatures = [
    {
      icon: 'certification' as const,
      title: 'Only Pre-Vetted \nProfessionals',
      text: 'We meticulously verify every profile and portfolio to ensure professionals deliver top-notch quality.',
    },
    {
      icon: 'medal' as const,
      title: 'Quality Over \nQuantity',
      text: 'We prioritize quality work over budget options, educating clients about the advantages of collaborating with skilled professionals.',
    },
    {
      icon: 'conversation' as const,
      title: 'Unified Platform: Secure Communication \nand No-Bot Policy',
      text: 'Our platform offers secure and efficient communication tools, free from spam and bots, promoting authentic interactions between clients and professionals.',
    },
  ];

  const faqItems = [
    {
      question: 'How do I join Kreatli?',
      answer: 'Joining Kreatli is easy. Simply sign up as a YouTube creator or a professional, complete your profile, and start exploring opportunities or talent.',
    },
    {
      question: 'How are professionals verified on Kreatli?',
      answer: 'We prioritize the credibility and expertise of professionals on Kreatli. Our verification process involves a thorough review of each professional\'s qualifications and work samples. When creating a profile, professionals provide detailed information about their skills, work experience, and portfolios. Our team then carefully assesses this information to ensure that it aligns with the standards of our platform. This verification process helps maintain a community of skilled and reliable professionals, enhancing the quality of collaborations between creators and professionals.',
    },
    {
      question: 'Do I have to pay in order to apply for a job or find a professional?',
      answer: 'No, Kreatli is absolutely free of charge. Our platform allows you to explore job opportunities and connect with professionals without any upfront fees. That is why there is a Tier System in place that allows everyone to compete under the same fair circumstances. However, for those who want to accelerate the progress, we do offer a premium subscription and point purchase options. They unlock additional opportunities and enhance access to our platform\'s features.',
    },
    {
      question: 'Can I find job opportunities as a professional on Kreatli?',
      answer: 'Absolutely. Kreatli offers professionals a wide range of job opportunities posted by YouTube creators. Whether you\'re a video editor, thumbnail designer, scriptwriter, etc. you can find projects that match your skills.',
    },
    {
      question: 'How can I collaborate with a YouTube creator on Kreatli?',
      answer: 'It\'s simple. As a professional, you can apply for job postings that align with your expertise. If a creator is interested, they\'ll initiate a collaboration, and you can discuss project details and terms.',
    },
    {
      question: 'What benefits does the Tier System offer?',
      answer: 'The Kreatli Tier System is designed to enhance user engagement, recognize contributions, and provide rewards within the Kreatli community. Users can progress through different tiers by completing various tasks and achieving milestones, unlocking exclusive benefits, and gaining recognition.',
    },
    {
      question: 'Can I purchase points on Kreatli?',
      answer: 'Yes, you can buy points to boost your profile\'s visibility, increase your earning potential, and access more advanced features. Points can be used strategically to maximize your impact on the platform.',
    },
    {
      question: 'Is my personal information safe on Kreatli?',
      answer: 'Absolutely. We prioritize the security and privacy of our users. Your personal information is kept confidential and is only used for platform-related interactions.',
    },
    {
      question: 'What is Kreatli Premium?',
      answer: 'Kreatli Premium is a subscription that enhances your Kreatli experience. It offers increased daily point limits, point multipliers, and access to premium tiers, empowering you to make the most out of your collaboration journey.',
    },
  ];

  return (
    <div>
      <Hero />
      <section className="relative flex flex-col gap-2 items-center container max-w-screen-xl mx-auto px-6 text-center mb-32">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          Why us
        </Chip>
        <h2 className="text-4xl font-semibold leading-tight max-w-lg mx-auto mb-8 sm:mb-16">
          Why should <TextLinear>YouTube Creators</TextLinear> choose Kreatli?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-20 gap-y-12">
          {creatorFeatures.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-2 items-center container max-w-screen-xl mx-auto px-6 text-center mb-28">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          Features
        </Chip>
        <h2 className="text-4xl font-semibold leading-tight max-w-lg mx-auto">
          <TextLinear>Glimpse into Kreatli</TextLinear> — a unified platform
        </h2>
      </section>
      <section className="grid grid-cols-2 gap-x-20 items-center container max-w-screen-xl mx-auto px-6 mb-40">
        <div className="flex flex-col gap-4 max-w-[480px]">
          <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
            Job search
          </Chip>
          <h2 className="text-4xl font-semibold leading-tight">
            <TextLinear>Collaborate</TextLinear> <br />Seamlessly
          </h2>
          <p className="text-lg text-foreground-400 max-w-[480px]">
            {/* eslint-disable-next-line max-len */}
            Explore a world of exciting job opportunities with Kreatli&apos;s powerful job search feature. Designed for seamless collaboration, it connects professionals and creators, making it effortless to find the perfect match for your next venture.
          </p>
        </div>
        <DesktopFrame>
          <Video src="/videos/chat.mp4" className="scale-85" />
        </DesktopFrame>
      </section>
      <section className="grid grid-cols-2 gap-x-20 items-center container max-w-screen-xl mx-auto px-6 mb-40">
        <DesktopFrame>
          <Video src="/videos/feed.mp4" />
        </DesktopFrame>
        <div className="flex flex-col gap-4 max-w-[480px] ml-auto">
          <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
            Kreatli feed
          </Chip>
          <h2 className="text-4xl font-semibold leading-tight">
            Fuel Your <br /><TextLinear>Creativity</TextLinear>
          </h2>
          <p className="text-lg text-foreground-400">
            {/* eslint-disable-next-line max-len */}
            Immerse yourself in our vibrant community. The Kreatli Feed keeps you in the loop on the latest trends, collaborations, and opportunities. Stay inspired and informed about the buzzing activities within Kreatli.
          </p>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-x-20 items-center container max-w-screen-xl mx-auto px-6 mb-40">
        <div className="flex flex-col gap-4 max-w-[480px]">
          <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
            Tier and point system
          </Chip>
          <h2 className="text-4xl font-semibold leading-tight">
            Recognize Your <br /><TextLinear>Progress</TextLinear>
          </h2>
          <p className="text-lg text-foreground-400 max-w-[480px]">
            {/* eslint-disable-next-line max-len */}
            Explore a world of exciting job opportunities with Kreatli&apos;s powerful job search feature. Designed for seamless collaboration, it connects professionals and creators, making it effortless to find the perfect match for your next venture.
          </p>
        </div>
        <DesktopFrame>
          <Video src="/videos/dashboard.mp4" className="scale-[1.01]" />
        </DesktopFrame>
      </section>
      <section className="relative flex flex-col gap-2 items-center container max-w-screen-xl mx-auto px-6 text-center mb-32">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          FAQ
        </Chip>
        <h2 className="text-4xl font-semibold leading-tight max-w-lg mx-auto mb-8">
          Frequently Asked <br /><TextLinear>Questions</TextLinear>
        </h2>
        <div className="w-full max-w-screen-md text-left">
          <Accordion variant="shadow">
            {faqItems.map(({ question, answer }) => (
              <AccordionItem key={question} title={question} aria-label={question}>
                <span className="text-foreground-500">{answer}</span>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <section>
        <div className="flex flex-col gap-2 items-center text-center">
          <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
            Welcome
          </Chip>
          <h2 className="text-4xl font-semibold leading-tight max-w-lg mx-auto mb-8 sm:mb-16">
            Join the <br /><TextLinear>Community</TextLinear>
          </h2>
        </div>
      </section>
    </div>
  );
};
