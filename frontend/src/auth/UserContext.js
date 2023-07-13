import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);