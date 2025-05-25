"use client";

import { createContext, useContext, useState } from "react";

// Create context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context easily
export const useUser = () => useContext(UserContext);
