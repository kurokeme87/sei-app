import { tonConnector } from "@/data/ton-connector";
import { Wallet } from "@tonconnect/sdk";
import { useEffect, useState } from "react";

export function useTonWallet() {
  const [wallet, setWallet] = useState<Wallet | null>(tonConnector.wallet);

  useEffect(() => tonConnector.onStatusChange(setWallet, console.error), []);

  return wallet;
}
