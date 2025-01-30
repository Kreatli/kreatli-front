import { Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React from 'react';

import { ChatContext } from '../../../../contexts/marketplace/Chat';
import { useSession } from '../../../../hooks/marketplace/useSession';
import { EmptyState } from '../EmptyState';
import { ListController } from './ChatListController';
import { ChatListItem } from './ChatListItem';
import { ChatListNewButton } from './ChatListNewButton';
import { ChatListSkeleton } from './ChatListSkeleton';

export const ChatList = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { chats, chatRequests, chatListMode, setChatListMode, isLoadingChats } = React.useContext(ChatContext);
  const { currentUserId } = useSession();

  const modeChats = chatListMode === 'chats' ? chats : chatRequests;

  const hasChats = (modeChats?.length ?? 0) > 0;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const filteredChats = React.useMemo(() => {
    return modeChats.filter(({ participants }) => {
      const participant = participants.find(({ _id }) => _id !== currentUserId);

      return participant?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [currentUserId, modeChats, searchQuery]);

  const shouldShowEmptyState = !isLoadingChats && !hasChats;
  const shouldShowSkeleton = isLoadingChats;
  const shouldShowChats = !isLoadingChats && hasChats;

  return (
    <Card className="w-full max-md:shadow-none md:w-80 lg:w-96">
      <CardHeader className="gap-2 pb-2 max-md:pt-6 max-md:pb-0">
        <Input
          value={searchQuery}
          placeholder="Search"
          labelPlacement="outside"
          isClearable
          onChange={handleSearchChange}
          onClear={handleClear}
        />
        <ChatListNewButton />
      </CardHeader>
      <CardBody className="p-5">
        <div className="flex justify-between pb-4">
          <ListController
            isActive={chatListMode === 'chats'}
            label="Chats"
            count={chats.length}
            onClick={() => setChatListMode('chats')}
          />
          <ListController
            isActive={chatListMode === 'requests'}
            label="Requests"
            count={chatRequests.length}
            onClick={() => setChatListMode('requests')}
          />
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-0 overflow-auto">
            {shouldShowChats && (
              <div className="flex flex-col gap-3">
                {filteredChats.map((chat) => (
                  <ChatListItem key={chat._id} chat={chat} />
                ))}
              </div>
            )}
            {shouldShowEmptyState && (
              <EmptyState
                title={`You have no ${chatListMode === 'chats' ? 'chats' : 'requests'}`}
                text={chatListMode === 'chats' && 'Write your first message by clicking the button above'}
                image="chats"
              />
            )}
            {shouldShowSkeleton && <ChatListSkeleton />}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
