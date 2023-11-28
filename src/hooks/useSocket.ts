import React from 'react';
import io, { Socket } from 'socket.io-client';

import { useSession } from './useSession';

export const useSocket = (path: string) => {
  const socketRef = React.useRef<Socket | null>(null);

  const { currentUserId } = useSession();

  React.useEffect(() => {
    if (!currentUserId) {
      return;
    }

    socketRef.current = io(process.env.API_URL as string, {
      key: currentUserId,
      autoConnect: false,
      path,
      query: { userId: currentUserId },
    });
    socketRef.current.connect();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [currentUserId, path]);

  return socketRef;
};
