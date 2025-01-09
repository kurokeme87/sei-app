"use client";

import {
  TronWalletContext,
  TronWalletContextValue,
} from "@/components/providers/TronWalletProvider";
import { useContext } from "react";

const useTronWallet = (): TronWalletContextValue => {
  return useContext(TronWalletContext);
};

export default useTronWallet;
