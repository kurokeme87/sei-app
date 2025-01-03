"use client";

import { formatCurrency, shortenAddressSmall } from "@/app/utils";
import Image from "next/image";
import { useAccount, useBalance } from "wagmi";

// icon imports
import { IoCopy } from "react-icons/io5";
import { GoLinkExternal } from "react-icons/go";
import { TbPlugConnected } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import useSymbiosis from "@/hooks/useSymbiosis";
import { symbiosis_chains } from "@/data/networks";
import { config } from "@/app/web3Config";
import { disconnect } from "@wagmi/core";
import {
  useBTCProvider,
  useConnectModal,
} from "@particle-network/btc-connectkit";
import axios from "axios";

const AccountDropdown = ({ open, onClose }) => {
  const { isConnected, address, chainId, chain, connector } = useAccount();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { setIsConnectWalletOpen } = useSymbiosis();
  const [active, setActive] = useState<number>(1);
  const dropdownRef = useRef(null);
  const { accounts } = useBTCProvider();
  const { disconnect: disconnectBtc } = useConnectModal();

  const { data } = useBalance({
    address,
    chainId,
    config,
  });

  const [btcBalance, setBtcBalance] = useState<any>(0);

  useEffect(() => {
    const getBtcBalance = async () => {
      if (accounts.length === 0) return;

      try {
        const response = await axios.get(
          `https://blockchain.info/balance?active=${accounts[0]}`
        );
        if (response.data) {
          // Extracting and formatting the information
          for (const address in response.data) {
            const { final_balance } = response.data[address];
            setBtcBalance((final_balance / 1e8).toFixed(8));
          }
        } else {
          // console.log("btc not found", response);
        }
      } catch (err) {}
    };

    getBtcBalance();
  }, [accounts]);

  const handleCopy = () => {
    navigator.clipboard.writeText(address || accounts[0]);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDisconnect = async () => {
    try {
      if (isConnected) {
        await disconnect(config, { connector });
        onClose();
      }
      if (accounts.length > 0) {
        disconnectBtc();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOutside = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenConnectWallet = () => {
    setIsConnectWalletOpen(true);
    onClose();
  };

  if (!isConnected) return <></>;
  return (
    <div
      ref={dropdownRef}
      className={`${
        open ? "block" : "hidden"
      } absolute top-10 right-4 z-50 w-96 bg-[#323232] p-5 rounded-3xl`}
    >
      {active === 1 ? (
        <>
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-start gap-2">
              <Image
                src={
                  symbiosis_chains.find((c) => chain.name.includes(c.name))
                    ?.icon
                }
                alt={chain?.name}
                width={24}
                height={24}
                className="rounded-lg w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
              />
              <div className="font-roboto">
                <p className="font-medium text-white text-sm md:text-base">
                  {address
                    ? shortenAddressSmall(address)
                    : accounts.length > 0
                    ? shortenAddressSmall(accounts[0])
                    : ""}
                </p>
                <p className="text-gray-300 text-xs">{chain?.name}</p>
              </div>
            </div>

            <div className="flex justify-start items-center gap-3">
              <IoCopy
                onClick={handleCopy}
                size={16}
                className="text-white cursor-pointer"
              />

              <a
                target="_blank"
                href={`${chain?.blockExplorers?.default?.url}/address/${
                  address || accounts[0]
                }`}
              >
                <GoLinkExternal
                  size={16}
                  className="text-white cursor-pointer"
                />
              </a>

              <button onClick={() => setActive(2)}>
                <TbPlugConnected
                  size={20}
                  className="text-white cursor-pointer"
                />
              </button>
            </div>
          </div>

          <div className="w-full flex justify-between items-start mt-5">
            <p className="font-medium text-white text-sm">Balance</p>

            <div className="font-medium">
              <p className="text-white">
                {+data?.formatted > 0
                  ? formatCurrency(data?.formatted)
                  : btcBalance > 0
                  ? btcBalance
                  : 0}{" "}
                {chain?.nativeCurrency?.symbol || "BTC"}
              </p>
              <p className="text-[#75fb6e]">0 SIS</p>
            </div>
          </div>

          <div className="mt-28 pt-5 border-t border-gray-50 space-y-7 flex flex-col w-full">
            <button
              onClick={handleOpenConnectWallet}
              className="rounded-md bg-white text-black py-2 w-full"
            >
              Connect Tron Wallet
            </button>

            <button
              onClick={handleOpenConnectWallet}
              className="rounded-md bg-white text-black py-2 w-full"
            >
              Connect TON Wallet
            </button>

            <button
              onClick={handleOpenConnectWallet}
              className="rounded-md bg-white text-black py-2 w-full"
            >
              Connect SOL Wallet
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex justify-center items-center mt-2">
            <p className="font-medium text-center text-white w-full">
              Do you really want to
              <br /> disconnect wallet?
            </p>
          </div>
          <div className="flex justify-center items-start gap-2 my-28">
            <Image
              src={
                symbiosis_chains.find((c) => chain.name.includes(c.name))?.icon
              }
              alt={chain?.name}
              width={24}
              height={24}
              className="rounded-lg w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
            />
            <div className="font-roboto">
              <p className="font-medium text-white text-sm md:text-base">
                {address
                  ? shortenAddressSmall(address)
                  : accounts.length > 0
                  ? shortenAddressSmall(accounts[0])
                  : ""}
              </p>
              <p className="text-gray-300 text-xs">{chain?.name}</p>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={handleDisconnect}
              className="bg-[#C80000] w-full rounded-lg py-2 text-white font-medium"
            >
              Disconnect
            </button>
            <button
              onClick={() => setActive(1)}
              className="bg-transparent w-full rounded-lg py-2 text-white font-medium"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountDropdown;
