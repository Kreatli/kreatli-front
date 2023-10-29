import { Avatar, Card, CardBody } from '@nextui-org/react';
import cx from 'classnames';
import { useSession } from 'hooks/useSession';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Chat } from 'typings/chat';
import { formatChatMessageDate } from 'utils/dates';

interface Props {
  chat: Chat.Type;
}

export const ChatListItem = ({ chat }: Props) => {
  const { currentUserId } = useSession();
  const { query } = useRouter();
  const { participants, lastMessage } = chat;

  const participant = participants.find(({ _id }) => _id !== currentUserId);
  const hasNewMessages = !(lastMessage?.isReadBy.includes(currentUserId!) ?? true);
  const lastMessageDate = lastMessage?.creationDate;
  const isActive = query.userId === participant?._id;

  const chatPreview = React.useMemo(() => {
    if (!lastMessage) {
      return 'No messages';
    }

    const lastMessageContent = lastMessage.content;
    const lastMessageFileName = lastMessage.files[0]?.name;
    const lastMessageImageUrl = lastMessage.media[0]?.src;

    return lastMessageContent || lastMessageFileName || lastMessageImageUrl;
  }, [lastMessage]);

  if (!participant) {
    return null;
  }

  return (
    <Link href={`/chat/${participant._id}`}>
      <Card shadow="none" className={cx('border-1 border-default-200', { 'bg-secondary-50/75': isActive })}>
        <CardBody className="relative flex-row gap-3 px-3 py-4">
          <Avatar src={participant.avatarUrl} />
          <div className="flex-1">
            <div className="text-sm font-medium">{participant.name}</div>
            <div className="text-xs text-default-400 line-clamp-2 [word-break:break-word]">{chatPreview}</div>
          </div>
          {lastMessageDate && (
            <div className="text-xs font-medium text-default-500">
              {formatChatMessageDate(lastMessageDate)}
            </div>
          )}
          {hasNewMessages && <div className="absolute bottom-5 right-4 w-3 h-3 bg-secondary-500 rounded-full" />}
        </CardBody>
      </Card>
    </Link>
  );
};
