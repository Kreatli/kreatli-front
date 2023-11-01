import { ChatContext, ChatContextProvider } from 'contexts/Chat';
import { useBreakpointValue } from 'hooks/useBreakpointValue';
import { useSession } from 'hooks/useSession';
import React from 'react';

import { ChatList } from '../ChatList';

interface Props {
  children: React.ReactNode;
}

const ChatLayoutComponent = ({ children }: Props) => {
  const { currentUser } = useSession();
  const { participantId } = React.useContext(ChatContext);
  const isMobile = useBreakpointValue({ MD: false }, true);

  if (!currentUser) {
    return;
  }

  const shouldShowChatList = !isMobile || (isMobile && !participantId);
  const shouldShowChat = !isMobile || (isMobile && participantId);

  return (
    <div className="flex-1 container max-w-screen-xl mx-auto md:px-6 flex flex-col max-md:-my-8">
      <div className="flex-1 flex gap-6">
        {shouldShowChatList && <ChatList />}
        {shouldShowChat && children}
      </div>
    </div>
  );
};

export const ChatLayout = ({ children }: Props) => {
  const { currentUser } = useSession();

  if (!currentUser) {
    return;
  }

  return (
    <ChatContextProvider>
      <ChatLayoutComponent>
        {children}
      </ChatLayoutComponent>
    </ChatContextProvider>
  );
};
