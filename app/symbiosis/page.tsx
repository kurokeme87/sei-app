"use client";

import { useState } from "react";
import { ExternalLink, X } from "lucide-react";
import Image from "next/image";
import SymbiosisLayout from "../layouts/symbiosisLayout";
import { useAccount } from "wagmi";
import { shortenAddressSmall } from "../utils";
import SelectNetwork from "@/components/symbiosis/SelectNetwork.dropdown";
import useSymbiosis from "@/hooks/useSymbiosis";
import AccountDropdown from "@/components/symbiosis/AccountDropdown";
import ZapCrossChain from "@/components/symbiosis/ZapCrossChain";
import SymbiosisSwap from "@/components/symbiosis/SymbiosisSwap";
import SymbiosisPools from "@/components/symbiosis/SymbiosisPools";
import "/public/symbiosis/cygnito-font.css";

export interface Token {
  name: string;
  address: string;
  symbol: string;
  logoURI: string;
  balance?: string;
  decimals?: number;
}
export interface Network {
  name: string;
  icon: string;
  isNew?: boolean;
  tokens?: Token[];
  id?: number;
  decimals?: number;
  address: string;
}

export type TradeType = "EXACT_INPUT" | "EXACT_OUTPUT";

export default function Page() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"swap" | "pools" | "zap">("swap");
  const [showSettings, setShowSettings] = useState(false);
  const [slippage, setSlippage] = useState("0.5");
  const { setIsConnectWalletOpen } = useSymbiosis();

  return (
    <SymbiosisLayout>
      <div className="min-h-screen h-full bg-[#F9F9F9] text-black">
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
                  <span className="font-mono flex sm:text-lg font-medium">
                    Symbiosis <span className="md:block hidden">/ App</span>
                  </span>
                  <span className="text-sm bg-[#fff] rounded-2xl p-1 text-black ">
                    v2
                  </span>
                </div>
                <div className="md:flex hidden items-center gap-8 text-base sm:text-lg">
                  <a
                    href="#"
                    className="hover:text-gray-300 font-medium transition-colors"
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
                    className="flex items-center gap-1 bg-[#76FB6D] font-medium p-2 rounded-xl text-[#000] hover:bg-[#5fd656] transition-colors"
                  >
                    Stake SIS
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                {isConnected ? (
                  <ConnectedButtonsGroup />
                ) : (
                  <button
                    onClick={() => setIsConnectWalletOpen(true)}
                    className="bg-black text-white text-sm md:px-5 p-2 md:py-3.5 rounded-xl hover:bg-gray-900 transition-colors flex gap-1.5 items-center"
                  >
                    Connect <span className="sm:block hidden">wallet</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-[610px] mx-auto p-4">
          <div className="rounded-2xl sm:p-6">
            {/* Tabs */}
            <div className="flex rounded-2xl bg-[#F1F1F1] py-1.5 px-1 mb-6 text-black">
              {(["swap", "pools", "zap"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-2xl text-center capitalize transition-colors font-sans font-medium ${
                    activeTab === tab ? "bg-white" : "hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "swap" && <SymbiosisSwap />}
            {activeTab === "pools" && <SymbiosisPools />}
            {activeTab === "zap" && <ZapCrossChain />}
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
