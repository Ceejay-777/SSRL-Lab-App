import React, { createContext, useContext, useState } from "react";
const userData = createContext();

const DataContext = ({ children }) => {
  const [userId, setUserId] = useState("CovenantSSRL003");

  const value = { userId, setUserId };
  return <userData.Provider value={value}>{children}</userData.Provider>;
};

export default DataContext
export const useUserData = () => useContext(userData)
