import React from 'react';

import { CardCTA } from './CardCTA';
import { Skeleton } from '@nextui-org/react';

export const Hero: React.FC = () => {
  return (
    <div className="container max-w-screen-xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">
          Professional social media platform for YouTube
          </h1>
        </div>
        <CardCTA />
      </div>
    </div>
  );
};
