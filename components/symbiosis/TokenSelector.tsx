"use client";

import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Balance from "../global/Balance";
import { useAccount, useBalance } from "wagmi";
import { Network, Token } from "@/app/symbiosis/page";
import { Search, X } from "lucide-react";
import { BsStarFill } from "react-icons/bs";
import { moralis_networks, symbiosis_chains } from "@/data/networks";
import { formatCurrency, shortenAddressSmall } from "@/app/utils";
import { config, MORALIS_API_KEY_2 } from "@/app/web3Config";
import { ITokens } from "@/data/networks";

// types
import { TokenDetails } from "@/types/symbiosis";
import { ethereumTokens } from "@/data/symbiosis/ethereum";
import TokenList from "./TokenList";

type ITokenSelector = {
  isWithMax?: boolean;
  label?: string;
  amount?: string | number;
  onSelect?: (network: Network, token: Token) => void;
  selectedNetwork?: any;
  setAmount?: Dispatch<SetStateAction<string | number>>;
  setSelectedNetwork?: Dispatch<SetStateAction<any>>;
  selectedToken?: any;
  setSelectedToken?: Dispatch<SetStateAction<any>>;
};

const TokenSelector = ({
  label,
  onSelect,
  amount,
  isWithMax,
  setAmount,
  selectedNetwork,
  selectedToken,
  setSelectedNetwork,
  setSelectedToken,
}: ITokenSelector) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [tokens, setTokens] = useState<Token[]>([]);
  const [tokenBalances, setTokenBalances] = useState<TokenDetails[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<ITokens[]>([]);
  const { address, chainId, isConnected } = useAccount();
  const [tokenList, setTokenList] = useState<ITokens[]>(ethereumTokens);

  const { data, refetch } = useBalance({
    ...(selectedNetwork?.id && { chainId: selectedNetwork?.id }),
    config,
    ...(selectedToken?.address && { token: selectedToken?.address }),
    address,
  });

  // useEffect(() => {
  //   if (!isOpen) return;

  //   const getOtherTokens = async () => {
  //     try {
  //       const apiKey = "EK-g5Pzu-jCzu51S-5sNww";
  //       const response = await axios.get(
  //         `https://api.ethplorer.io/getTopTokens?apiKey=${apiKey}`
  //       );

  //       const tokenData = response.data.tokens || [];
  //       const mappedTokens = tokenData
  //         .filter((token: any) => token.image) // Filter tokens that have an image
  //         .filter((item: any) => item.name.includes(selectedNetwork.name))
  //         .map((token: any) => ({
  //           name: token.name,
  //           address: token.address,
  //           symbol: token.symbol,
  //           image: `https://ethplorer.io${token.image}`,
  //           balance: "",
  //         }));
  //       // console.log(tokenData, "token data");

  //       setTokens(mappedTokens);
  //       setFilteredTokens(mappedTokens);
  //     } catch (err) {
  //       console.error("Error fetching tokens:", err);
  //     }
  //   };

  //   getOtherTokens();
  // }, [isOpen]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = tokenList.filter(
        (token) =>
          token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTokens(filtered);
    } else {
      setFilteredTokens(tokenList);
    }
  }, [searchTerm, selectedNetwork]);

  const handleSelection = (network: Network, token: any) => {
    setSelectedNetwork(network);
    setSelectedToken(token);
    setIsOpen(false);
    onSelect(network, token);
  };

  // useEffect(() => {
  //   if (!address && !isOpen) return;

  //   async function fetchAllBalances() {
  //     const results = await Promise.all(
  //       moralis_networks.map(async (chain) => {
  //         const response = await axios.get(
  //           `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens`,
  //           {
  //             headers: {
  //               "X-API-Key": MORALIS_API_KEY_2,
  //             },
  //             params: {
  //               chain,
  //             },
  //           }
  //         );
  //         return { chain, tokens: response?.data?.result };
  //       })
  //     );
  //     const flattenRes = results.flatMap((item) => item.tokens);
  //     setTokenBalances(flattenRes);
  //   }

  //   fetchAllBalances();
  // }, [address]);

  const handleMax = () => {
    if (+data?.formatted > 0) {
      setAmount(Number(data?.formatted).toFixed(7));
    }
  };

  useEffect(() => {
    if (address && selectedNetwork?.id) {
      refetch();
    }
  }, [address, selectedNetwork, refetch]);

  return (
    <div className="space-y-2 ">
      <div className="w-full flex justify-between items-center">
        <label className="text-[#888]">
          {label}: {selectedNetwork?.name || ""}
        </label>

        {selectedNetwork?.icon ? (
          <div className="w-max bg-white rounded-3xl px-1 flex justify-start items-center gap-1">
            <Image
              src={selectedNetwork?.icon}
              width={20}
              height={20}
              className="rounded-full"
              alt="img"
            />

            <p className="font-medium text-black">
              {isConnected && address ? (
                <p>{shortenAddressSmall(address)}</p>
              ) : null}
            </p>
          </div>
        ) : null}
      </div>

      <div className="bg-[#F3F3F3] shadow-md rounded-lg p-2 md:p-4 space-y-2 cursor-pointer">
        <div className="flex items-center gap-2">
          <div
            onClick={() => setIsOpen(true)}
            className="flex gap-2 px-2 py-1 items-center bg-[#CCCCCC] rounded-full"
          >
            {selectedToken ? (
              <div className="relative">
                <Image
                  src={selectedToken.icon}
                  width={30}
                  height={30}
                  alt={selectedToken.name}
                />
                {selectedToken?.icon && (
                  <Image
                    src={selectedToken?.icon}
                    width={15}
                    height={15}
                    className="rounded-full absolute -top-1 -right-2"
                    alt="img"
                  />
                )}
              </div>
            ) : (
              <Image
                src="/symbiosis/download (1).svg"
                width={20}
                height={20}
                alt="img"
              />
            )}
            <Image
              src="/symbiosis/download (10).svg"
              width={15}
              height={15}
              alt="img"
            />
          </div>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="text"
            placeholder="0.0"
            className="bg-transparent w-full outline-none font-mono"
          />
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="text-sm text-[#CCCCCC] flex justify-start items-center gap-1">
          Balance:
          {/* <SymbiosisBalance
            token={selectedToken?.address}
            chainId={selectedNetwork?.id}
          /> */}
          <p>
            {+data?.formatted > 0
              ? Number(data?.formatted).toFixed(6)
              : "(???)"}
          </p>
        </div>

        {isWithMax ? (
          <button
            onClick={handleMax}
            className="border rounded-lg text-xs sm:text-sm px-1 border-gray-300"
          >
            MAX
          </button>
        ) : null}
      </div>

      {isOpen && (
        <div className="fixed px-4 inset-0 flex items-center justify-center z-50">
          <div className="bg-[#f3f3f3] rounded-2xl w-full max-w-xl h-screen sm:max-h-[80vh] overflow-hidden modal-shadow">
            <div className="py-3 px-2 sm:p-6">
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

              <div className="flex items-stretch justify-stretch gap-2 mb-3 sm:mb-6">
                <div className="flex-1 relative bg-white w-full rounded-xl">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by symbol or address"
                    className="w-full pl-10 pr-4 py-3 m:py-4 bg-transparent rounded-lg outline-none font-mono text-black text-xs sm:text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="px-4 rounded-lg bg-[#ECECEC]">
                  <BsStarFill className="sm:w-5 sm:h-5 text-black" />
                </button>
              </div>

              <div className="flex gap-1 sm:gap-6">
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
                            : "hover:bg-white text-black"
                        } flex items-center gap-2 w-full px-2 py-1 rounded-lg transition-colors`}
                        onClick={() => {
                          setSelectedNetwork(network);
                          setTokenList(network.tokens);
                        }}
                      >
                        <Image
                          src={network.icon}
                          width={18}
                          height={18}
                          alt={network.name}
                          className="rounded-full w-[14px] h-[14px] md:w-[18px] md:h-[18px]"
                        />
                        <span className="font-mono text-xs sm:text-sm text-left w-full whitespace-nowrap">
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
                  <div className="space-y-2 h-full">
                    {tokenBalances.length > 0 ? (
                      <>
                        {tokenBalances
                          ?.filter((item) => item.logo)
                          .map((token, index) => (
                            <button
                              key={index}
                              className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-lg transition-colors border-t"
                              onClick={() =>
                                handleSelection(selectedNetwork!, {
                                  icon: token.logo,
                                  name: token.name,
                                  symbol: token.symbol,
                                  decimals: token.decimals,
                                  address: token.token_address,
                                })
                              }
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <Image
                                    src={token?.logo}
                                    width={30}
                                    height={30}
                                    alt={token.symbol}
                                    className="rounded-full w-[20px] h-[20px] md:w-[30px] md:h-[30px]"
                                    loading="lazy"
                                  />
                                  {/* {selectedNetwork?.icon ? ( */}
                                  <Image
                                    src={selectedNetwork?.icon || token?.logo}
                                    width={17}
                                    height={17}
                                    alt={selectedNetwork?.name}
                                    className="rounded-full absolute top-0 right-0 border"
                                  />
                                  {/* ) : null} */}
                                </div>
                                <span className="font-mono text-sm md:text-base font-medium">
                                  {token.symbol}
                                </span>
                              </div>
                              <div className="font-mono text-xs sm:text-sm flex justify-start items-center gap-2 font-semibold">
                                {/* {token.balance} */}
                                <span>
                                  {formatCurrency(token?.balance_formatted)}
                                </span>
                                <span>'''</span>
                              </div>
                            </button>
                          ))}
                      </>
                    ) : null}

                    {/* {?.map((token, index) => ( */}
                    <TokenList
                      onSelect={handleSelection}
                      selectedNetwork={setSelectedNetwork}
                      tokens={filteredTokens}
                    />
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

export default TokenSelector;
