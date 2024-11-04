"use client";
import React, { useState } from "react";

import StargateLayout from "../layouts/stargateLayout";
import { ArrowUpDown, ChevronDown, Search, X } from "lucide-react";
import SeiConnectButton from "@/components/global/SeiConnectButton";

const tokens = [
  {
    symbol: "7007",
    name: "7007",
    network: "Ethereum",
    logo: "/stargate/ethereum-icon.png",
  },
  {
    symbol: "7007",
    name: "7007",
    network: "Arbitrum",
    logo: "/stargate/ethereum-icon.png",
  },
  {
    symbol: "ABOND",
    name: "ABOND",
    network: "Ethereum",
    logo: "/stargate/ethereum-icon.png",
  },
  {
    symbol: "ABOND",
    name: "ABOND",
    network: "BNB Chain",
    logo: "/stargate/ethereum-icon.png",
  },
  {
    symbol: "ABOND",
    name: "ABOND",
    network: "Polygon",
    logo: "/stargate/ethereum-icon.png",
  },
  {
    symbol: "anyUSDC",
    name: "anyUSDC",
    network: "Fantom",
    logo: "/stargate/ethereum-icon.png",
  },
  {
    symbol: "APE",
    name: "APE",
    network: "Ethereum",
    logo: "/stargate/ethereum-icon.png",
  },
  {
    symbol: "APE",
    name: "APE",
    network: "Arbitrum",
    logo: "/stargate/ethereum-icon.png",
  },
  {
    symbol: "APE",
    name: "APE",
    network: "Ape",
    logo: "/stargate/ethereum-icon.png",
  },
];

const networks = [
  { name: "Arbitrum", logo: "/stargate/ethereum-icon.png" },
  { name: "Base", logo: "/stargate/ethereum-icon.png" },
  { name: "Ethereum", logo: "/stargate/ethereum-icon.png" },
  { name: "Linea", logo: "/stargate/ethereum-icon.png" },
  { name: "Optimism", logo: "/stargate/ethereum-icon.png" },
  { name: "Ape", logo: "/stargate/ethereum-icon.png" },
  { name: "Astar", logo: "/stargate/ethereum-icon.png" },
  { name: "Astar zkEVM", logo: "/stargate/ethereum-icon.png" },
];

export default function Transfer() {
  //   const [showDetails, setShowDetails] = useState(false);
  const [currentView, setCurrentView] = useState("transfer");
  const [tokenSelectType, setTokenSelectType] = useState("");
  const [networkSelectType, setNetworkSelectType] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedFromToken, setSelectedFromToken] = useState(null);
  const [selectedToToken, setSelectedToToken] = useState(null);
  const [selectedFromNetwork, setSelectedFromNetwork] = useState(null);
  const [selectedToNetwork, setSelectedToNetwork] = useState(null);
  const [amount, setAmount] = useState("");
  const [gasOnDestination, setGasOnDestination] = useState("Medium");
  const [slippageTolerance, setSlippageTolerance] = useState(0.5);
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleTokenSelect = (token) => {
    if (tokenSelectType === "from") {
      setSelectedFromToken(token);
    } else {
      setSelectedToToken(token);
    }
    setCurrentView("transfer");
  };

  const handleNetworkSelect = (network) => {
    if (networkSelectType === "from") {
      setSelectedFromNetwork(network);
    } else {
      setSelectedToNetwork(network);
    }
    setCurrentView("transfer");
  };

  const renderTransferView = () => (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Transfer</h2>
          <div className="flex items-center gap-4">
            <img
              src="/stargate/download (36).svg"
              alt="Stargate Logo"
              className="w-5 h-5"
            />
            <img
              src="/stargate/download (35).svg"
              alt="Stargate Logo"
              className="w-5 h-5"
              onClick={() => setCurrentView("advancedSettings")}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 cursor-pointer relative border border-[#323232] rounded-lg bg-[#1a1a1a]">
            <div
              className="px-4 py-2 border-r border-[#323232]"
              onClick={() => {
                setCurrentView("tokenSelect");
                setTokenSelectType("from");
              }}
            >
              <p className="text-[12px] text-[#807d7d]">Token</p>
              <div className="flex items-center gap-1 pt-2">
                {selectedFromToken ? (
                  <>
                    <img
                      src={selectedFromToken.logo}
                      alt={selectedFromToken.name}
                      className="w-5 h-5 rounded-full"
                    />
                    <span>{selectedFromToken.symbol}</span>
                  </>
                ) : (
                  <>
                    <div className="rounded-full w-5 h-5 bg-[#363636]"></div>
                    <div className="flex text-[#807d7d] items-center gap-2">
                      Select
                      <ChevronDown className="text-white w-5" />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div
              className="px-4 py-2"
              onClick={() => {
                setCurrentView("networkSelect");
                setNetworkSelectType("from");
              }}
            >
              <p className="text-[12px] text-[#807d7d]">From</p>
              <div className="flex items-center gap-1 pt-2">
                {selectedFromNetwork ? (
                  <>
                    <img
                      src={selectedFromNetwork.logo}
                      alt={selectedFromNetwork.name}
                      className="w-5 h-5"
                    />
                    <span>{selectedFromNetwork.name}</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 bg-[#363636]"></div>
                    <div className="flex text-[#807d7d] items-center gap-2">
                      Select
                      <ChevronDown className="text-white w-5" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ArrowUpDown className="w-7 h-7" />
          </div>

          <div className="grid grid-cols-2 cursor-pointer relative border border-[#323232] rounded-lg bg-[#1a1a1a]">
            <div
              className="px-4 py-2 border-r border-[#323232]"
              onClick={() => {
                setCurrentView("tokenSelect");
                setTokenSelectType("to");
              }}
            >
              <p className="text-[12px] text-[#807d7d]">Token</p>
              <div className="flex items-center gap-1 pt-2">
                {selectedToToken ? (
                  <>
                    <img
                      src={selectedToToken.logo}
                      alt={selectedToToken.name}
                      className="w-5 h-5 rounded-full"
                    />
                    <span>{selectedToToken.symbol}</span>
                  </>
                ) : (
                  <>
                    <div className="rounded-full w-5 h-5 bg-[#363636]"></div>
                    <div className="flex text-[#807d7d] items-center gap-2">
                      Select
                      <ChevronDown className="text-white w-5" />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div
              className="px-4 py-2"
              onClick={() => {
                setCurrentView("networkSelect");
                setNetworkSelectType("to");
              }}
            >
              <p className="text-[12px] text-[#807d7d]">To</p>
              <div className="flex items-center gap-1 pt-2">
                {selectedToNetwork ? (
                  <>
                    <img
                      src={selectedToNetwork.logo}
                      alt={selectedToNetwork.name}
                      className="w-5 h-5"
                    />
                    <span>{selectedToNetwork.name}</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 bg-[#363636]"></div>
                    <div className="flex text-[#807d7d] items-center gap-2">
                      Select
                      <ChevronDown className="text-white w-5" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="relative border border-[#323232] flex items-center rounded-lg bg-[#1a1a1a] py-2">
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent focus:outline-none w-full px-4 py-2"
            />
            <div className="py-2 px-4 border-r text-right border-[#323232]">
              <p className="text-[11px] text-[#A6A6A6]">Balance</p>
              <p className="text-[11px] text-[#A6A6A6]">-</p>
            </div>
            <div className="text-sm cursor-pointer text-[#57D1C0] underline px-4">
              MAX
            </div>
          </div>

          <div className="text-[11px] text-[#A6A6A6]">Est. Value: -</div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1a1a1a] rounded-md p-2">
              <div className="flex justify-between">
                <div className="text-[11px] text-[#A6A6A6]">Gas Cost</div>
                <div className="text-[11px] flex gap-1 items-center text-[#A6A6A6]">
                  Fast
                  <img
                    src="/stargate/download (48).svg"
                    alt="Fast"
                    className="w-4 h-4"
                  />
                </div>
              </div>
              <div>-</div>
              <div className="text-[11px] mt-5 text-[#A6A6A6]">
                Est. Time: -
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-md p-2">
              <div className="flex justify-between">
                <div className="text-[11px] text-[#A6A6A6]">Gas Cost</div>
                <div className="text-[11px] flex gap-1 items-center text-[#A6A6A6]">
                  Economy
                  <img
                    src="/stargate/download (46).svg"
                    alt="Economy"
                    className="w-4 h-4"
                  />
                </div>
              </div>
              <div>-</div>
              <div className="text-[11px] mt-5 text-[#A6A6A6]">
                Est. Time: -
              </div>
            </div>
          </div>

          <div className="text-white pt-[56px]">
            <div
              onClick={() => setShowDetails(!showDetails)}
              className="pt-5 border-t border-[#545252] cursor-pointer flex items-center justify-between text-sm"
            >
              <div>You will receive</div>
              <div className="flex items-center gap-1">
                - -
                <ChevronDown
                  className={`${
                    showDetails && "rotate-180"
                  } text-[#57D1C0] w-4`}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <div className="mb-1">Gas on destination</div>
              <div>-</div>
            </div>
            {showDetails && (
              <div>
                <div className="flex items-center justify-between text-[11px]">
                  <div className="mb-1">Slippage</div>
                  <div>{slippageTolerance}%</div>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <div className="mb-1">Fee</div>
                  <div>-</div>
                </div>
              </div>
            )}
          </div>
          {/* 
          <SeiConnectButton
            connect={
              <button className="w-full bg-white text-black px-6 py-4 rounded-xl">
                Connect Wallet
              </button>
            }
          /> */}
        </div>
      </div>
    </>
  );

  const renderTokenSelectView = () => (
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
          <div className="bg-[#232323] px-4 flex items-center gap-2 rounded-lg border border-[#323232] mb-4">
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
      <div className="max-h-[550px] p-6 overflow-y-auto">
        <div className="w-full border-b mb-1 pb-1 border-[#646464] text-[11px] text-[#646464]">
          All networks
        </div>
        {tokens.map((token, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 hover:bg-[#1a1a1a] cursor-pointer"
            onClick={() => handleTokenSelect(token)}
          >
            <div className="flex items-center">
              <img
                src={token.logo}
                alt={token.name}
                className="w-8 h-8 mr-2 rounded-full"
              />
              <div>
                <div>{token.symbol}</div>
                <div className="text-sm text-[#807d7d]">{token.network}</div>
              </div>
            </div>
            <div>-</div>
          </div>
        ))}
      </div>
    </>
  );

  const renderNetworkSelectView = () => (
    <>
      <div className="rounded-tl-lg rounded-tr-lg bg-[#1A1A1A]">
        <div className="pt-6 px-6 pb-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Select Network</h2>
            <X
              className="cursor-pointer"
              onClick={() => setCurrentView("transfer")}
            />
          </div>
          <div className="bg-[#232323] px-4 flex items-center gap-2 rounded-lg border border-[#323232] mb-4">
            <Search className="text-white text-[11px]" />
            <input
              type="text"
              placeholder="Search by name or token symbol"
              className="w-full bg-transparent text-sm rounded-lg px-2 py-3 "
            />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="w-full border-b mb-1 pb-1 border-[#646464] text-[11px] text-[#646464]">
          Popular Networks
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {networks.slice(0, 6).map((network, index) => (
            <div
              key={index}
              className="flex items-center  hover:bg-[#1a1a1a] 
            cursor-pointer"
              onClick={() => handleNetworkSelect(network)}
            >
              <img
                src={network.logo}
                alt={network.name}
                className="w-8 h-8 mr-2"
              />
              <div>{network.name}</div>
            </div>
          ))}
        </div>
        <div className="w-full border-b mb-1 pb-1 border-[#646464] text-[11px] text-[#646464]">
          Network Name
        </div>
        <div className="max-h-[200px] overflow-y-auto">
          {networks.map((network, index) => (
            <div
              key={index}
              className="flex items-center p-2 hover:bg-[#1a1a1a] cursor-pointer"
              onClick={() => handleNetworkSelect(network)}
            >
              <img
                src={network.logo}
                alt={network.name}
                className="w-8 h-8 mr-2"
              />
              <div>{network.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderAdvancedSettingsView = () => (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Advanced Settings</h2>
          <X
            className="cursor-pointer"
            onClick={() => setCurrentView("transfer")}
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center border-b border-[#323232]">
            <h3 className="text-md text-[#807d7d] font-normal mb-2">
              Gas on destination chain
            </h3>
            <div className="text-[#46AC9D] h-5 w-5 flex items-center justify-center rounded-full bg-[#334442]/30">
              -
            </div>
          </div>
          <div className="flex justify-between gap-4 pt-4">
            <button
              className={`px-4 py-2 rounded-lg w-full  ${
                gasOnDestination === "None"
                  ? "bg-transparent border border-[#46AC9D]"
                  : "bg-[#1a1a1a]"
              }`}
              onClick={() => setGasOnDestination("None")}
            >
              None
            </button>
            <button
              className={`px-4 py-2 rounded-lg w-full  ${
                gasOnDestination === "Medium"
                  ? "bg-transparent border border-[#46AC9D]"
                  : "bg-[#1a1a1a]"
              }`}
              onClick={() => setGasOnDestination("Medium")}
            >
              Medium
            </button>
            <button
              className={`px-4 py-2 rounded-lg w-full ${
                gasOnDestination === "Max"
                  ? "bg-transparent border border-[#46AC9D]"
                  : "bg-[#1a1a1a]"
              }`}
              onClick={() => setGasOnDestination("Max")}
            >
              Max
            </button>
          </div>
          <div className="relative mt-4 border border-[#323232] flex items-center rounded-lg bg-[#1a1a1a] ">
            <div className="flex items-center px-4 w-full">
              <div className="rounded-full w-5 h-5 bg-[#363636]"></div>
              <input
                type="number"
                //   placeholder="0"
                //   value={amount}
                //   onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent focus:outline-none w-full px-4 py-2"
              />
            </div>

            <div className="text-sm cursor-pointer text-[#57D1C0] underline px-4">
              MAX
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex justify-between items-center border-b border-[#323232] pb-2">
            <h3 className="text-md text-[#807d7d] font-normal mb-2">
              Slippage tolerance
            </h3>
            <div className="text-[#46AC9D] text-[11px] py-1 px-3 flex items-center justify-center rounded-full bg-[#334442]/30">
              {slippageTolerance > 0.5
                ? slippageTolerance + ".00" + "%"
                : slippageTolerance + "%"}
            </div>
          </div>
          <div className="flex justify-between gap-4 my-4">
            <button
              className={`px-4 py-2 rounded-lg w-full ${
                slippageTolerance === 0.5
                  ? "bg-transparent border border-[#46AC9D]"
                  : "bg-[#1a1a1a]"
              }`}
              onClick={() => setSlippageTolerance(0.5)}
            >
              0.5%
            </button>
            <button
              className={`px-4 py-2 rounded-lg w-full ${
                slippageTolerance === 1
                  ? "bg-transparent border border-[#46AC9D]"
                  : "bg-[#1a1a1a]"
              }`}
              onClick={() => setSlippageTolerance(1.0)}
            >
              1.00%
            </button>
            <button
              className={`px-4 py-2 rounded-lg w-full ${
                slippageTolerance === 5
                  ? "bg-transparent border border-[#46AC9D]"
                  : "bg-[#1a1a1a]"
              }`}
              onClick={() => setSlippageTolerance(5.0)}
            >
              5.00%
            </button>
          </div>
          <div className="relative mt-4 border border-[#323232] flex items-center rounded-lg bg-[#1a1a1a] ">
            <div className="flex items-center px-4 w-full">
              <input
                type="number"
                //   placeholder="0"
                value={slippageTolerance}
                onChange={(e) =>
                  setSlippageTolerance(parseFloat(e.target.value))
                }
                className="bg-transparent focus:outline-none w-full  py-2"
              />
            </div>

            <div className="text-sm cursor-pointer  text-gray-500 px-4">%</div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <StargateLayout>
      <div className="max-w-4xl flex items-center justify-center mx-auto overflow-auto z-50 ">
        <div className="flex flex-col-reverse grid-cols-1 md:flex-row md:px-0 px-4 flex-start justify-start gap-4">
          <div className="bg-[rgb(35,35,35)] z-10 h-[180px] md:w-[280px] sm:w-[400px] rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1 rounded-md border border-gray-700">
                <img
                  src="/stargate/types.svg"
                  alt="Stargate Logo"
                  className="w-6 h-6 "
                />
              </div>

              <div>
                <h2 className="text-[13px]  font-bold ">Transfer Types</h2>
                <h2 className=" text-[#4DB4A6] text-[10px] font-bold ">
                  NEW UPDATE
                </h2>
              </div>
            </div>
            <p className="text-gray-400 text-[12px] mb-4">
              Choose Fast to move assets quickly or Economy to move assets
              cheaply.
            </p>
            <button className="bg-transparent border text-[14px] border-white text-white px-6 py-2 rounded-lg w-full">
              Learn more
            </button>
          </div>

          <div className="bg-[#232323] sm:w-[400px] h-[730px] rounded-lg  z-10 text-white">
            {currentView === "transfer" && renderTransferView()}
            {currentView === "tokenSelect" && renderTokenSelectView()}
            {currentView === "networkSelect" && renderNetworkSelectView()}
            {currentView === "advancedSettings" && renderAdvancedSettingsView()}
          </div>
        </div>
      </div>
    </StargateLayout>
  );
}
