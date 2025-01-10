"use client";

import { useEffect, useState } from "react";

const useGetTronBalance = async (contractAddress = null) => {
  if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    try {
      const walletAddress = window.tronWeb.defaultAddress.base58;

      if (!contractAddress) {
        // For native TRX balance
        const balanceInSun = await window.tronWeb.trx.getBalance(walletAddress);
        return window.tronWeb.fromSun(balanceInSun); // Convert Sun to TRX
      } else {
        // For TRC-20 token balance
        const contract = await window.tronWeb.contract().at(contractAddress);
        const balanceInTokens = await contract.balanceOf(walletAddress).call();

        const decimals = await contract.decimals().call();
        const formattedBalance = balanceInTokens / Math.pow(10, decimals);

        return formattedBalance;
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      return null;
    }
  } else {
    console.error("TronLink wallet is not installed or connected.");
    return null;
  }
};

export const useGetTrBalance = (tokenAddress: string): string | number => {
  const [tronBalance, setTronBalance] = useState<string | number | any>("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await useGetTronBalance(tokenAddress);
        console.log("tronBalance", balance);
        setTronBalance(balance || "0");
      } catch (error) {
        console.error("Error fetching Tron balance:", error);
        setTronBalance("");
      }
    };

    fetchBalance();
  }, [tokenAddress]);

  return tronBalance;
};

export default useGetTronBalance;
