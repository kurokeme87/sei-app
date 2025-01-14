"use client";

import { useEffect, useState } from "react";
import { TonConnect } from "@tonconnect/sdk";
import { Wallet } from "@tonconnect/sdk";
import { isWalletInfoInjected } from "@tonconnect/sdk";
import { selector } from "recoil";

const dappMetadata = {
  manifestUrl:
    "https://gist.githubusercontent.com/siandreev/75f1a2ccf2f3b4e2771f6089aeb06d7f/raw/d4986344010ec7a2d1cc8a2a9baa57de37aaccb8/gistfile1.txt",
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

  const walletsListQuery = selector({
    key: "walletsList",
    get: async () => {
      const walletsList = await tonConnect.getWallets();

      const embeddedWallet = walletsList
        .filter(isWalletInfoInjected)
        .find((wallet) => wallet.embedded);

      return {
        walletsList,
        embeddedWallet,
      };
    },
  });
  // Initialize TonConnect safely
  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const instance = new TonConnect(dappMetadata);
      setTonConnect(instance);
    }
  }, []);

  useEffect(() => {
    tonConnect?.onStatusChange(setWallet, console.error);
  }, []);

  return { tonConnect, wallet, addReturnStrategy, walletsListQuery };
}
