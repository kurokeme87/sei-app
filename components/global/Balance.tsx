"use client";

import { config } from "@/app/web3Config";
import { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  UseBalanceReturnType,
  UseBalanceParameters,
} from "wagmi";

interface IBalance {
  token?: string;
  chainId: number;
}

export const Balance = ({ token, chainId }) => {
  const { address } = useAccount();
  const [balance, setBalance] = useState("0.00");

  const { data, refetch } = useBalance({
    address,
    ...(token && { token }),
    chainId,
    config,
  });

  useEffect(() => {
    if (+data?.formatted > 0) {
      setBalance(data.formatted);
    } else {
      setBalance("0");
    }
  }, [data]);

  // Trigger refetch when the component re-renders due to network switch
  // useEffect(() => {
  //   if (address && chainId && token) refetch();
  // }, [chainId, address, token, refetch]);

  return <p>{Number(balance)?.toFixed(4)}</p>;
};

export const TokenBalance = ({ chainId }) => {
  const { address } = useAccount();
  const [balance, setBalance] = useState("0.00");

  const { data, refetch } = useBalance({
    address,
    chainId,
    config,
  });

  useEffect(() => {
    if (+data?.formatted > 0) {
      setBalance(data.formatted);
    } else {
      setBalance("0");
    }
  }, [data]);

  return <p>{Number(balance)?.toFixed(4)}</p>;
};

export default Balance;
