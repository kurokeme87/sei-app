"use client";

import { createContext, useState } from "react";

export const SymbiosisContext = createContext(null);

const SymbiosisProvider = ({ children }) => {
  const [isConnectWalletOpen, setIsConnectWalletOpen] =
    useState<boolean>(false);

  const value = {
    isConnectWalletOpen,
    setIsConnectWalletOpen,
  };

  return (
    <SymbiosisContext.Provider value={value}>
      {children}
    </SymbiosisContext.Provider>
  );
};

export default SymbiosisProvider;
