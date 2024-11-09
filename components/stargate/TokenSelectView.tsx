"use client";

import { MORALIS_API_KEY } from "@/app/web3Config";
import axios from "axios";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const TokenSelectView = ({
  setCurrentView,
  handleToggle,
  isActive,
  handleTokenSelect,
  selectedNetwork,
}) => {
  const chains = ["eth", "linea", "polygon", "base", "optimism"];
  const { chainId, connector, address, chain, isConnected } = useAccount();
  const [allTokens, setAllTokens] = useState([]);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (!address || !selectedNetwork?.groupID) return;

    async function fetchNetworkBalance() {
      const response = await axios.get(
        `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens`,
        {
          headers: {
            "X-API-Key": MORALIS_API_KEY,
          },
          params: {
            chain: selectedNetwork?.groupID,
          },
        }
      );

      setTokens(response?.data?.result);
    }

    fetchNetworkBalance();
  }, [address, selectedNetwork]);

  useEffect(() => {
    if (!address) return;
    async function fetchAllBalances() {
      const results = await Promise.all(
        chains.map(async (chain) => {
          const response = await axios.get(
            `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens`,
            {
              headers: {
                "X-API-Key": MORALIS_API_KEY,
              },
              params: {
                chain,
              },
            }
          );
          return { chain, tokens: response?.data?.result };
        })
      );
      setAllTokens(results);
    }

    fetchAllBalances();
  }, [address]);

  console.log(allTokens, "all tokens");
  return (
    <>
      <div className="rounded-tl-lg rounded-tr-lg bg-[#1A1A1A]">
        <div className="pt-6 px-6 pb-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Select token</h2>
            <X
              className="cursor-pointer"
              onClick={() => setCurrentView("transfer")}
            />
          </div>
          <div className="bg-[#232323] px-4 flex items-center gap-2 rounded-lg border border-[#323232] mb-4 outline-none">
            <Search className="text-white text-[11px]" />
            <input
              type="text"
              placeholder="Search by name or token symbol"
              className="w-full bg-transparent text-sm rounded-lg px-2 py-3 "
            />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div
              onClick={handleToggle}
              className={`w-6 h-3 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                isActive ? "bg-[#50BEAF]" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-3 h-3 bg-white rounded-full transform transition-transform duration-300 ${
                  isActive ? "translate-x-2" : "translate-x-[-8px]"
                }`}
              ></div>
            </div>
            <label htmlFor="hideEmptyBalances">Hide empty balances</label>
          </div>
        </div>
      </div>
      {selectedNetwork && tokens.length > 0 ? (
        <div className="max-h-[550px] px-6 pt-6 overflow-y-auto modal-scroll">
          <div className="w-full border-b mb-1 pb-1 border-[#646464] text-[11px] text-[#646464]">
            {selectedNetwork?.name} Network
          </div>
          {tokens?.map((token, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-[#1a1a1a] cursor-pointer"
              onClick={() => handleTokenSelect(token)}
            >
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={token?.logo}
                    alt={token?.name}
                    className="w-8 h-8 mr-2 rounded-full"
                  />
                  <img
                    src={token?.thumbnail}
                    alt={token?.name}
                    className="w-4 h-4 mr-2 absolute bottom-0 right-0 z-10"
                  />
                </div>
                <div>
                  <div>{token?.symbol}</div>
                  <p className="text-xs text-[#999]">{selectedNetwork?.name}</p>
                </div>
              </div>
              <div className="font-medium">
                <p className="text-sm">
                  {Number(token?.balance_formatted)?.toFixed(4)}
                </p>
                <p className="text-xs text-[#999] text-right">
                  ${Number(token?.usd_price)?.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="max-h-[550px] p-6 overflow-y-auto modal-scroll">
        <div className="w-full border-b mb-1 pb-1 border-[#646464] text-[11px] text-[#646464]">
          All networks
        </div>
        {allTokens
          ?.flatMap((chain) => chain?.tokens)
          .map((token, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-[#1a1a1a] cursor-pointer"
              onClick={() => handleTokenSelect(token)}
            >
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={token.logo}
                    alt={token.name}
                    className="w-8 h-8 mr-2 rounded-full"
                  />
                  <img
                    src={token.thumbnail}
                    alt={token.name}
                    className="w-4 h-4 mr-2 absolute bottom-0 right-0 z-10"
                  />
                </div>
                <div>
                  <div>{token.symbol}</div>
                  <p className="text-xs text-[#999]">{/* {token?.} */}</p>
                </div>
              </div>
              <div className="font-medium">
                <p className="text-sm">
                  {Number(token?.balance_formatted)?.toFixed(4)}
                </p>
                <p className="text-xs text-[#999] text-right">
                  ${Number(token?.usd_price)?.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default TokenSelectView;
