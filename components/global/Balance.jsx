"use client";

import { config } from "@/app/web3Config";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";

export const Balance = ({ name, token, chainId }) => {
  const { address } = useAccount();
  const [balance, setBalance] = useState("0.00");

  const { data, refetch } = useBalance({
    address,
    token,
    chainId,
    config,
    enabled: !!(address && chainId),
  });

  useEffect(() => {
    if (data?.formatted) {
      setBalance(data.formatted);
    } else {
      setBalance("0");
    }
  }, [data]);

  // Trigger refetch when the component re-renders due to network switch
  // useEffect(() => {
  //   if (address && chainId && token) refetch();
  // }, [chainId, address, token, refetch]);

  return <p className="text-black">{Number(balance)?.toFixed(3)}</p>;
};

export default Balance;
