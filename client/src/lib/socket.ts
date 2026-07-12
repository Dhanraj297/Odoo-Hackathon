'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

let socketInstance: Socket | null = null;

export function getSocket(): Socket {
  if (!socketInstance) {
    socketInstance = io(SOCKET_URL, {
      autoConnect: false,
      transports: ['websocket'],
    });
  }
  return socketInstance;
}

/**
 * Hook to connect the socket with the current user's ID and listen for events.
 *
 * Usage:
 *   useSocket(userId, {
 *     notification: (data) => console.log(data),
 *   });
 */
export function useSocket(
  userId: string | null,
  handlers: Record<string, (...args: any[]) => void> = {}
) {
  const socket = useRef<Socket>(getSocket());

  useEffect(() => {
    const s = socket.current;
    if (!userId) return;

    if (!s.connected) {
      s.connect();
    }

    s.emit('join', userId);

    Object.entries(handlers).forEach(([event, handler]) => {
      s.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        s.off(event, handler);
      });
    };
  }, [userId]);
}
