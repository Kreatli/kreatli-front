import React from 'react';

import ChatImage from '../../../assets/images/chat.svg';
import ChatsImage from '../../../assets/images/chats.svg';

interface Props {
  image?: 'chat' | 'chats';
  title: string;
  text?: string | false;
}

export const EmptyState = ({ image = 'chat', title, text }: Props) => {
  const Image = image === 'chat'
    ? ChatImage
    : ChatsImage;

  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center">
      <Image />
      <h3 className="mt-8 text-xl font-bold text-default-500">{title}</h3>
      {text && <p className="mt-2 text-sm text-default-500 max-w-xs">{text}</p>}
    </div>
  );
};
