import React, { createContext, useContext, useState } from "react";

type UserContextValue = {
  userIn: string;
  setUserIn: (user: UserContextValue["userIn"]) => void;
  userInfo: {
    userName: string;
    passWord: string;
    playerColor?: string;
    gameInstance?: string;
    currentUserId?: string | null;
  };
  setUserInfo: (userInfo: UserContextValue["userInfo"]) => void;
  currentUserId: string | null;
  setCurrentUserId: (currentUserId: UserContextValue["currentUserId"]) => void;
  gameId: string;
  setGameId: (gameId: UserContextValue["gameId"]) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [userIn, setUserIn] = useState<UserContextValue["userIn"]>(
    () => window.localStorage.getItem("userIn") || "false"
  );
  const [userInfo, setUserInfo] = useState<UserContextValue["userInfo"]>({
    userName: window.localStorage.getItem("userName") || "",
    passWord: window.localStorage.getItem("passWord") || "",
    playerColor: "white",
    gameInstance: "0",
  });
  const [currentUserId, setCurrentUserId] = useState<
    UserContextValue["currentUserId"]
  >(null);
  const [gameId, setGameId] = useState<UserContextValue["gameId"]>(
    () => window.localStorage.getItem("gameId") || ""
  );

  console.log(userInfo);

  return (
    <UserContext.Provider
      value={{
        userIn,
        setUserIn,
        userInfo,
        setUserInfo,
        currentUserId,
        setCurrentUserId,
        gameId,
        setGameId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be rendered within the UserProvider");
  }
  return context;
}

export default UserContext;
