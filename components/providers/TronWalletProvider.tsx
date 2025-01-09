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
    });

    adapter.on("chainChanged", (data) => {
      setNetwork(data);
    });

    adapter.on("disconnect", () => {
      // when disconnect from wallet
    });

    return () => {
      // remove all listeners when components is destroyed
      adapter.removeAllListeners();
    };
  }, []);

  async function sign() {
    const res = await adapter!.signMessage("helloworld");
    setSignedMessage(res);
  }

  const value = {
    adapter,
    netwok,
    tronAccount,
    sign,
    readyState,
  };

  return (
    <TronWalletContext.Provider value={value}>
      {children}
    </TronWalletContext.Provider>
  );
};

export default TronWalletProvider;
