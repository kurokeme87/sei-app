"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import Image from "next/image";
import { MORALIS_API_KEY } from "@/app/web3Config";

export interface TokenBalance {
  token_address: string;
  symbol: string;
  name: string;
  logo: string;
  thumbnail: string;
  decimals: number;
  balance: string;
  possible_spam: boolean;
  verified_contract: boolean;
  total_supply: number | null;
  total_supply_formatted: number | null;
  percentage_relative_to_total_supply: number | null;
  security_score: number;
  balance_formatted: string;
  usd_price: number;
  usd_price_24hr_percent_change: number;
  usd_price_24hr_usd_change: number;
  usd_value: number;
  usd_value_24hr_usd_change: number;
  native_token: boolean;
  portfolio_percentage: number;
}

export type INetwork = {
  chainId: number | string;
  name: string;
  image: string;
  chain?: string;
};

interface IProps {
  selectedNetwork: INetwork;
  tokenAddresses: string[];
}

const WalletBalances: React.FC<IProps> = ({
  tokenAddresses,
  selectedNetwork,
}) => {
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const { address } = useAccount();
  const chains = ["eth", "linea", "polygon", "base", "optimism"];

  // console.log(MORALIS_API_KEY, "token ");

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        if (!address || !selectedNetwork?.chain) return;
        console.log("fetching selected network token balances");

        // Prepare token addresses in the required format
        const formattedTokenAddresses = tokenAddresses.reduce(
          (acc, token, index) => ({
            ...acc,
            [`token_addresses[${index}]`]: token,
          }),
          {}
        );

        // Fetch token balances for the wallet address
        const response = await axios.get(
          `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens`,
          {
            params: {
              ...(tokenAddresses && { ...formattedTokenAddresses }),
              ...(selectedNetwork?.chain && { chain: selectedNetwork?.chain }),
            },
            headers: {
              "x-api-key": MORALIS_API_KEY,
            },
          }
        );

        // console.log(response?.data?.result, "response");
        const tokenBalances =
          (response?.data?.result as unknown as TokenBalance[]) || [];

        setBalances(tokenBalances);
      } catch (error) {
        console.error("Error fetching token balances:", error);
      }
    };

    fetchBalances();
  }, [address, selectedNetwork, tokenAddresses]);

  useEffect(() => {
    console.log("fetching all balance");
    async function fetchAllBalances() {
      if (!address || selectedNetwork?.chain) return;
      const results = await Promise.all(
        chains.map(async (chain) => {
          const response = await axios.get(
            `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens`,
            {
              headers: {
                "x-api-key": MORALIS_API_KEY,
              },
              params: {
                chain,
              },
            }
          );
          return { chain, tokens: response?.data?.result };
        })
      );
      const flattenChains = results.flatMap((chain) => chain?.tokens);
      setBalances(flattenChains);
    }

    fetchAllBalances();
  }, [address, selectedNetwork, tokenAddresses]);

  return (
    <div className="space-y-4 h-full w-full">
      <ul className="my-4">
        {balances.map((token, index) => (
          <li
            role="button"
            key={index}
            className="flex justify-between items-center rounded-2xl p-2 ease transition-all duration-300 hover:bg-[#1A1A1A]"
          >
            <div className="flex justify-start items-center gap-3 flex-nowrap">
              <div className="relative">
                <Image
                  src={token?.logo}
                  alt={token?.name}
                  height={30}
                  width={30}
                />
                {selectedNetwork?.image ? (
                  <Image
                    className="absolute bottom-0 right-0 z-20"
                    src={selectedNetwork?.image}
                    alt={selectedNetwork?.name}
                    height={14}
                    width={14}
                  />
                ) : null}
              </div>
              <div>
                <p className="font-medium text-sm">{token.symbol}</p>
                <p className="text-[#999] text-xs">{token.name}</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-sm">
                {(parseFloat(token.balance) / 10 ** token.decimals).toFixed(4)}{" "}
              </p>

              <p className="text-[#999] text-xs">
                $
                {(
                  (parseFloat(token.balance) / 10 ** token.decimals) *
                  token.usd_price
                ).toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletBalances;
