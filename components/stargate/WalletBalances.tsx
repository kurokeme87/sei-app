"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { MORALIS_API_KEY } from "@/app/web3Config";
import LoadingSkeleton from "../global/LoadingSkeleton";

export interface ITokenBalance {
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

interface ITokens {
  tokens: ITokenBalance[];
  chain: string;
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
  const [balances, setBalances] = useState<ITokens | any>([]);
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const chains: string[] = ["eth", "linea", "polygon", "base", "optimism"];

  useEffect(() => {
    const fetchAllBalances = async () => {
      let allChains = chains;
      if (selectedNetwork?.chain) {
        allChains = chains.filter((itm) => itm === selectedNetwork?.chain);
      }
      if (address) {
        try {
          setLoading(true);
          const results = await Promise.all(
            allChains.map(async (chain) => {
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
              return { chain, tokens: response?.data?.result || [] }; // Default to empty array
            })
          );

          setBalances(results);
        } catch (error) {
          console.error("Error fetching all balances:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAllBalances();
  }, [address, selectedNetwork]);

  // console.log(balances, "balances");
  return (
    <div className="space-y-4 h-full w-full">
      <ul className="my-4">
        {balances?.length > 0 && !loading
          ? balances
              .flatMap((itm) => itm?.tokens)
              ?.map((token, index) => (
                <li
                  role="button"
                  key={index}
                  className="flex justify-between items-center rounded-2xl p-2 ease transition-all duration-300 hover:bg-[#1A1A1A]"
                >
                  <div className="flex justify-start items-center gap-3 flex-nowrap">
                    <div className="relative">
                      <img
                        src={token?.logo}
                        alt={token?.name}
                        height={30}
                        width={30}
                      />
                      {selectedNetwork?.image ? (
                        <img
                          className="absolute bottom-0 right-0 z-20"
                          src={selectedNetwork?.image}
                          alt={selectedNetwork?.name}
                          height={14}
                          width={14}
                        />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{token?.symbol}</p>
                      <p className="text-[#999] text-xs">{token?.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {(
                        parseFloat(token?.balance) /
                        10 ** token?.decimals
                      ).toFixed(4)}
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
              ))
          : null}

        {!loading && balances.length === 0 ? (
          <div className="w-full border border-[#444] border-dashed rounded-md  p-4 flex justify-center items-center text-xs text-[#999]">
            <p className="w-full text-center">No tokens yet.</p>
          </div>
        ) : null}

        {loading ? <LoadingSkeleton /> : null}
      </ul>
    </div>
  );
};

export default WalletBalances;
