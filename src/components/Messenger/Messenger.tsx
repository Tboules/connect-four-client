import React from "react";
import { useSocketChat } from "./useSocket";

export type messageType = {
  body: string;
  senderId: string;
  ownedByCurrentUser: boolean;
};

const Messenger = () => {
  const { messages, sendMessage } = useSocketChat("9");
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(e.target.message.value);
    e.target.reset();
  };

  return (
    <div style={{ margin: "50px" }}>
      <form onSubmit={handleSubmit}>
        <div>
          {messages.map((mes: messageType, index: number) => (
            <p key={index}>{mes.body}</p>
          ))}
        </div>
        <input type="text" name="message" />
        <button>send</button>
      </form>
    </div>
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
