import React from 'react';

import { CreatePost } from '../CreatePost';
import { Posts } from '../Posts';
import { SideMenu } from '../SideMenu';

export const Feed = () => {
  return (
    <div className="container max-w-screen-lg mx-auto px-6 flex flex-col gap-8 md:grid md:grid-cols-[2fr_1fr] md:items-start">
      <CreatePost />
      <SideMenu />
      {/* TODO: lazy render for posts */}
      <Posts />
    </div>
  );
};
