"use client";

import { formatCurrency } from "@/app/utils";
import { TSwapQuote } from "@/types/symbiosis";
import { ChevronDown, Settings } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface IQuoteCard {
  data: TSwapQuote;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}

const QuoteCard = ({ data, setShowSettings }: IQuoteCard) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [divHeight, setDivHeight] = useState<string>("90px");

  const rawAmount = BigInt(data?.fee.amount || 0); // Use BigInt to handle large numbers
  const decimals = data?.fee.decimals;

  const formatBigNumber = (
    amount: string,
    decimals: number
  ): number | string => {
    const rawAmount = BigInt(amount || 0); // Use BigInt to handle large numbers
    const result = Number(rawAmount) / Math.pow(10, decimals) || "0";
    return Number(result).toFixed(2);
  };

  useEffect(() => {
    if (divRef.current) {
      if (isExpanded) {
        setDivHeight(`${divRef.current.scrollHeight}px`); // Set to full content height
      } else {
        setDivHeight("90px"); // Collapse to 0 height
      }
    }
  }, [isExpanded]);

  // Convert raw amount to human-readable format
  const feeReadableAmount = Number(rawAmount) / Math.pow(10, decimals);

  if (!data) return;
  return (
    <div className="w-full">
      <button
        className="w-full flex justify-between items-center gap-2 text-gray-600 pb-2 border-b"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <p>Details</p>
        <div className="flex justify-start items-center gap-1 flex-nowrap">
          <p>{isExpanded ? "Hide" : "Show more"}</p>
          <ChevronDown className="px-1 bg-gray-100 text-gray-400 rounded-lg" />
        </div>
      </button>

      <div
        ref={divRef}
        style={{
          maxHeight: divHeight,
        }}
        className="w-full pt-3 flex flex-col overflow-hidden transition-all duration-300 ease-linear"
      >
        <div className="flex justify-between items-center gap-2 w-full text-sm">
          <p className="text-gray-600">
            Price Impact:<sup className="text-[10px]">(?)</sup>
          </p>
          <p className="text-black font-medium text-[13px]">
            {data?.priceImpact}
          </p>
        </div>

        <div className="flex justify-between items-center gap-2 w-full mt-4">
          <p className="text-gray-600 text-sm">
            Fee:<sup className="text-[10px]">(?)</sup>
          </p>

          <div className="flex flex-col justify-end items-end mt-3 text-[13px]">
            <p className="text-black font-medium">
              {formatCurrency(feeReadableAmount)}%
            </p>
            <p className="text-[13px] flex justify-start items-center gap-1">
              0.00015 ETH on Ethereum chain
              <Image
                src="https://symbiosis-static.net/a5b7a63b84512a4867bb.png"
                height={14}
                width={14}
                alt="symbsosis logo"
                className="rounded-full"
              />
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2 w-full text-sm mt-8">
          <p className="text-gray-600">
            Price:<sup className="text-[10px]">(?)</sup>
          </p>

          <div className="flex flex-col justify-end items-end mt-3 text-[13px]">
            <p className="flex justify-start items-center gap-1">
              {formatBigNumber(
                data?.fee[0]?.value?.amount,
                data?.fees[0]?.value?.decimals
              )}{" "}
              <Image
                src={data?.fee?.icon}
                height={14}
                width={14}
                alt="symbsosis logo"
                className="rounded-full"
              />
              {data?.fee?.symbol}
              <span className="text-gray-400 font-medium">Per</span>
              <Image
                src={data?.tokenAmountOutMin.icon}
                height={14}
                width={14}
                alt="symbsosis logo"
                className="rounded-full"
              />
              <p>{data?.tokenAmountOutMin.symbol}</p>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2 w-full mt-5">
          <p className="text-gray-600 text-sm">
            Slippage Tolerance:<sup className="text-[10px]">(?)</sup>
          </p>
          <p className="text-black font-medium text-[13px]">2%</p>
        </div>

        <div className="flex justify-between items-center gap-2 w-full mt-5">
          <p className="text-gray-600 text-sm">
            Minimum Received:<sup className="text-[10px]">(?)</sup>
          </p>
          <p className="text-black font-medium text-[13px] flex justify-start items-center gap-1">
            <div className="bg-[#f1f1f1] p-1 rounded-full w-fit">
              <Settings
                className="w-4 h-4 cursor-pointer text-black transition-colors"
                onClick={() => setShowSettings(true)}
              />
            </div>
            {formatBigNumber(
              data?.tokenAmountOutMin.amount,
              data?.tokenAmountOutMin.decimals
            )}{" "}
            {data?.tokenAmountOutMin.symbol}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
