import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 1000; // 1 second

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const connect = useCallback(() => {
    const token = Cookies.get('token');
    if (!token) return;

    const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
      reconnectionDelay: RECONNECT_DELAY,
      timeout: 10000,
      path: '/socket.io',
    });

    socket.on('connect', () => {
      console.log('Socket connected');
      reconnectAttemptsRef.current = 0;
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      reconnectAttemptsRef.current += 1;

      if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
        console.error('Max reconnection attempts reached');
        socket.disconnect();
      }
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      if (reason === 'io server disconnect') {
        // Server initiated disconnect, try to reconnect
        socket.connect();
      }
    });

    socketRef.current = socket;

    return socket;
  }, []);

  useEffect(() => {
    const socket = connect();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [connect]);

  return socketRef.current;
};
