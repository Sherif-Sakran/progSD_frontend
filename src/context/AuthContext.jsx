import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const savedUser = localStorage.getItem('user')
    console.log('useEffect in AuthProvider');
    if (savedUser) {
      console.log('User data found in local storage:', savedUser);
      setUser(  JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);
  // the loading component here is important because the user state is set asynchronously
  // this makes the children component to be rendered only after the user state is set
  // otherwise, the children component will be rendered before the user is set => user will be null
  // ProtectedRoute will always redirect to the login page 
  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
