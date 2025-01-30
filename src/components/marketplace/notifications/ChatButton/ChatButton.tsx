import { Badge, Button } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';
import { Socket } from 'socket.io-client';

import { requestUnreadMessagesCount } from '../../../../services/marketplace/notifications';
import { Icon } from '../../../various/Icon';

interface Props {
  socket: Socket | null;
}

export const ChatButton = ({ socket }: Props) => {
  const [unreadMessagesCount, setUnreadMessagesCount] = React.useState(0);

  const loadInitialUnreadMessagesCount = () => {
    requestUnreadMessagesCount().then(({ unreadMessagesCount: count }) => {
      setUnreadMessagesCount(count);
    });
  };

  React.useEffect(loadInitialUnreadMessagesCount, []);

  React.useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('unreadMessagesCount', (count: number) => {
      setUnreadMessagesCount(count);
    });

    return () => {
      socket.off('unreadMessagesCount');
    };
  }, [socket]);

  return (
    <Button
      as={NextLink}
      href="/marketplace/chat"
      isIconOnly
      aria-label="Open messages"
      variant="light"
      className="text-foreground"
      radius="full"
    >
      <Badge
        size="sm"
        shape="circle"
        isInvisible={unreadMessagesCount === 0}
        content={unreadMessagesCount}
        color="danger"
      >
        <Icon icon="chat" size={20} />
      </Badge>
    </Button>
  );
};
