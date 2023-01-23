import React, { useState, createContext } from 'react';
// create context
export const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClose = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, handleClose }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;