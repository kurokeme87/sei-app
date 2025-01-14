"use client";

import { useEffect, useMemo, useState } from "react";
import { TonConnect, WalletInfo } from "@tonconnect/sdk";
import { Wallet } from "@tonconnect/sdk";
import { isWalletInfoInjected } from "@tonconnect/sdk";
import { useRecoilValueLoadable } from "recoil";
// import { selector } from "recoil";

const dappMetadata = {
  manifestUrl: "https://www.en-sei.io/tonconnect-manifest.json",
};

function addReturnStrategy(
  url: string,
  returnStrategy: "back" | "none"
): string {
  const link = new URL(url);
  link.searchParams.append("ret", returnStrategy);
  return link.toString();
}

export function useTonConnect() {
  const [tonConnect, setTonConnect] = useState<TonConnect | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(tonConnect as any);
  const [walletsList, setWalletsList] = useState<{
    walletsList: WalletInfo[] | null | any;
    embeddedWallet: WalletInfo | null | any;
  }>({ walletsList: null, embeddedWallet: null });

  const walletsListQuery = useMemo(() => {
    if (!tonConnect) return null;

    const fetchWallets = async () => {
      const walletsList = await tonConnect.getWallets();

      const embeddedWallet = walletsList
        .filter(isWalletInfoInjected)
        .find((wallet) => wallet.embedded);

      return {
        walletsList,
        embeddedWallet,
      };
    };

    return fetchWallets();
  }, [tonConnect]);

  useEffect(() => {
    if (tonConnect) {
      const fetchWallets = async () => {
        try {
          const wallets = await tonConnect.getWallets();
          const embeddedWallet = wallets
            .filter(isWalletInfoInjected)
            .find((wallet) => wallet.embedded);

          setWalletsList({ walletsList: wallets, embeddedWallet });
        } catch (error) {
          console.error("Error fetching wallets:", error);
        }
      };

      fetchWallets();
    }
  }, [tonConnect]);

  // const walletsListQuery = selector({
  //   key: "walletsList",
  //   get: async () => {
  //     const walletsList = await tonConnect.getWallets();

  //     const embeddedWallet = walletsList
  //       .filter(isWalletInfoInjected)
  //       .find((wallet) => wallet.embedded);

  //     return {
  //       walletsList,
  //       embeddedWallet,
  //     };
  //   },
  // });

  // Initialize TonConnect safely
  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const instance = new TonConnect(dappMetadata);
      setTonConnect(instance);
    }
  }, []);

  useEffect(() => {
    tonConnect?.onStatusChange(setWallet, console.error);
    alert("connected");
  }, []);

  return {
    tonConnect,
    wallet,
    addReturnStrategy,
    walletsListQuery,
    walletsList,
  };
}
