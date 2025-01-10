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
import useTronWallet from "@/hooks/useTronWallet";
import useGetTronBalance from "@/hooks/useGetTronBalance";

const AccountDropdown = ({ open, onClose }) => {
  const { isConnected, address, chainId, chain, connector } = useAccount();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { setIsConnectWalletOpen } = useSymbiosis();
  const [active, setActive] = useState<number>(1);
  const dropdownRef = useRef(null);
  const { accounts } = useBTCProvider();
  const { disconnect: disconnectBtc } = useConnectModal();
  const { adapter, tronAccount, readyState } = useTronWallet();
  const tronBalance = useGetTronBalance();
  const [btcBalance, setBtcBalance] = useState<any>(0);

  const { data } = useBalance({
    address,
    chainId,
    config,
  });

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
    navigator.clipboard.writeText(address || accounts[0] || tronAccount);
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
      if (adapter.connected) {
        await adapter.disconnect();
      }
    } catch (err) {
      // console.log(err);
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

  if (!isConnected && accounts.length < 1 && !tronAccount) return <></>;
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
                  isConnected
                    ? symbiosis_chains.find((c) =>
                        chain?.name?.includes(c?.name)
                      )?.icon
                    : accounts.length > 0
                    ? "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                    : tronAccount
                    ? "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png"
                    : ""
                }
                alt={chain?.name || "Tron"}
                width={24}
                height={24}
                className="rounded-lg w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
              />
              <div className="font-roboto">
                <p className="font-medium text-white text-sm md:text-base">
                  {address || tronAccount || accounts.length > 0
                    ? shortenAddressSmall(address || tronAccount || accounts[0])
                    : ""}
                </p>
                <p className="text-gray-300 text-xs">
                  {chain?.name ? chain.name : tronAccount ? "Tron" : "Bitcoin"}
                </p>
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
                  : +tronBalance > 0
                  ? tronBalance
                  : 0}{" "}
                {chain?.nativeCurrency?.symbol
                  ? chain?.nativeCurrency?.symbol
                  : accounts.length > 0
                  ? "BTC"
                  : tronAccount
                  ? "TRON"
                  : ""}
              </p>
              <p className="text-[#75fb6e]">0 SIS</p>
            </div>
          </div>

          <div className="mt-28 pt-5 border-t border-gray-50 space-y-5 flex flex-col w-full">
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
                isConnected
                  ? symbiosis_chains.find((c) => chain.name.includes(c.name))
                      ?.icon
                  : accounts.length > 0
                  ? "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                  : tronAccount
                  ? "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png"
                  : ""
              }
              alt={chain?.name || "Btc"}
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
