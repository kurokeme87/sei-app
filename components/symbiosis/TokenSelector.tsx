"use client";

import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Balance from "../global/Balance";
import { useAccount, useBalance } from "wagmi";
import { Network, Token } from "@/app/symbiosis/page";
import { Search, X } from "lucide-react";
import { BsStarFill } from "react-icons/bs";
import { symbiosis_chains, symbiosis_tokens } from "@/data/networks";
import { shortenAddressSmall } from "@/app/utils";
import { config } from "@/app/web3Config";

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

type ITokens = {
  symbol: string;
  address: string;
  icon: string;
  chainId: number;
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
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<ITokens[]>([]);
  const { address, chainId, isConnected } = useAccount();

  const { data } = useBalance({
    chainId: selectedNetwork?.id,
    config,
    ...(selectedToken?.address && { token: selectedToken?.address }),
    address,
  });

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
        // console.log(tokenData, "token data");

        setTokens(mappedTokens);
        setFilteredTokens(mappedTokens);
      } catch (err) {
        console.error("Error fetching tokens:", err);
      }
    };

    getOtherTokens();
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = symbiosis_tokens.filter(
        (token) =>
          token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTokens(filtered);
    } else {
      setFilteredTokens(symbiosis_tokens);
    }
  }, [searchTerm, selectedNetwork]);

  const handleSelection = (network: Network, token: any) => {
    setSelectedNetwork(network);
    setSelectedToken(token);
    setIsOpen(false);
    onSelect(network, token);
  };

  const handleMax = () => {
    if (+data?.formatted > 0) {
      setAmount(Number(data?.formatted).toFixed(7));
    }
  };

  console.log(selectedNetwork, "selectedNetwork");
  console.log(selectedToken, "selectedToken");
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
      <div className="bg-[#F3F3F3] shadow-md rounded-lg p-4 space-y-2 cursor-pointer">
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
            {+data?.formatted > 0 && selectedNetwork?.id
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
                            ? "bg-black text-white "
                            : "hover:bg-white text-black"
                        } flex items-center gap-2 w-full px-2 py-1 rounded-lg transition-colors`}
                        onClick={() => setSelectedNetwork(network)}
                      >
                        <Image
                          src={network.icon}
                          width={18}
                          height={18}
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

                <div className="flex-1 overflow-y-auto max-h-[500px] pb-10">
                  <div className="flex justify-between text-xs xl:text-sm text-[#0000004d] mb-2 font-mono">
                    <span>Token</span>
                    <span>Your Balance</span>
                  </div>
                  <div className="space-y-2 h-full">
                    {filteredTokens
                      .filter((item) =>
                        selectedNetwork?.id
                          ? item.chainId === selectedNetwork?.id
                          : item
                      )
                      .map((token, index) => (
                        <button
                          key={index}
                          className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-lg transition-colors border-t"
                          onClick={() =>
                            handleSelection(selectedNetwork!, token)
                          }
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Image
                                src={token.icon}
                                width={30}
                                height={30}
                                alt={token.symbol}
                                className="rounded-full"
                                loading="lazy"
                              />
                              {/* {selectedNetwork?.icon ? ( */}
                              <Image
                                src={selectedNetwork?.icon || token?.icon}
                                width={17}
                                height={17}
                                alt={selectedNetwork?.name || token?.address}
                                className="rounded-full absolute top-0 right-0 border"
                              />
                              {/* ) : null} */}
                            </div>
                            <span className="font-mono text-sm md:text-base font-medium">
                              {token.symbol}
                            </span>
                          </div>
                          <span className="font-mono text-sm flex justify-start items-center gap-2">
                            {/* {token.balance} */}
                            <Balance
                              chainId={selectedNetwork?.id}
                              token={token?.address}
                            />
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

export default TokenSelector;
