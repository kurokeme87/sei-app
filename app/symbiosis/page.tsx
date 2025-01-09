"use client";

import { useEffect, useState } from "react";
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
import { useBTCProvider } from "@particle-network/btc-connectkit";
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
  network?: string;
}

export type TradeType = "EXACT_INPUT" | "EXACT_OUTPUT";

export default function Page() {
  const { isConnected, address } = useAccount();
  const [activeTab, setActiveTab] = useState<"swap" | "pools" | "zap">("swap");
  const { setIsConnectWalletOpen } = useSymbiosis();
  const { accounts } = useBTCProvider();
  const [tronAddress, setTronAddress] = useState<string | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.tronWeb.defaultAddress.base58 &&
      !tronAddress
    ) {
      setTronAddress(window.tronWeb.defaultAddress.base58);
    }
  }, []);

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
                    Symbiosis <span className="lg:block hidden">/ App</span>
                  </span>
                  <span className="text-sm bg-[#fff] rounded-2xl p-1 text-black ">
                    v2
                  </span>
                </div>
                <div className="lg:flex hidden items-center gap-8 text-base sm:text-lg">
                  <a
                    href="/symbiosis"
                    className="font-medium transition-colors"
                  >
                    Swap
                  </a>
                  <a
                    href="/symbiosis/transactions"
                    className="hover:text-gray-800 text-gray-500 transition-colors"
                  >
                    Explorer
                  </a>
                  <a
                    target="_blank"
                    href="https://rewards.symbiosis.finance/vesis"
                    className="flex items-center gap-1 bg-[#76FB6D] font-medium p-2 rounded-2xl text-[#000] hover:scale-110 ease duration-500 transition-all"
                  >
                    Stake SIS
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                {isConnected || accounts.length > 0 || tronAddress ? (
                  <ConnectedButtonsGroup
                    address={address || tronAddress || accounts[0]}
                  />
                ) : (
                  <button
                    onClick={() => setIsConnectWalletOpen(true)}
                    className="bg-black text-white text-sm lg:px-5 p-2 md:py-3.5 rounded-xl hover:bg-gray-900 transition-colors flex gap-1.5 items-center"
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
      </div>
    </SymbiosisLayout>
  );
}

const ConnectedButtonsGroup = ({ address }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { accounts } = useBTCProvider();

  return (
    <div className="flex justify-start items-center gap-2 flex-nowrap whitespace-nowrap">
      <SelectNetwork />
      <button
        onClick={() => setOpen(!open)}
        className="rounded-xl text-white bg-black px-4 py-3 font-medium"
      >
        {address
          ? shortenAddressSmall(address)
          : accounts.length > 0
          ? shortenAddressSmall(accounts[0])
          : ""}
      </button>
      <AccountDropdown onClose={() => setOpen(false)} open={open} />
    </div>
  );
};
