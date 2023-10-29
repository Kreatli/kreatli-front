import { LazyList } from 'components/various/LazyList';
import { ChatContext } from 'contexts/Chat';
import { useSession } from 'hooks/useSession';
import React from 'react';
import { useMutation } from 'react-query';
import { requestChatMessagesRead } from 'services/chat';
import { Chat } from 'typings/chat';
import { formChatMessagesGroupDate } from 'utils/dates';

import { EmptyState } from '../EmptyState';
import { ChatMessage } from './ChatMessage';
import { ChatMessagesSkeleton } from './ChatMessagesSkeleton';
import { SystemMessage } from './SystemMessage';

export const ChatMessages = () => {
  const {
    hasMoreMessages,
    isLoadingMessages,
    isLoadingMoreMessages,
    loadMoreMessages,
    messages,
    participantId,
  } = React.useContext(ChatContext);
  const { currentUserId } = useSession();
  const { mutate } = useMutation(requestChatMessagesRead);

  React.useEffect(() => {
    if (!currentUserId || !participantId) {
      return;
    }

    const unreadMessageIds = messages
      .filter((message) => !message.isReadBy.includes(currentUserId))
      .map((message) => message._id);

    if (unreadMessageIds.length > 0) {
      mutate([participantId, { ids: unreadMessageIds }]);
    }
  }, [currentUserId, messages]);

  const groupedMessages = React.useMemo(() => {
    return messages.reduce((acc, message) => {
      const dateString = formChatMessagesGroupDate(message.creationDate);

      if (acc[dateString]) {
        return {
          ...acc,
          [dateString]: [
            ...acc[dateString],
            message,
          ],
        };
      }

      return {
        ...acc,
        [dateString]: [message],
      };
    }, {} as Record<string, Chat.Message[]>);
  }, [messages]);

  if (isLoadingMessages) {
    return <ChatMessagesSkeleton />;
  }

  if (messages.length === 0) {
    return (
      <EmptyState
        title="Send your first message"
        text="To start a conversation"
      />
    );
  }

  return (
    <LazyList scroll="up" isLoading={isLoadingMoreMessages} hasMore={hasMoreMessages} onLoadMore={loadMoreMessages}>
      <div className="flex flex-col-reverse gap-5">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date} className="flex flex-col-reverse gap-5">
            {dateMessages.map((message) => (message.isSystem
              ? <SystemMessage key={message._id} message={message} />
              : <ChatMessage key={message._id} message={message} />
            ))}
            <div className="text-sm w-fit mx-auto py-1 px-4 font-semibold rounded-full sticky top-0 bg-background/70 backdrop-blur shadow-small text-default-600">
              {date}
            </div>
          </div>
        ))}
      </div>
    </LazyList>
  );
};
