import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { useSignUpCreatorModal } from '../../../hooks/useSignUpCreatorModal';
import { SignInModal } from '../../auth/SignInModal';
import { Icon } from '../../various/Icon';
import { Video } from '../../various/Video';
import { DesktopFrame, MobileFrame } from '../Frames';
import { TextLinear } from '../TextLinear';

export const Hero = () => {
  const [isSignedInModalOpen, setIsSignedInModalOpen] = React.useState(false);

  const { open } = useSignUpCreatorModal();

  const handleSignUpAction = (key: React.Key) => {
    if (key === 'creator') {
      open();
    }
  };

  return (
    <div className="relative overflow-x-clip">
      <div className="absolute top-0 -left-[10%] lg:left-0 rounded-[60px] bg-secondary-50/50 w-3/5 min-w-[700px] aspect-square rotate-45 -translate-x-1/2 hidden md:block" />
      <div className="absolute top-0 -right-[30%] lg:-right-[10%] rounded-[60px] bg-secondary w-3/5 min-w-[700px] aspect-square rotate-45 -translate-y-1/2 hidden md:block" />
      <div className="relative container max-w-screen-xl mx-auto px-6 py-8 md:py-20 mb-20 sm:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 gap-y-16">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl sm:text-6xl font-semibold max-w-lg">
              <TextLinear>Connecting</TextLinear> YouTube Creators and Professionals
            </h1>
            <p className="text-lg text-foreground-500 sm:w-11/12">
              {/* eslint-disable-next-line max-len */}
              Kreatli brings YouTube Creators and Professionals together, empowering their collaboration and success in
              a vibrant community designed for growth and creativity
            </p>
            <div className="flex gap-4">
              <Dropdown>
                <DropdownTrigger>
                  <Button color="secondary" radius="full" className="group pr-8" size="lg">
                    <Icon icon="logo" size={20} />
                    Join Kreatli
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Sign up" variant="flat" color="secondary" onAction={handleSignUpAction}>
                  <DropdownItem key="creator">As YouTube Creator</DropdownItem>
                  <DropdownItem as={NextLink} href="/signup/professional" key="professional">
                    As Professional
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Button
                variant="bordered"
                radius="full"
                size="lg"
                className="pl-8"
                onClick={() => setIsSignedInModalOpen(true)}
              >
                Sign in
                <Icon icon="arrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          <div className="relative lg:pr-16">
            <DesktopFrame>
              <Video
                sources={[
                  { src: 'https://d13dfrcfnxyv50.cloudfront.net/videos/job-offers.webm', type: 'video/webm' },
                  { src: 'https://d13dfrcfnxyv50.cloudfront.net/videos/job-offers.mp4', type: 'video/mp4' },
                ]}
                className="scale-110 w-full aspect-[4/3]"
              />
            </DesktopFrame>
            <div className="absolute -bottom-16 right-0 hidden lg:block">
              <MobileFrame>
                <Video
                  sources={[
                    { src: 'https://d13dfrcfnxyv50.cloudfront.net/videos/chat-mobile.webm', type: 'video/webm' },
                    { src: 'https://d13dfrcfnxyv50.cloudfront.net/videos/chat-mobile.mp4', type: 'video/mp4' },
                  ]}
                  className="w-36 rounded-2xl aspect-[9/20]"
                />
              </MobileFrame>
            </div>
          </div>
        </div>
        <SignInModal isOpen={isSignedInModalOpen} onClose={() => setIsSignedInModalOpen(false)} />
      </div>
    </div>
  );
};
