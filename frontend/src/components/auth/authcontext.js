import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Check for token in localStorage when the app starts
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true); 
      console.log("logged usefeect"); // Set as logged in if token exists
    } else {
      setIsLoggedIn(false); 
      console.log("logged useeffect"); // No token, so not logged in
    }
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    setIsLoggedIn(true);
    localStorage.setItem('token', newToken);
    console.log("logged");
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    console.log("logged out");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
