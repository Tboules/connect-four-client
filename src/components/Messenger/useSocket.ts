import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { messageType } from "./Messenger";
import { boardArr } from "../../utils";
import { updateGame } from "../../API";

const NEW_CHAT_MESSAGE_EVENT = "chatEvent";
const BOARD_EVENT = "boardEvent";
const SOCKET_SERVER_URL = "http://localhost:3001";

export type boardType = {
  body: {
    board: string[][];
    tile: number[];
  };
  ownedByCurrentUser: null | boolean;
  senderId?: string;
};

export const useSocketChat = (roomId: any) => {
  const [messages, setMessages] = useState<messageType[]>([]);
  // const [joinInfo, setJoinInfo] = useState<any>(null);
  const [socketBoard, setSocketBoard] = useState<boardType>({
    body: {
      board: boardArr,
      tile: [0, -1],
    },
    ownedByCurrentUser: null,
  });
  const socketRef: React.MutableRefObject<any> = useRef();

  useEffect(() => {
    // @ts-ignore
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(BOARD_EVENT, (board: boardType) => {
      const incomingBoard = {
        ...board,
        ownedByCurrentUser: board.senderId === socketRef.current.id,
      };
      setSocketBoard(incomingBoard);
    });

    // socketRef.current.on("joinEvent", (info: any) => {
    //   setJoinInfo(info);
    // });

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

  const sendBoard = (boardBody: string[][], curTile: number[]) => {
    socketRef.current.emit(BOARD_EVENT, {
      body: {
        board: boardBody,
        tile: curTile,
      },
      senderId: socketRef.current.id,
    });
    updateGame({
      gameInstance: roomId,
      gameBoard: boardBody,
    });
  };

  // const sendJoinInfo = (data: any) => {
  //   socketRef.current.emit("joinEvent", {
  //     body: data,
  //   });
  // };

  return {
    messages,
    sendMessage,
    socketBoard,
    sendBoard,
    // sendJoinInfo,
    // joinInfo,
  };
};
