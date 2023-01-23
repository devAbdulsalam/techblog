import React, { useState, createContext } from 'react';
// create context
export const NavbarContext = createContext();

const  NavbarProvider = ({children}) => {
  // Loading state
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClose = () => {
    isOpen(false);
  };

  return (
    <NavbarContext.Provider value={{ isOpen, setIsOpen, handleClose }}>
      {children}
    </NavbarContext.Provider>
  );
}

export default NavbarProvider