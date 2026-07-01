/* eslint-disable max-len */
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Image } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { useSignUpCreatorModal } from '../../../hooks/useSignUpCreatorModal';
import { ContactForm } from '../../contact/ContactForm';
import { Faq } from '../../contact/Faq';
import { Video } from '../../various/Video';
import { Feature } from '../Feature';
import { DesktopFrame } from '../Frames';
import { Hero } from '../Hero';
import { TextLinear } from '../TextLinear';
import backgroundImage from './assets/background.jpg';
import creatorsImage from './assets/creators.jpg';
import professionalsImage from './assets/professionals.jpg';

export const Home = () => {
  const { open: openSignUpCreatorModal } = useSignUpCreatorModal();

  const creatorFeatures = [
    {
      icon: 'certification' as const,
      title: 'Only Pre-Vetted \nClippers',
      text: 'We meticulously verify every clipper profile and portfolio to ensure they deliver top-notch clip quality and editing expertise.',
    },
    {
      icon: 'medal' as const,
      title: 'Quality Over \nQuantity',
      text: 'We prioritize quality clip creation over budget options, educating creators about the advantages of working with skilled clippers who understand your content vision.',
    },
    {
      icon: 'conversation' as const,
      title: 'Unified Platform: Secure Communication \nand No-Bot Policy',
      text: 'Our platform offers secure and efficient communication tools, free from spam and bots, promoting authentic interactions between creators and clippers.',
    },
  ];

  return (
    <>
      <Hero />
      <section className="relative flex flex-col gap-2 items-center container max-w-screen-xl mx-auto px-6 text-center mb-20 sm:mb-32">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          Why us
        </Chip>
        <h2 className="text-4xl font-semibold leading-tight max-w-lg mx-auto mb-8 sm:mb-16">
          Why should <TextLinear>Creators</TextLinear> choose Kreatli Marketplace for clipping?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-20 gap-y-12">
          {creatorFeatures.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-2 items-center container max-w-screen-xl mx-auto px-6 text-center mb-20 sm:mb-28">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          Features
        </Chip>
        <h2 className="text-4xl font-semibold leading-tight max-w-lg mx-auto">
          <TextLinear>Glimpse into Kreatli Marketplace</TextLinear> — a unified platform
        </h2>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-8 items-center container max-w-screen-xl mx-auto px-6 mb-20 sm:mb-40">
        <div className="flex flex-col gap-4 max-w-[480px]">
          <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
            Clipping campaigns
          </Chip>
          <h2 className="text-4xl font-semibold leading-tight">
            Post Campaigns or <br />
            <TextLinear>Browse Services</TextLinear>
          </h2>
          <p className="text-lg text-foreground-500 max-w-[480px]">
            Post clipping campaigns and let clippers apply, or browse clipper service listings. Kreatli Marketplace&apos;s dual marketplace model gives you flexibility—find the perfect clipper whether you need a specific project or ongoing services.
          </p>
        </div>
        <DesktopFrame>
          <Video
            sources={[
              { src: 'https://kreatli-marketplace-landing.s3.eu-central-1.amazonaws.com/chat.webm', type: 'video/webm' },
              { src: 'https://kreatli-marketplace-landing.s3.eu-central-1.amazonaws.com/chat.mp4', type: 'video/mp4' },
            ]}
            className="scale-85 w-full aspect-[4/3]"
            aria-label="Demo showing how creators post clipping campaigns and communicate with clippers"
          />
        </DesktopFrame>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-8 items-center container max-w-screen-xl mx-auto px-6 mb-20 sm:mb-40">
        <DesktopFrame>
          <Video
            sources={[
              { src: 'https://kreatli-marketplace-landing.s3.eu-central-1.amazonaws.com/feed.webm', type: 'video/webm' },
              { src: 'https://kreatli-marketplace-landing.s3.eu-central-1.amazonaws.com/feed.mp4', type: 'video/mp4' },
            ]}
            className="w-full aspect-[4/3]"
            aria-label="Demo showing the Kreatli Marketplace feed with clipping trends, successful clips, and community updates"
          />
        </DesktopFrame>
        <div className="-order-1 sm:order-1 flex flex-col gap-4 max-w-[480px] sm:ml-auto">
          <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
            Kreatli Marketplace feed
          </Chip>
          <h2 className="text-4xl font-semibold leading-tight">
            Fuel Your <br />
            <TextLinear>Creativity</TextLinear>
          </h2>
          <p className="text-lg text-foreground-500">
            Immerse yourself in our vibrant clipping community. The Kreatli Marketplace Feed keeps you in the loop on the latest clip trends, successful collaborations, and clipping opportunities. Stay inspired and informed about the buzzing activities within Kreatli Marketplace.
          </p>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-8 items-center container max-w-screen-xl mx-auto px-6 mb-20 sm:mb-40">
        <div className="flex flex-col gap-4 max-w-[480px]">
          <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
            Tier and point system
          </Chip>
          <h2 className="text-4xl font-semibold leading-tight">
            Recognize Your <br />
            <TextLinear>Progress</TextLinear>
          </h2>
          <p className="text-lg text-foreground-500 max-w-[480px]">
            Track your growth and achievements in the clipping marketplace. The Kreatli Marketplace Tier System rewards quality work, active participation, and successful collaborations. Level up to unlock exclusive benefits and gain recognition in the clipper community.
          </p>
        </div>
        <DesktopFrame>
          <Video
            sources={[
              { src: 'https://kreatli-marketplace-landing.s3.eu-central-1.amazonaws.com/dashboard.webm', type: 'video/webm' },
              { src: 'https://kreatli-marketplace-landing.s3.eu-central-1.amazonaws.com/dashboard.mp4', type: 'video/mp4' },
            ]}
            className="scale-[1.01] w-full aspect-[4/3]"
            aria-label="Demo showing the tier system dashboard tracking progress and achievements in the clipping marketplace"
          />
        </DesktopFrame>
      </section>
      <section className="relative py-20 sm:py-32 mb-10 sm:mb-40">
        <div className="container max-w-screen-2xl px-6 mx-auto">
          <div className="flex flex-col gap-2 items-center text-center">
            <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
              Welcome
            </Chip>
            <h2 className="text-4xl font-semibold leading-tight mx-auto mb-8 sm:mb-16">
              Join the <br />
              <TextLinear>Community</TextLinear>
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Card className="col-start-1 col-end-5 sm:col-end-3 xl:col-end-2">
              <CardHeader className="block p-8">
                <span className="text-lg font-semibold">For</span>
                <h3 className="text-4xl font-semibold text-secondary">Creators</h3>
              </CardHeader>
              <CardBody className="p-8 pt-0">
                <ul className="flex flex-col gap-2 list-disc list-outside pl-4 marker:text-secondary xl:max-w-[250px] text-foreground-500">
                  <li>Post clipping campaigns and find skilled clippers.</li>
                  <li>Browse clipper service listings to discover talent.</li>
                  <li>
                    Simplify your hiring process by easily finding, evaluating, and hiring the perfect clippers for your video clip needs.
                  </li>
                </ul>
              </CardBody>
              <CardFooter className="p-8">
                <Button color="secondary" radius="full" onClick={openSignUpCreatorModal}>
                  Join as Creator
                </Button>
              </CardFooter>
            </Card>
            <div className="col-start-1 col-end-5 sm:col-end-3 xl:col-start-2 relative rounded-large overflow-hidden shadow-small max-h-[500px]">
              <div className="absolute inset-0 z-20 bg-gradient-to-bl from-secondary/20 to-black/60" />
              <Image src={creatorsImage.src} alt="Creators" removeWrapper className="w-full h-full object-cover" />
            </div>
            <Card className="col-start-1 col-end-5 sm:col-start-3 xl:col-end-4 sm:row-start-1">
              <CardHeader className="block p-8">
                <span className="text-lg font-semibold">For</span>
                <h3 className="text-4xl font-semibold text-secondary">Clippers</h3>
              </CardHeader>
              <CardBody className="p-8 pt-0">
                <ul className="flex flex-col gap-2 list-disc list-outside pl-4 marker:text-secondary xl:max-w-[250px] text-foreground-500">
                  <li>Apply to clipping campaigns posted by creators.</li>
                  <li>Offer your clipping services proactively to creators.</li>
                  <li>Showcase your clip portfolio and editing skills effectively to potential clients.</li>
                </ul>
              </CardBody>
              <CardFooter className="p-8">
                <Button as={NextLink} href="/signup/professional" color="secondary" radius="full">
                  Join as Clipper
                </Button>
              </CardFooter>
            </Card>
            <div className="col-start-1 col-end-5 sm:col-start-3 xl:col-start-4 relative rounded-large overflow-hidden shadow-small max-h-[500px]">
              <div className="absolute inset-0 z-20 bg-gradient-to-bl from-secondary/20 to-black/60" />
              <Image
                src={professionalsImage.src}
                alt="Clippers"
                removeWrapper
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/logo-k-light.svg')] dark:bg-[url('/logo-k-dark.svg')] bg-[length:80px] sm:bg-[length:120px] bg-repeat-space -z-10 pointer-events-none" />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 mb-20 sm:mb-40">
        <div className="hidden md:block relative">
          <Image
            radius="none"
            src={backgroundImage.src}
            removeWrapper
            alt="Clipper in action"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 bg-gradient-to-bl from-secondary/20 to-black/60" />
        </div>
        <div className="pl-6 md:pl-24 pr-6 py-12">
          <Chip variant="flat" color="secondary" className="mb-4" classNames={{ content: 'font-semibold' }}>
            Why us
          </Chip>
          <h2 className="text-4xl font-semibold leading-tight mb-12">
            Why Should <TextLinear>Clippers</TextLinear>
            <br /> Choose Kreatli Marketplace?
          </h2>
          <article className="mb-6">
            <div className="text-6xl font-bold text-secondary mb-2">1</div>
            <h3 className="text-xl font-semibold mb-2">Unified Clipping Marketplace</h3>
            <p className="text-lg text-foreground-500 max-w-[500px]">
              End the endless search across Reddit, Twitter, Discord, Fiverr, or Upwork. Find clipping campaigns and offer your services, all in one convenient place built specifically for video clip creation.
            </p>
          </article>
          <article className="mb-6">
            <div className="text-6xl font-bold text-secondary mb-2">2</div>
            <h3 className="text-xl font-semibold mb-2">Clipper Community</h3>
            <p className="text-lg text-foreground-500 max-w-[500px]">
              Join a network of like-minded clippers, share experiences, receive valuable feedback, and collaborate on clipping projects with creators who value quality work.
            </p>
          </article>
          <article>
            <div className="text-6xl font-bold text-secondary mb-2">3</div>
            <h3 className="text-xl font-semibold mb-2">Compete Fairly</h3>
            <p className="text-lg text-foreground-500 max-w-[500px]">
              Bid farewell to battles with bots. Here you compete with other human clippers, ensuring a level playing field in the clipping marketplace.
            </p>
          </article>
        </div>
      </section>
      <section className="relative flex flex-col gap-2 items-center container max-w-screen-md mx-auto px-6 text-center mb-32">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          FAQ
        </Chip>
        <h2 className="text-4xl font-semibold leading-tight max-w-lg mx-auto mb-8">
          Frequently Asked <br />
          <TextLinear>Questions</TextLinear>
        </h2>
        <Faq />
      </section>
      <section className="container max-w-screen-xl mx-auto px-6 text-center mb-20">
        <h2 className="text-4xl font-semibold leading-tight mb-2">
          Still have some questions?
          <br /> <TextLinear>Contact us</TextLinear>
        </h2>
        <p className="mb-8 text-large text-foreground-500">
          We&apos;re all ears! Fill out the form below and let&apos;s chat!
        </p>
        <div className="max-w-[600px] mx-auto">
          <ContactForm />
        </div>
      </section>
    </>
  );
};
