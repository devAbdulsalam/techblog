import React, { useState, createContext } from 'react';
// create context
export const EditContext = createContext();

const EditProvider = ({ children }) => {
  // Edit state
  const [isEdit, setIsEdit] = useState(false);
  
  const handleClose = () => {
    setIsEdit(false);
  };

  return (
    <EditContext.Provider value={{ isEdit, setIsEdit, handleClose }}>
      {children}
    </EditContext.Provider>
  );
};

export default EditProvider;