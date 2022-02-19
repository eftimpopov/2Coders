import React, { createContext, useEffect, useState } from 'react';
import moment from 'moment';

export const MainContext = createContext();

const AppContextProvider = ({ children }) => {
  const userInitialState =
    localStorage.getItem('reactflixUser') || '{"isNull" : true}';

  const [user, setUser] = useState(userInitialState);

  useEffect(() => {
    localStorage.setItem('reactflixUser', user);
  }, [user]);

  const values = {
    user,
    setUser,
  };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

export default AppContextProvider;
