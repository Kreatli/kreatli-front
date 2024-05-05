import React from 'react';
import io, { Socket } from 'socket.io-client';

import { useSession } from './useSession';

export const useSocket = (path: string) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);

  const { currentUserId } = useSession();

  React.useEffect(() => {
    if (!currentUserId) {
      return;
    }

    const newSocket = io(process.env.API_URL as string, {
      key: currentUserId,
      autoConnect: false,
      path,
      query: { userId: currentUserId },
    });

    newSocket.connect();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [currentUserId, path]);

  return socket;
};
