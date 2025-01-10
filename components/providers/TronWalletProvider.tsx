"use client";

import useSymbiosis from "@/hooks/useSymbiosis";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapter-tronlink";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

interface NetworkData {
  chainId?: string;
  chainName?: string;
  [key: string]: any; // For additional network-related data
}

export interface TronWalletContextValue {
  adapter: TronLinkAdapter;
  netwok: NetworkData;
  tronAccount: string;
  sign: () => Promise<void>;
  readyState: string | null;
  disconnectTronLink: () => Promise<boolean>;
}

export const TronWalletContext = createContext<TronWalletContextValue | null>(
  null
);

const TronWalletProvider = ({ children }: { children: ReactNode }) => {
  const [readyState, setReadyState] = useState<string | null>(null);
  const [tronAccount, setTronAccount] = useState<string>("");
  const [netwok, setNetwork] = useState<NetworkData>({});
  const [signedMessage, setSignedMessage] = useState<string>("");
  const { setIsConnectWalletOpen } = useSymbiosis();

  const adapter = useMemo(
    () =>
      new TronLinkAdapter({
        dappName: "Symbiosis Tron",
        openTronLinkAppOnMobile: true,
        dappIcon: "https://www.symbiosisfinances.com/symbiosis/download.svg",
      }),
    []
  );

  useEffect(() => {
    // Disconnect the wallet on initial load
    if (
      (typeof window !== "undefined" && adapter.connected) ||
      window.tronWeb.defaultAddress.base58
    ) {
      adapter.disconnect();
      setTronAccount(""); // Clear the account state
      setNetwork({}); // Clear network state
    }

    setReadyState(adapter.readyState);
    setTronAccount(adapter.address!);

    adapter.on("connect", () => {
      setTronAccount(adapter.address!);
      setIsConnectWalletOpen(false);
    });

    adapter.on("readyStateChanged", (state) => {
      setReadyState(state);
    });

    adapter.on("accountsChanged", (data) => {
      setTronAccount(data);
      console.log("account changed data", data);
      // alert("account chanhged");
    });

    adapter.on("chainChanged", (data) => {
      setNetwork(data);
    });

    adapter.on("disconnect", () => {
      // when disconnect from wallet
      setTronAccount(""); // Clear the account state when disconnected
      setNetwork({}); // Clear the network state
    });

    return () => {
      // remove all listeners when components is destroyed
      adapter.removeAllListeners();
    };
  }, [adapter, setIsConnectWalletOpen]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.tronWeb.defaultAddress.base58 &&
      !tronAccount
    ) {
      setTronAccount(window.tronWeb.defaultAddress.base58);
    }
  }, []);

  async function sign() {
    const res = await adapter!.signMessage("helloworld");
    setSignedMessage(res);
  }

  // Custom function to disconnect TronLink Wallet
  const disconnectTronLink = async (): Promise<boolean> => {
    try {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        await window.tronLink.request({ method: "tron_requestAccounts" });

        await adapter.disconnect();
        // Disconnect the wallet by resetting the default address
        window.tronWeb.defaultAddress = { base58: null, hex: null };

        // Optionally, clear local storage or application state if needed
        localStorage.clear();
        sessionStorage.clear();
        console.log("TronLink wallet disconnected successfully.");

        return true; // Indicate a successful disconnect
      } else {
        console.warn("TronLink wallet is not connected.");
        return false; // No wallet was connected
      }
    } catch (error) {
      console.error("Error disconnecting TronLink wallet:", error);
      return false; // Disconnect failed
    }
  };

  const value = {
    adapter,
    netwok,
    tronAccount,
    sign,
    readyState,
    disconnectTronLink,
  };

  return (
    <TronWalletContext.Provider value={value}>
      {children}
    </TronWalletContext.Provider>
  );
};

export default TronWalletProvider;
