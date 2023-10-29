import { ChatContextProvider } from 'contexts/Chat';
import { useSession } from 'hooks/useSession';
import React from 'react';

import { ChatList } from '../ChatList';

interface Props {
  children: React.ReactNode;
}

export const ChatLayout = ({ children }: Props) => {
  const { currentUser } = useSession();

  if (!currentUser) {
    return;
  }

  return (
    <ChatContextProvider>
      <div className="flex-1 container max-w-screen-xl mx-auto px-6 flex flex-col">
        <div className="flex-1 flex gap-6">
          <ChatList />
          {children}
        </div>
      </div>
    </ChatContextProvider>
  );
};
