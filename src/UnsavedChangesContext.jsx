// UnsavedChangesContext.js
import React, { createContext, useState, useContext } from "react";

const UnsavedChangesContext = createContext();

export const UnsavedChangesProvider = ({ children }) => {
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  return (
    <UnsavedChangesContext.Provider
      value={{
        unsavedChanges,
        setUnsavedChanges,
        showModal,
        setShowModal,
        pendingAction,
        setPendingAction,
      }}
    >
      {children}
    </UnsavedChangesContext.Provider>
  );
};

export const useUnsavedChanges = () => useContext(UnsavedChangesContext);
