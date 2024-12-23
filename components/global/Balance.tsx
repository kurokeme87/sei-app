"use client";

import { formatCurrency } from "@/app/utils";
import { config } from "@/app/web3Config";
import React, { useEffect, useState } from "react";
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

export const Balance = React.memo(({ token, chainId }: any) => {
  const { address } = useAccount();
  const [balance, setBalance] = useState("0.00");

  const { data, refetch } = useBalance({
    address,
    ...(token &&
      token !== "0x0000000000000000000000000000000000000000" && { token }),
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

  return <p>{+balance > 0 ? formatCurrency(balance) : "0"}</p>;
});

export const SymbiosisBalance = ({ token, chainId }) => {
  const { address } = useAccount();

  const { data, refetch } = useBalance({
    address,
    ...(token && { token }),
    chainId,
    config,
  });

  if (!chainId) return <p>(???)</p>;

  return (
    <p>
      {+data?.formatted > 0 ? Number(data?.formatted)?.toFixed(5) : `(???)`}
    </p>
  );
};

export const JumperBalance = ({ token, chainId }) => {
  const { address } = useAccount();
  const [balance, setBalance] = useState("0.00");

  const { data, refetch } = useBalance({
    address,
    ...(token && { token }),
    chainId,
    config,
  });

  // Trigger refetch when the component re-renders due to network switch
  // useEffect(() => {
  //   if (address && chainId && token) refetch();
  // }, [chainId, address, token, refetch]);

  return (
    <p>{+data?.formatted > 0 ? Number(data?.formatted)?.toFixed(6) : null}</p>
  );
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
