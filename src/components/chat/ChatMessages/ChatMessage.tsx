import { Avatar, Image } from '@nextui-org/react';
import cx from 'classnames';
import NextLink from 'next/link';
import React from 'react';

import { ChatContext } from '../../../contexts/Chat';
import { useSession } from '../../../hooks/useSession';
import { Chat } from '../../../typings/chat';
import { formatChatMessageTime } from '../../../utils/dates';
import { FileBox } from '../../various/FileBox';
import { Lightbox } from '../../various/Lightbox';

interface Props {
  message: Chat.Message;
}

export const ChatMessage = ({ message }: Props) => {
  const { participant } = React.useContext(ChatContext);
  const { currentUser, currentUserId } = useSession();
  const [openedMediaIndex, setOpenedMediaIndex] = React.useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

  const isCurrentUserMessage = message.sender === currentUserId;

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
  };

  const handleMediaClick = (index: number) => () => {
    setOpenedMediaIndex(index);
    setIsLightboxOpen(true);
  };

  const senderName = isCurrentUserMessage ? currentUser?.name : participant?.name;

  const senderAvatar = isCurrentUserMessage ? currentUser?.avatarUrl : participant?.avatarUrl;

  const name = <div className="text-xs font-semibold">{senderName}</div>;

  const date = (
    <div className="text-xs font-medium text-default-400">{formatChatMessageTime(message.creationDate)}</div>
  );

  return (
    <div className={cx('flex gap-3', { 'flex-row-reverse': isCurrentUserMessage })}>
      <div>
        <NextLink href={`/profile/${message.sender}`}>
          <Avatar src={senderAvatar} size="sm" />
        </NextLink>
      </div>
      <div className={cx('flex flex-col w-full', { 'items-end': isCurrentUserMessage })}>
        <div className={cx('flex gap-1 select-none py-1', { 'flex-row-reverse': isCurrentUserMessage })}>
          {name} {date}
        </div>
        {message.content && (
          <div
            className={cx('text-sm w-fit max-w-[80%] py-2 px-4 rounded-3xl mt-1 whitespace-pre-wrap', {
              'rounded-tl-sm bg-default-100 -ml-2': !isCurrentUserMessage,
              'rounded-tr-sm bg-secondary-500 text-white -mr-2': isCurrentUserMessage,
            })}
          >
            {message.content}
          </div>
        )}
        {message.media.length > 0 && (
          <div className="mt-2 flex flex-col gap-2">
            {message.media.map(({ _id, src }, index) => (
              <button key={_id} type="button" className="w-fit" onClick={handleMediaClick(index)}>
                <Image src={src} className="max-w-[240px] w-auto" width={240} />
              </button>
            ))}
          </div>
        )}
        {message.files.length > 0 && (
          <div className="mt-2 flex flex-col gap-2 max-w-xs">
            {message.files.map((file) => (
              <FileBox key={file._id} file={file} />
            ))}
          </div>
        )}
        {message.media.length > 0 && (
          <Lightbox
            defaultIndex={openedMediaIndex}
            isOpen={isLightboxOpen}
            media={message.media}
            onClose={handleLightboxClose}
          />
        )}
      </div>
    </div>
  );
};
