import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { messageType } from "./Messenger";

const NEW_CHAT_MESSAGE_EVENT = "chatEvent";
const SOCKET_SERVER_URL = "http://localhost:3001";

export const useSocketChat = (roomId: any) => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const socketRef: React.MutableRefObject<any> = useRef();

  useEffect(() => {
    // @ts-ignore
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: messageType) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody: string) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};
