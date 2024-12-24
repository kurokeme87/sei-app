"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import coinbase_icon from "../../public/stargate/coinbase.svg";
import wallet_icon from "../../public/stargate/walletconnect.svg";
import { solana, tron } from "../../data/connectors";
import useSymbiosis from "@/hooks/useSymbiosis";

enum WalletGroup {
  EVM = "EVM",
  TRON = "TRON",
  TON = "TON",
  SOL = "SOL",
}

const SymbioWalletModal = () => {
  const walletGroup: string[] = ["EVM", "TRON", "TON", "SOL"];
  const [active, setActive] = useState<WalletGroup>(WalletGroup.EVM);
  const { isConnected } = useAccount();
  const dropdownRef = useRef(null);
  const { connectAsync, connectors } = useConnect();
  const { isConnectWalletOpen, setIsConnectWalletOpen } = useSymbiosis();

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsConnectWalletOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isConnectWalletOpen && isConnected) return <></>;

  return (
    <div className="">
      {/* Drawer */}

      <div
        className={`${
          isConnectWalletOpen ? "block" : "hidden"
        } bg-black opacity-50 absolute inset-0 z-50`}
      ></div>

      <div
        ref={dropdownRef}
        className={`${
          isConnectWalletOpen
            ? "translate-y-0 z-[999]"
            : "translate-y-[1000px] -z-[999] opacity-0"
        } w-screen max-w-[495px] fixed top-[10%] bottom-[20%] sm:left-[35%] ease-in-out transition-transform z-[10000] bg-white overflow-y-auto rounded-xl`}
      >
        <div className="w-full px-5 md:px-10 pt-8 pb-4 bg-white">
          <div className="w-full flex justify-between items-center">
            <p className="font-medium font-faGrotesk text-xl md:text-3xl">
              Connect a wallet
            </p>

            <button
              onClick={() => setIsConnectWalletOpen(false)}
              className="text-[#999] hover:text-white ease transition-all p-2 bg-[#ECECEC] rounded-xl"
            >
              <IoMdClose size={24} />
            </button>
          </div>
        </div>

        <div className="px-4 md:px-10">
          <div className="w-full grid grid-cols-4 gap-2 bg-[#F4F4F4] rounded-lg p-1">
            {walletGroup.map((item, index) => (
              <button
                onClick={() => setActive(item as WalletGroup)}
                key={index}
                className={`${active === item ? "bg-white" : "bg-[#F4F4F4]"}
                    w-full flex justify-center items-center gap-2 text-black hover:bg-white ease transition-colors rounded-lg px-3 py-2`}
              >
                <p className="text-[14px]">{item}</p>
              </button>
            ))}
          </div>
        </div>

        {active === "EVM" ? (
          <div className="px-5 py-3 grid w-full grid-cols-2 sm:grid-cols-3">
            {connectors
              .filter((itm) => itm.name !== "Injected")
              .map((item, index) => (
                <button
                  onClick={() => {
                    connectAsync({ connector: item });
                    setIsConnectWalletOpen(false);
                  }}
                  key={index}
                  className="w-full border border-gray-50 hover:bg-gray-100 flex flex-col justify-center items-center gap-3 font-roboto ease transition-colors rounded-lg px-3 py-4"
                >
                  <Image
                    src={
                      item.name.toLowerCase() === "walletconnect"
                        ? wallet_icon
                        : item.name.toLowerCase() === "coinbase wallet"
                        ? coinbase_icon
                        : item.icon
                    }
                    alt={item.name}
                    width={28}
                    height={28}
                    className="rounded-lg"
                  />
                  <p className="text-xs">{item.name}</p>
                </button>
              ))}
          </div>
        ) : null}

        {active === "SOL" ? (
          <div className="px-5 py-3 grid w-full grid-cols-2 sm:grid-cols-3">
            {connectors
              .filter(
                (item) =>
                  item.name.toLowerCase().includes("phantom") ||
                  item.name.toLowerCase().includes("solfare")
              )
              .map((item, index) => (
                <button
                  key={index}
                  className="w-full border border-gray-50 hover:bg-gray-100 flex flex-col justify-center items-center gap-3 font-roboto ease transition-colors rounded-lg px-3 py-4"
                >
                  <Image
                    src={
                      item.name.toLowerCase() === "walletconnect"
                        ? wallet_icon
                        : item.name.toLowerCase() === "coinbase wallet"
                        ? coinbase_icon
                        : item.icon
                    }
                    alt={item.name}
                    width={28}
                    height={28}
                    className="rounded-lg"
                  />
                  <p className="text-xs">{item.name}</p>
                </button>
              ))}
          </div>
        ) : null}

        {active === "TRON" ? (
          <div className="px-5 py-3 grid w-full grid-cols-2 sm:grid-cols-3">
            {connectors
              .filter(
                (item) =>
                  item.name.toLowerCase().includes("tron") ||
                  item.name.toLowerCase().includes("trust") ||
                  item.name.toLowerCase().includes("walletconnect") ||
                  item.name.toLowerCase().includes("okx") ||
                  item.name.toLowerCase().includes("bitget")
              )
              .map((item, index) => (
                <button
                  key={index}
                  className="w-full border border-gray-50 hover:bg-gray-100 flex flex-col justify-center items-center gap-3 font-roboto ease transition-colors rounded-lg px-3 py-4"
                >
                  <Image
                    src={
                      item.name.toLowerCase() === "walletconnect"
                        ? wallet_icon
                        : item.name.toLowerCase() === "coinbase wallet"
                        ? coinbase_icon
                        : item.icon
                    }
                    alt={item.name}
                    width={28}
                    height={28}
                    className="rounded-lg"
                  />
                  <p className="text-xs">{item.name}</p>
                </button>
              ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SymbioWalletModal;
