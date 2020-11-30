import React, { createContext, useContext, useState } from "react";

type UserContextValue = {
  userIn: boolean;
  setUserIn: (user: UserContextValue["userIn"]) => void;
  userInfo: {
    userName: string;
    passWord: string;
    playerColor: string;
    gameInstance: number;
  };
  setUserInfo: (userInfo: UserContextValue["userInfo"]) => void;
  currentUserId: string | null;
  setCurrentUserId: (currentUserId: UserContextValue["currentUserId"]) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [userIn, setUserIn] = useState<UserContextValue["userIn"]>(true);
  const [userInfo, setUserInfo] = useState<UserContextValue["userInfo"]>({
    userName: "",
    passWord: "",
    playerColor: "white",
    gameInstance: 0,
  });
  const [currentUserId, setCurrentUserId] = useState<
    UserContextValue["currentUserId"]
  >(null);

  return (
    <UserContext.Provider
      value={{
        userIn,
        setUserIn,
        userInfo,
        setUserInfo,
        currentUserId,
        setCurrentUserId,
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
