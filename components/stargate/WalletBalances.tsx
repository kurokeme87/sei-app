import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import Image from "next/image";

// const API_KEY = process.env.MORALIS_API_KEY;
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImNmNTYzMmZlLTk1MjUtNDU2OC1hY2ZlLTA2ZjE4NWQzMWZkYSIsIm9yZ0lkIjoiMjUzMjkiLCJ1c2VySWQiOiIxMTE5OCIsInR5cGVJZCI6ImVkYTdmZWZiLTJmMGQtNDk5My1iMGM1LWE5OTBmNTFkZTYwMCIsInR5cGUiOiJQUk9KRUNUIiwiaWF0IjoxNzI5NjkyNjU5LCJleHAiOjQ4ODU0NTI2NTl9.rwkF6eOKLKPwVHxSTLmsG_GiESvsuBr_vckOiImueMI";

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
  // console.log(tokenAddresses, "token adddresses");

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        if (!address) return;

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
              "x-api-key": API_KEY,
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
                  src={token.logo}
                  alt={token.name}
                  height={30}
                  width={30}
                />
                {selectedNetwork.image ? (
                  <Image
                    className="absolute bottom-0 right-0 z-20"
                    src={selectedNetwork.image}
                    alt={selectedNetwork.name}
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
