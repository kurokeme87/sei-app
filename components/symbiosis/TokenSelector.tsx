"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { Network } from "@/app/symbiosis/page";
import { Search, X } from "lucide-react";
import { BsStarFill } from "react-icons/bs";
import { moralis_networks, symbiosis_chains } from "@/data/networks";
import { shortenAddressSmall } from "@/app/utils";
import { config, MORALIS_API_KEY_2 } from "@/app/web3Config";
import { ITokens } from "@/data/networks";
import axios from "axios";
import { ITokenSelector } from "@/types/symbiosis";
import { ethereumTokens } from "@/data/symbiosis/ethereum";
import TokenList from "./TokenList";
import validate from "bitcoin-address-validation";
import { useBTCProvider } from "@particle-network/btc-connectkit";

const TokenSelector = ({
  label,
  onSelect,
  amount,
  fetching,
  isWithMax,
  setAmount,
  selectedNetwork,
  selectedToken,
  setSelectedNetwork,
  setSelectedToken,
  tradeType,
  setTradeType,
}: ITokenSelector) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTokens, setFilteredTokens] = useState<ITokens[]>([]);
  const { address, isConnected, addresses } = useAccount();
  const [tokenList, setTokenList] = useState<ITokens[]>(ethereumTokens);
  const [tokenPrice, setTokenPrice] = useState<any>("");
  const { accounts } = useBTCProvider();
  const [btcBalance, setBtcBalance] = useState<any>(0);

  useEffect(() => {
    const getBtcBalance = async () => {
      if (selectedToken?.name !== "Bitcoin" || accounts.length === 0) return;

      try {
        const response = await axios.get(
          `https://blockchain.info/balance?active=${accounts[0]}`
        );
        if (response.data) {
          // Extracting and formatting the information
          for (const address in response.data) {
            const { final_balance } = response.data[address];
            setBtcBalance((final_balance / 1e8).toFixed(8));
            // console.log(
            //   `- Final Balance: ${(final_balance / 1e8).toFixed(8)} BTC`
            // );
          }
          // console.log("btc response", response);
        } else {
          console.log("btc not found", response);
        }
      } catch (err) {}
    };

    getBtcBalance();
  }, [selectedToken]);

  const { data, refetch } = useBalance({
    ...(selectedNetwork?.id && { chainId: selectedNetwork?.id }),
    config,
    ...(selectedToken?.address && { token: selectedToken?.address }),
    address,
  });

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

  useEffect(() => {
    if (address && selectedNetwork?.id) {
      refetch();
    }
  }, [address, selectedNetwork, refetch]);

  useEffect(() => {
    if (selectedNetwork?.id && selectedToken) {
      const handleFetchTokenPrice = async () => {
        await axios
          .post(
            "https://api.symbiosis.finance/calculations/v1/token/price",
            [
              {
                address: selectedToken?.address,
                chain_id: selectedNetwork?.id,
              },
            ],
            {
              headers: {
                "x-account-id": address,
                "x-partner-id": "symbiosis-app",
              },
            }
          )
          .then((res) => {
            if (res.data) {
              if (res?.data[0]?.price) {
                setTokenPrice(+res?.data[0]?.price * +amount);
              } else {
                getTokenPriceCoinGecko();
              }
            }
          });
      };
      handleFetchTokenPrice();
    }
  }, [amount, selectedNetwork, selectedToken, address]);

  const getTokenPriceCoinGecko = async () => {
    try {
      await axios
        .get(
          `https://api.coingecko.com/api/v3/simple/token_price/${selectedNetwork?.network}?contract_addresses=${selectedToken?.address}&vs_currencies=usd`
        )
        .then((res) => {
          if (res.data) {
            setTokenPrice(+res?.data[selectedToken?.address]?.usd * +amount);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelection = (network: Network, token: any) => {
    setSelectedNetwork(network);
    setSelectedToken(token);
    setIsOpen(false);
    // onSelect(network, token);
  };

  const handleMax = () => {
    if (+data?.formatted > 0) {
      setAmount(Number(data?.formatted).toFixed(7));
    }
  };

  return (
    <div className="space-y-2 ">
      <div className="w-full flex justify-between items-center">
        <label className="text-[#888]">
          {label}: {selectedNetwork?.name || ""}
        </label>

        {selectedNetwork?.icon && address ? (
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

      <div className="bg-white shadow-md rounded-lg p-2 md:p-4 space-y-2 cursor-pointer">
        <div className="flex items-center gap-2">
          <div
            onClick={() => setIsOpen(true)}
            className="flex justify-start gap-2 px-2 py-1 items-center bg-[#CCCCCC] rounded-full hover:opacity-55"
          >
            {selectedToken ? (
              <div className="relative">
                <Image
                  src={selectedToken.logoURI}
                  width={26}
                  height={26}
                  alt={selectedToken.name}
                  className="w-[40px] h-[26px] sm:w-[40px] sm:h-[26px] rounded-full object-contain"
                />
                {selectedNetwork?.icon && (
                  <Image
                    src={selectedNetwork?.icon}
                    width={14}
                    height={14}
                    className="rounded-full absolute -top-1 -right-2 object-contain"
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
              width={11}
              height={11}
              alt="img"
            />
          </div>
          <input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setTradeType(tradeType);
            }}
            type="number"
            inputMode="decimal"
            placeholder={fetching ? "Fetching the best rates..." : "0.0"}
            className="bg-transparent w-full outline-none text-sm sm:text-base font-medium text-gray-800 font-faGrotesk"
          />

          {+tokenPrice > 0 ? (
            <p className="text-[#00000080] text-sm md:text-base">
              ${Number(tokenPrice).toFixed(2)}
            </p>
          ) : null}
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="text-sm text-[#CCCCCC] flex justify-start items-center gap-1">
          Balance:
          {+data?.formatted > 0 &&
          selectedNetwork?.id &&
          selectedToken?.name !== "Bitcoin" ? (
            <p className="text-gray-700">
              {Number(data?.formatted).toFixed(6)} {selectedToken?.symbol}
            </p>
          ) : btcBalance > 0 && selectedToken?.name === "Bitcoin" ? (
            btcBalance
          ) : (
            "(???)"
          )}
        </div>

        {isWithMax ? (
          <button
            onClick={handleMax}
            className="border rounded-md text-xs sm:text-sm px-1 border-gray-300"
          >
            MAX
          </button>
        ) : null}
      </div>

      {isOpen && (
        <div className="fixed px-4 inset-0 flex items-center justify-center z-50">
          <div className="bg-[#f3f3f3] rounded-2xl w-full max-w-xl h-[90vh] sm:max-h-[80vh] overflow-hidden modal-shadow">
            <div className="py-3 px-2 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-3xl font-mono">
                  {label === "From" ? "Transfer From" : "Transfer To"}
                </h2>
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

                <div className="flex-1 max-h-[500px]">
                  <div className="flex justify-between text-xs xl:text-sm text-[#0000004d] mb-2 font-mono">
                    <span>Token</span>
                    <span>Your Balance</span>
                  </div>
                  <div className="space-y-2 h-full overflow-y-auto">
                    {/* {tokenBalances.length > 0 ? (
                      <>
                        {tokenBalances
                          ?.filter((item) => item.logo)
                          .map((token, index) => (
                            <button
                              key={index}
                              className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-lg transition-colors border-t"
                              onClick={() => {
                                handleSelection(selectedNetwork!, {
                                  icon: token.logo,
                                  name: token.name,
                                  symbol: token.symbol,
                                  decimals: token.decimals,
                                  address: token.token_address,
                                });
                              }}
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
                                </div>
                                <span className="font-mono text-sm md:text-base font-medium">
                                  {token.symbol}
                                </span>
                              </div>
                              <div className="font-mono text-xs sm:text-sm flex justify-start items-center gap-2 font-semibold">
                                <span>
                                  {formatCurrency(token?.balance_formatted)}
                                </span>
                                <span>'''</span>
                              </div>
                            </button>
                          ))}
                      </>
                    ) : null} */}

                    <TokenList
                      setTokenPrice={setTokenPrice}
                      onSelect={handleSelection}
                      selectedNetwork={selectedNetwork}
                      tokens={filteredTokens}
                      callback={() => setAmount(0)}
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
