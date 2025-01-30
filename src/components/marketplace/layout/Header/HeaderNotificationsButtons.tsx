import React from 'react';

import { useSocket } from '../../../../hooks/marketplace/useSocket';
import { ChatButton } from '../../notifications/ChatButton';
import { NotificationButton } from '../../notifications/NotificationButton';

export const HeaderNotificationsButtons = () => {
  const socket = useSocket('/notifications-server');

  return (
    <>
      <ChatButton socket={socket} />
      <NotificationButton socket={socket} />
    </>
  );
};
