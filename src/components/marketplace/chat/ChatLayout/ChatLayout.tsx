import React from 'react';

import { ChatContext, ChatContextProvider } from '../../../../contexts/marketplace/Chat';
import { useProtectedPage } from '../../../../hooks/marketplace/useProtectedPage';
import { useBreakpointValue } from '../../../../hooks/useBreakpointValue';
import { ChatList } from '../ChatList';

interface Props {
  children: React.ReactNode;
}

const ChatLayoutComponent = ({ children }: Props) => {
  const { participantId } = React.useContext(ChatContext);
  const isMobile = useBreakpointValue({ MD: false }, true);
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
  const { isSignedIn } = useProtectedPage();

  if (!isSignedIn) {
    return null;
  }

  return (
    <ChatContextProvider>
      <ChatLayoutComponent>{children}</ChatLayoutComponent>
    </ChatContextProvider>
  );
};
