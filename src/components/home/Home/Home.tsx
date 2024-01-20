/* eslint-disable max-len */
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Image, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import LogoIcon from '../../../assets/images/logo.svg';
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

  return (
    <div>
      <Hero />
      <section className="relative flex flex-col gap-2 items-center container max-w-screen-xl mx-auto px-6 text-center mb-20 sm:mb-32">
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
      <section className="flex flex-col gap-2 items-center container max-w-screen-xl mx-auto px-6 text-center mb-20 sm:mb-28">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          Features
        </Chip>
        <h2 className="text-4xl font-semibold leading-tight max-w-lg mx-auto">
          <TextLinear>Glimpse into Kreatli</TextLinear> — a unified platform
        </h2>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-8 items-center container max-w-screen-xl mx-auto px-6 mb-20 sm:mb-40">
        <div className="flex flex-col gap-4 max-w-[480px]">
          <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
            Job search
          </Chip>
          <h2 className="text-4xl font-semibold leading-tight">
            <TextLinear>Collaborate</TextLinear> <br />Seamlessly
          </h2>
          <p className="text-lg text-foreground-500 max-w-[480px]">
            Explore a world of exciting job opportunities with Kreatli&apos;s powerful job search feature. Designed for seamless collaboration, it connects professionals and creators, making it effortless to find the perfect match for your next venture.
          </p>
        </div>
        <DesktopFrame>
          <Video src="/videos/chat.mp4" className="scale-85 w-full aspect-[4/3]" />
        </DesktopFrame>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-8 items-center container max-w-screen-xl mx-auto px-6 mb-20 sm:mb-40">
        <DesktopFrame>
          <Video src="/videos/feed.mp4" className="w-full aspect-[4/3]" />
        </DesktopFrame>
        <div className="-order-1 sm:order-1 flex flex-col gap-4 max-w-[480px] sm:ml-auto">
          <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
            Kreatli feed
          </Chip>
          <h2 className="text-4xl font-semibold leading-tight">
            Fuel Your <br /><TextLinear>Creativity</TextLinear>
          </h2>
          <p className="text-lg text-foreground-500">
            Immerse yourself in our vibrant community. The Kreatli Feed keeps you in the loop on the latest trends, collaborations, and opportunities. Stay inspired and informed about the buzzing activities within Kreatli.
          </p>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-8 items-center container max-w-screen-xl mx-auto px-6 mb-20 sm:mb-40">
        <div className="flex flex-col gap-4 max-w-[480px]">
          <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
            Tier and point system
          </Chip>
          <h2 className="text-4xl font-semibold leading-tight">
            Recognize Your <br /><TextLinear>Progress</TextLinear>
          </h2>
          <p className="text-lg text-foreground-500 max-w-[480px]">
            Explore a world of exciting job opportunities with Kreatli&apos;s powerful job search feature. Designed for seamless collaboration, it connects professionals and creators, making it effortless to find the perfect match for your next venture.
          </p>
        </div>
        <DesktopFrame>
          <Video src="/videos/dashboard.mp4" className="scale-[1.01] w-full aspect-[4/3]" />
        </DesktopFrame>
      </section>
      <section className="relative py-20 sm:py-32 mb-10 sm:mb-40">
        <div className="container max-w-screen-2xl px-6 mx-auto">
          <div className="flex flex-col gap-2 items-center text-center">
            <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
              Welcome
            </Chip>
            <h2 className="text-4xl font-semibold leading-tight mx-auto mb-8 sm:mb-16">
              Join the <br /><TextLinear>Community</TextLinear>
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
                  <li>Discover the right talent with ease.</li>
                  <li>Collaborate with experts effortlessly.</li>
                  <li>Simplify your hiring process by easily finding, evaluating, and hiring the perfect professionals for your job.</li>
                </ul>
              </CardBody>
              <CardFooter className="p-8">
                <Button as={NextLink} href="/signup/creator" color="secondary" radius="full">Join as Creator</Button>
              </CardFooter>
            </Card>
            <div className="col-start-1 col-end-5 sm:col-end-3 xl:col-start-2 relative rounded-large overflow-hidden shadow-small max-h-[500px]">
              <div className="absolute inset-0 z-20 bg-gradient-to-bl from-secondary/20 to-black/60" />
              <Image
                src={creatorsImage.src}
                alt="Creators"
                removeWrapper
                className="w-full h-full object-cover"
              />
            </div>
            <Card className="col-start-1 col-end-5 sm:col-start-3 xl:col-end-4 sm:row-start-1">
              <CardHeader className="block p-8">
                <span className="text-lg font-semibold">For</span>
                <h3 className="text-4xl font-semibold text-secondary">Professionals</h3>
              </CardHeader>
              <CardBody className="p-8 pt-0">
                <ul className="flex flex-col gap-2 list-disc list-outside pl-4 marker:text-secondary xl:max-w-[250px] text-foreground-500">
                  <li>Grow your professional network.</li>
                  <li>Grow your professional network.</li>
                  <li>Showcase your amazing skills effectively to potential clients. </li>
                </ul>
              </CardBody>
              <CardFooter className="p-8">
                <Button as={NextLink} href="/signup/professional" color="secondary" radius="full">Join as Professional</Button>
              </CardFooter>
            </Card>
            <div className="col-start-1 col-end-5 sm:col-start-3 xl:col-start-4 relative rounded-large overflow-hidden shadow-small max-h-[500px]">
              <div className="absolute inset-0 z-20 bg-gradient-to-bl from-secondary/20 to-black/60" />
              <Image
                src={professionalsImage.src}
                alt="Professionals"
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
            alt="Professional in action"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 bg-gradient-to-bl from-secondary/20 to-black/60" />
        </div>
        <div className="pl-6 md:pl-24 pr-6 py-12">
          <Chip variant="flat" color="secondary" className="mb-4" classNames={{ content: 'font-semibold' }}>
            Why us
          </Chip>
          <h2 className="text-4xl font-semibold leading-tight mb-12">
            Why Should <TextLinear>Professionals</TextLinear><br /> Choose Kreatli?
          </h2>
          <article className="mb-6">
            <div className="text-6xl font-bold text-secondary mb-2">1</div>
            <h3 className="text-xl font-semibold mb-2">Unified Platform</h3>
            <p className="text-lg text-foreground-500 max-w-[500px]">End the endless search across Reddit, Twitter, Discord, Fiverr, or Upwork. Find jobs and opportunities, all in one convenient place.</p>
          </article>
          <article className="mb-6">
            <div className="text-6xl font-bold text-secondary mb-2">2</div>
            <h3 className="text-xl font-semibold mb-2">Unified Platform</h3>
            <p className="text-lg text-foreground-500 max-w-[500px]">End the endless search across Reddit, Twitter, Discord, Fiverr, or Upwork. Find jobs and opportunities, all in one convenient place.</p>
          </article>
          <article>
            <div className="text-6xl font-bold text-secondary mb-2">3</div>
            <h3 className="text-xl font-semibold mb-2">Unified Platform</h3>
            <p className="text-lg text-foreground-500 max-w-[500px]">End the endless search across Reddit, Twitter, Discord, Fiverr, or Upwork. Find jobs and opportunities, all in one convenient place.</p>
          </article>
        </div>
      </section>
      <section className="relative flex flex-col gap-2 items-center container max-w-screen-md mx-auto px-6 text-center mb-32">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          FAQ
        </Chip>
        <h2 className="text-4xl font-semibold leading-tight max-w-lg mx-auto mb-8">
          Frequently Asked <br /><TextLinear>Questions</TextLinear>
        </h2>
        <Faq />
      </section>
      <section className="container max-w-screen-xl mx-auto px-6 text-center mb-20">
        <h2 className="text-4xl font-semibold leading-tight mb-2">Still have some questions?<br /> <TextLinear>Contact us</TextLinear></h2>
        <p className="mb-8 text-large text-foreground-500">We&apos;re all ears! Fill out the form below and let&apos;s chat!</p>
        <div className="max-w-[600px] mx-auto">
          <ContactForm />
        </div>
      </section>
      <footer className="shadow-medium -mb-8">
        <div className="max-w-screen-xl mx-auto px-6 py-10 flex justify-between">
          <LogoIcon viewBox="0 0 90 22" />
          <div className="flex flex-col sm:flex-row items-end gap-1">
            <span className="text-sm text-foreground-400">© Kreatli 2024. All rights reserved.</span>
            <Link as={NextLink} href="/privacy-policy" size="sm" className="text-foreground-400" underline="hover">Privacy policy</Link>
            <Link as={NextLink} href="terms-and-conditions" size="sm" className="text-foreground-400" underline="hover">Terms and conditions</Link>
            <Link href="mailto:support@kreatli.com" size="sm" className="text-foreground-400" underline="hover">support@kreatli.com</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
