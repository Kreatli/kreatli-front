import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import { useNotifications } from '../../../hooks/useNotifications';
import { useSession } from '../../../hooks/marketplace/useSession';
import { useSocket } from '../../../hooks/marketplace/useSocket';
import { requestChat, requestChatMessages } from '../../../services/marketplace/chat';
import { requestChatRequests } from '../../../services/marketplace/chats';
import { Chat } from '../../../typings/marketplace/chat';
import { Common } from '../../../typings/common';
import { File } from '../../../typings/marketplace/file';
import { Media } from '../../../typings/marketplace/media';
import { User } from '../../../typings/marketplace/user';
import { getErrorMessage } from '../../../utils/marketplace/getErrorMessage';

interface MessagePayload {
  media: Omit<Media.Image, '_id'>[];
  content: string;
  files: Omit<File.Type, '_id'>[];
}

interface Context {
  addMessage: (message: MessagePayload) => void;
  activeChat: Chat.Type | null;
  chats: Chat.Type[];
  chatListMode: 'chats' | 'requests';
  chatRequests: Chat.Type[];
  hasMoreMessages: boolean;
  isLoadingChats: boolean;
  isLoadingMessages: boolean;
  isLoadingMoreMessages: boolean;
  loadInitialMessages: () => void;
  loadMoreMessages: () => void;
  messages: Chat.Message[];
  participant: User.ShortInfo | null;
  participantId: Common.Id | null;
  setChatListMode: (chatListMode: 'chats' | 'requests') => void;
}

const initialContext: Context = {
  addMessage: () => null,
  activeChat: null,
  chats: [],
  chatListMode: 'chats',
  chatRequests: [],
  hasMoreMessages: false,
  isLoadingChats: true,
  isLoadingMessages: true,
  isLoadingMoreMessages: false,
  loadInitialMessages: () => null,
  loadMoreMessages: () => null,
  messages: [],
  participant: null,
  participantId: null,
  setChatListMode: () => null,
};

interface Props {
  children: React.ReactNode;
}

const MESSAGES_LIMIT = 20;

export const ChatContext = React.createContext<Context>(initialContext);

export const ChatContextProvider = ({ children }: Props) => {
  const router = useRouter();
  const { currentUserId } = useSession();
  const { pushNotification } = useNotifications();
  const socket = useSocket('/chat-server');

  const [chats, setChats] = React.useState<Chat.Type[]>([]);
  const [chatListMode, setChatListMode] = React.useState<'chats' | 'requests'>('chats');
  const [isLoadingChats, setIsLoadingChats] = React.useState(true);
  const [messages, setMessages] = React.useState<Chat.Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = React.useState(true);
  const [isLoadingMoreMessages, setIsLoadingMoreMessages] = React.useState(true);
  const [hasMoreMessages, setHasMoreMessages] = React.useState(false);
  const [messagesOffset, setMessagesOffset] = React.useState(0);

  const participantId = React.useMemo(() => {
    return (router.query.userId as Common.Id) ?? null;
  }, [router.query.userId]);

  const { data: chatRequests = [] } = useQuery({
    queryKey: ['chat-requests'],
    queryFn: requestChatRequests,
  });
  const { data: chat = null } = useQuery({
    enabled: !!participantId,
    queryKey: ['chat', participantId],
    queryFn: () => requestChat(participantId),
  });

  React.useEffect(() => {
    if (!chat) {
      return;
    }

    setChatListMode(chat.isRequest ? 'requests' : 'chats');
  }, [chat]);

  const participant = chat?.participants.find(({ _id }) => _id !== currentUserId)!;

  const loadInitialMessages = React.useCallback(() => {
    if (!participantId) {
      return;
    }

    requestChatMessages(participantId, { offset: 0, limit: MESSAGES_LIMIT })
      .then((data) => {
        setMessages(data.messages);
        setHasMoreMessages(data.messages.length < data.messagesCount);
      })
      .catch((error) => {
        pushNotification({
          message: getErrorMessage(error),
          color: 'danger',
          icon: 'error',
        });
      })
      .finally(() => {
        setIsLoadingMessages(false);
      });
  }, [participantId, pushNotification]);

  React.useEffect(() => {
    // Clear states of previous chat
    setMessages([]);
    setHasMoreMessages(false);
    setMessagesOffset(0);
    setIsLoadingMoreMessages(false);
    setIsLoadingMessages(true);
    // Fetch messages for the selected chat
    loadInitialMessages();
  }, [loadInitialMessages]);

  React.useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('chats', (newChats) => {
      setChats(newChats);
      setIsLoadingChats(false);
    });

    socket.on('message', (message) => {
      setMessages((currentMessages) => [message, ...currentMessages]);
    });

    return () => {
      socket.off('chats');
      socket.off('message');
    };
  }, [socket]);

  React.useEffect(() => {
    if (!participantId || !currentUserId || !socket) {
      return;
    }

    socket.emit('join', {
      senderId: currentUserId,
      receiverId: participantId,
    });

    return () => {
      socket.emit('leave', {
        senderId: currentUserId,
        receiverId: participantId,
      });
    };
  }, [currentUserId, participantId, socket]);

  const addMessage = React.useCallback(
    (message: MessagePayload) => {
      socket?.emit('message', {
        senderId: currentUserId,
        receiverId: participantId,
        message,
      });
    },
    [currentUserId, participantId, socket],
  );

  const loadMoreMessages = React.useCallback(() => {
    setIsLoadingMoreMessages(true);
    setMessagesOffset(messagesOffset + MESSAGES_LIMIT);

    requestChatMessages(participantId, { offset: messagesOffset + MESSAGES_LIMIT, limit: MESSAGES_LIMIT })
      .then((data) => {
        setMessages([...messages, ...data.messages]);
        setHasMoreMessages(messages.length + MESSAGES_LIMIT < data.messagesCount);
      })
      .catch((error) => {
        pushNotification({
          message: getErrorMessage(error),
          color: 'danger',
          icon: 'error',
        });
      })
      .finally(() => {
        setIsLoadingMoreMessages(false);
      });
  }, [messages, messagesOffset, participantId, pushNotification]);

  const value = {
    addMessage,
    activeChat: chat,
    chats,
    chatListMode,
    chatRequests,
    hasMoreMessages,
    isLoadingChats,
    isLoadingMessages,
    isLoadingMoreMessages,
    loadInitialMessages,
    loadMoreMessages,
    messages,
    participant,
    participantId,
    setChatListMode,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
