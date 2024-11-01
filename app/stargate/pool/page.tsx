"use client";

import StargateLayout from "@/app/layouts/stargateLayout";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  SlidersHorizontal,
} from "lucide-react";
import React, { useState } from "react";

const poolData = [
  {
    token: "ETH",
    liquidity: "$39.75M",
    network: "Arbitrum",
    volume24h: "$4,927,598.39",
    volume7d: "$53,105,381.70",
    logo: "/stargate/eth.svg",
    logo2: "/stargate/arbitrum-icon.png",
  },
  {
    token: "ETH",
    liquidity: "$34.16M",
    network: "Ethereum",
    volume24h: "$1,620,791.75",
    volume7d: "$26,570,153.97",
    logo: "/stargate/eth.svg",
    logo2: "/stargate/ethereum (1).svg",
  },
  {
    token: "ETH",
    liquidity: "$25.01M",
    network: "Optimism",
    volume24h: "$3,274,676.63",
    volume7d: "$22,360,420.78",
    logo: "/stargate/eth.svg",
    logo2: "/stargate/arbitrum-icon.png",
  },
  {
    token: "ETH",
    liquidity: "$23.07M",
    network: "Linea",
    volume24h: "$2,863,510.42",
    volume7d: "$26,685,929.85",
    logo: "/stargate/eth.svg",
    logo2: "/stargate/arbitrum-icon.png",
  },
  {
    token: "USDC",
    liquidity: "$18.53M",
    network: "Ethereum",
    volume24h: "$7,427,178.93",
    volume7d: "$20,325,999.30",
    logo: "/stargate/usdc.svg",
    logo2: "/stargate/ethereum (1).svg",
  },
  {
    token: "ETH",
    liquidity: "$17.9M",
    network: "Base",
    volume24h: "$6,519,743.23",
    volume7d: "$49,705,736.11",
    logo: "/stargate/eth.svg",
    logo2: "/stargate/arbitrum-icon.png",
  },
  {
    token: "mETH",
    liquidity: "$15.54M",
    network: "Ethereum",
    volume24h: "$244,046.91",
    volume7d: "$4,796,268.29",
    logo: "/stargate/ssETH-icon.png",
    logo2: "/stargate/ethereum (1).svg",
  },
  {
    token: "USDT",
    liquidity: "$14.77M",
    network: "Ethereum",
    volume24h: "$124,326.49",
    volume7d: "$1,243,264.90",
    logo: "/stargate/usdt.svg",
    logo2: "/stargate/ethereum (1).svg",
  },
];

const tokens = [
  { name: "All", icon: null },
  { name: "ETH", icon: "/stargate/eth.svg" },
  { name: "USDC", icon: "/stargate/usdc-icon.png" },
  { name: "mETH", icon: "/stargate/metis.svg" },
  { name: "USDT", icon: "/stargate/usdt.svg" },
  { name: "USDt", icon: "/stargate/usdt.svg" },
  { name: "USDbC", icon: "/stargate/usdbc.svg" },
  { name: "WETH", icon: "/stargate/weth.svg" },
];

const networks = [
  { name: "All", icon: null },
  { name: "Arbitrum", icon: "/stargate/arbitrum (1).svg" },
  { name: "Ethereum", icon: "/stargate/eth.svg" },
  { name: "Linea", icon: "/stargate/linea.svg" },
  { name: "Optimism", icon: "/stargate/optimism (1).svg" },
  { name: "Base", icon: "/stargate/base.svg" },
  { name: "BNB Chain", icon: "/stargate/bnb.svg" },
  { name: "Scroll", icon: "/stargate/scroll.svg" },
];

const versions = [
  { name: "All", icon: null },
  { name: "V1", icon: null },
  { name: "V2", icon: null },
];

type DropdownProps = {
  label: string;
  options: { name: string; icon: string | null }[];
  selectedOption: string;
  onSelect: (option: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="py-2 px-4 bg-[#1a1a1a] text-white rounded-lg flex items-center justify-between w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {label}: {selectedOption}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 ml-2" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-2" />
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-[200px] mt-1 bg-[#1a1a1a] border border-[#323232] rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.name}
              className="w-full px-4 py-2 text-left hover:bg-[#323232] flex items-center"
              onClick={() => {
                onSelect(option.name);
                setIsOpen(false);
              }}
            >
              {option.icon && (
                <img
                  src={option.icon}
                  alt={option.name}
                  className="w-6 h-6 mr-2 rounded-full"
                />
              )}
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Pool() {
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedToken, setSelectedToken] = useState("All");
  const [selectedNetwork, setSelectedNetwork] = useState("All");
  const [selectedVersion, setSelectedVersion] = useState("V2");
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = poolData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(poolData.length / itemsPerPage);

  return (
    <StargateLayout>
      <div className="max-w-6xl px-4 z-50 overflow-auto mt-12 mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-[#999999]">Stargate</span> Pool
        </h1>
        <p className="text-gray-400 mt-8 mb-8">
          Add liquidity to Stargate&apos;s omnichain protocol and earn
          stablecoin rewards on every Stargate <br />
          transfer. Liquidity providers can also farm their LP tokens to receive
          STG token rewards.
        </p>

        <div className="z-20">
          <div className="bg-[#232323] z-20 rounded-lg p-4 flex text-sm justify-between items-center mb-4">
            <div className="flex gap-4 items-center z-20">
              <div className="px-3 opacity-30 py-1 rounded-lg border border-[#eaeaea]/20">
                My Pools • 0
              </div>
              <div className="px-3 md:block hidden py-1 opacity-30 rounded-lg border border-[#eaeaea]/20">
                Available • 0
              </div>
              <div className="px-3 md:block hidden py-1 rounded-lg border border-[#50BEAF]">
                Top Pools • <span className="text-[#50BEAF]">82</span>
              </div>
            </div>
            <div className="md:flex hidden space-x-2 z-20 bg-[#232323]  rounded-lg">
              <Dropdown
                label="Token"
                options={tokens}
                selectedOption={selectedToken}
                onSelect={setSelectedToken}
              />
              <Dropdown
                label="Network"
                options={networks}
                selectedOption={selectedNetwork}
                onSelect={setSelectedNetwork}
              />
              <Dropdown
                label="Version"
                options={versions}
                selectedOption={selectedVersion}
                onSelect={setSelectedVersion}
              />
            </div>
            <div>
              <SlidersHorizontal />
            </div>
          </div>
        </div>

        <div className="md:overflow-hidden overflow-auto">
          <div className="md:grid flex md:grid-cols-2 w-full lg:grid-cols-4 gap-4 md:mb-2 mb-8">
            {poolData.map((pool, index) => (
              <div
                key={index}
                className="bg-[#232323] md:w-full w-[400px] rounded-lg  p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <img
                    src={pool.logo}
                    className="w-5 h-5 rounded-full"
                    alt=""
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-teal-500 text-white px-1 py-1 rounded">
                      V2
                    </span>
                    <img
                      src={pool.logo2}
                      className="w-5 h-5 rounded-full"
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex items-center text-[13px] text-[#707070] justify-between">
                  <p>Token</p>
                  <p>Liquidity</p>
                </div>
                <div className="flex items-center font-bold justify-between">
                  <span className="text-2xl">{pool.token}</span>
                  <div className="text-2xl font-bold mb-2">
                    {pool.liquidity}
                  </div>
                </div>
                <div></div>
                {/* <div className="text-2xl font-bold mb-2">{pool.liquidity}</div> */}
                <div className="text-sm mt-3 flex items-center justify-between text-gray-400">
                  <div>Wallet Balance</div>
                  <div>Volume (24h)</div>
                  {/* <div className="font-bold">{pool.volume24h}</div> */}
                </div>
                <div className="flex items-center justify-between">
                  <div>-</div>
                  <div className="font-light">{pool.volume24h}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:flex hidden z-40 justify-end mb-10 items-center">
            {/* <div>
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, poolData.length)} of {poolData.length}{" "}
            entries
          </div> */}
            <div className="flex space-x-2 ">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 bg-[#1a1a1a] z-20 cursor-pointer rounded-lg disabled:opacity-50"
              >
                <ChevronLeft className="text-[11px]" />
              </button>
              <div className="px-3 py-1 bg-[#1a1a1a] rounded-lg">
                <span className="text-[#50BEAF]">{currentPage}</span>/
                {totalPages}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-1 bg-[#1a1a1a] cursor-pointer z-20 rounded-lg disabled:opacity-50"
              >
                <ChevronRight className="text-[11px]" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#232323] z-20 rounded-lg p-4 mb-4">
          <div className="overflow-x-auto">
            <table className="w-full z-20">
              <thead>
                <tr className="text-left text-[11px] text-[#999999]">
                  <th className="p-2">Name</th>
                  <th className="p-2">Network</th>
                  <th className="p-2">Version</th>
                  <th className="p-2">Supported</th>
                  <th className="p-2">Liquidity</th>
                  <th className="p-2">Volume (24h)</th>
                  <th className="p-2">Volume (7d)</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((pool, index) => (
                  <tr key={index} className="border-t py-8 border-black">
                    <td className="py-5 px-2 flex items-center gap-1">
                      <img
                        src={pool.logo}
                        className="w-5 h-5 rounded-full"
                        alt=""
                      />
                      {pool.token}
                    </td>
                    <td className="py-5   px-2">
                      <div className="flex items-center gap-1">
                        <img
                          src={pool.logo2}
                          className="w-5 h-5 rounded-full"
                          alt=""
                        />
                        {pool.network}
                      </div>
                    </td>
                    <td className="py-5 px-2">
                      {" "}
                      <span className="text-[11px] bg-teal-500 text-white px-1 py-1 rounded">
                        V2
                      </span>
                    </td>
                    <td className="py-5 px-2"> </td>
                    <td className="py-5 px-2">{pool.liquidity}</td>
                    <td className="py-5 px-2">{pool.volume24h}</td>
                    <td className="py-5 px-2">{pool.volume7d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex z-40 justify-center items-center">
          {/* <div>
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, poolData.length)} of {poolData.length}{" "}
            entries
          </div> */}
          <div className="flex space-x-2 ">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 bg-[#1a1a1a] z-20 cursor-pointer rounded-lg disabled:opacity-50"
            >
              <ChevronLeft className="text-[11px]" />
            </button>
            <div className="px-3 py-1 bg-[#1a1a1a] rounded-lg">
              <span className="text-[#50BEAF]">{currentPage}</span>/{totalPages}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-1 bg-[#1a1a1a] cursor-pointer z-20 rounded-lg disabled:opacity-50"
            >
              <ChevronRight className="text-[11px]" />
            </button>
          </div>
        </div>
      </div>
    </StargateLayout>
  );
}
