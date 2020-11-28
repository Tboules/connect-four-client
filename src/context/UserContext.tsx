import React, { createContext, useContext, useState } from "react";

type UserContextValue = {
  userIn: boolean;
  setUserIn: (user: UserContextValue["userIn"]) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [userIn, setUserIn] = useState<UserContextValue["userIn"]>(true);
  return (
    <UserContext.Provider value={{ userIn, setUserIn }}>
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
