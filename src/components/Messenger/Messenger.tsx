import React, { useEffect, useState } from "react";
import { useSocketChat } from "./useSocket";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";
import { getGame } from "../../API";

export type messageType = {
  body: {
    user: string;
    message: string;
  };
  senderId: string;
  ownedByCurrentUser: boolean;
};
const StyledMessengerLayout = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 20%;
  top: 90px;
  background-color: whitesmoke;
`;

const StyledDisplayWindow = styled.div`
  position: fixed;
  bottom: 50px;
  right: 0;
  width: 19%;
  top: 90px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
`;

const StyledInput = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 2;
  width: 20%;

  input {
    border: none;
    height: 50px;
    width: 70%;
    background-color: #e8e8e8;
  }

  button {
    width: 28%;
    height: 50px;
    border: none;
    background-color: #1750e1;
    cursor: pointer;
    color: white;
    font-size: 1rem;
  }
`;

const StyledMessage = styled.div`
  display: flex;
  align-items: center;

  label {
    padding-right: 10px;
  }
`;

const Messenger = () => {
  const { userInfo } = useUser();
  const room = window.localStorage.getItem("gameId");
  const [prevMessages, setPrevMessages] = useState([]);
  const { messages, sendMessage } = useSocketChat(room);

  useEffect(() => {
    const grabMessages = async () => {
      const game = await getGame(room);
      setPrevMessages(game?.data[0].messages);
    };
    grabMessages();
  }, []);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({
      user: userInfo.userName,
      message: e.target.message.value,
    });
    e.target.reset();
  };
  console.log(prevMessages);

  return (
    <StyledMessengerLayout>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <StyledDisplayWindow>
          <div>
            {prevMessages.map((mesObj: any, i) => (
              <StyledMessage key={i}>
                <label htmlFor="mes">{mesObj.user}:</label>
                <p>{mesObj.message}</p>
              </StyledMessage>
            ))}
            {messages.map((mes: messageType, index: number) => (
              <StyledMessage key={index}>
                <label htmlFor="mes">{mes.body.user}:</label>
                <p>{mes.body.message}</p>
              </StyledMessage>
            ))}
          </div>
        </StyledDisplayWindow>
        <StyledInput>
          <input type="text" name="message" />
          <button>send</button>
        </StyledInput>
      </form>
    </StyledMessengerLayout>
  );
};

export default Messenger;
// import { io } from "socket.io-client";
// const ENDPOINT = "http://localhost:3001";

// const [messages, setMessages] = useState<any>([]);
// const [newMessage, setNewMessage] = useState("");
// const socketRef: any = useRef();

// console.log(messages);

// const socket = io(ENDPOINT);
// useEffect(() => {
//   //@ts-ignore

//   socket.on("chatEvent", (message: any) => {
//     setMessages([...messages, message]);
//   });
// }, [messages, socket]);
