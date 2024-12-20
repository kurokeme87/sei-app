import { SymbiosisContext } from "@/components/providers/SymbiosisProvier";
import { useContext } from "react";

export type SymbiosisContextType = {
  isConnectWalletOpen: boolean;
  setIsConnectWalletOpen: (isConnectWalletOpen: boolean) => void;
};

const useSymbiosis = (): SymbiosisContextType => {
  return useContext(SymbiosisContext);
};

export default useSymbiosis;
