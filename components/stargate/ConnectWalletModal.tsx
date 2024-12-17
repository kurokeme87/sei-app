"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { IoSunnyOutline, IoWalletOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import coinbase_icon from "../../public/stargate/coinbase.svg";
import wallet_icon from "../../public/stargate/walletconnect.svg";
import { solana, tron } from "../../data/connectors";

interface IProps {
  button?: ReactNode;
  actionBtn?: ReactNode;
}

interface IConnect {
  chainId: number;
}

const ConnectWalletModal = ({ button, actionBtn }: IProps) => {
  const { isConnected } = useAccount();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { connectAsync, connectors } = useConnect();

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isConnected) {
    if (actionBtn) {
      return <div className="">{actionBtn}</div>;
    }
  } else {
    return (
      <div className="relative">
        <div className="w-full" onClick={() => setOpen(true)}>
          {button ? (
            button
          ) : (
            <button className="w-full font-bold py-2.5 px-4 text-sm flex justify-between items-center gap-3 rounded-3xl bg-[#EFEFEF] text-[#000] font-faGrotesk">
              <p>Connect Wallet</p>
              <IoWalletOutline />
            </button>
          )}
        </div>

        {/* Drawer */}

        <div
          ref={dropdownRef}
          className={`${
            open ? "translate-x-0" : "translate-x-[1000px]"
          } w-screen max-w-[375px] fixed top-3 right-3 bottom-3 ease-in-out transition-transform duration-300 z-[10000] bg-[#232323] overflow-y-hidden h-full rounded-xl modal-scroll`}
        >
          <div className="w-full p-5 bg-[#323232]">
            <div className="w-full flex justify-between items-center">
              <p className="font-semibold text-white font-faGrotesk text-xl">
                Connect wallet
              </p>

              <div className="flex justify-start items-center flex-nowrap gap-4">
                <button
                  onClick={() => setOpen(false)}
                  className="text-[#999] hover:text-white ease transition-all"
                >
                  <IoMdClose size={24} />
                </button>
                <p className="text-[#999]">|</p>
                <button className="text-[#999] hover:text-white ease transition-all">
                  <IoSunnyOutline size={24} />
                </button>
              </div>
            </div>
            <p className="text-xs text-[#999] mt-4">
              You can only connect one wallet per environment.
            </p>
          </div>
          <div className="px-5 py-3 flex flex-col mt-4">
            <p className="w-full text-[#999] text-xs border-b border-[#444] pb-1">
              EVM
            </p>
            {connectors
              .filter((itm) => itm.name !== "Injected")
              .map((item, index) => (
                <button
                  onClick={() => connectAsync({ connector: item })}
                  key={index}
                  className="w-full flex justify-start items-center gap-3 font-roboto hover:bg-[#1A1A1A] ease transition-colors rounded-lg p-3"
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
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-[14px] text-white">{item.name}</p>
                    <p className="text-[13px] text-[#999] text-left">
                      {item.type === "injected" ? "Connect" : "Get"}
                    </p>
                  </div>
                </button>
              ))}
          </div>

          <div className="px-5 py-3 flex flex-col">
            <p className="w-full text-[#999] text-xs border-b border-[#444] pb-1 mb-2">
              Solana
            </p>
            {solana.map((item, index) => (
              <button
                key={index}
                className="w-full flex justify-start items-center gap-3 font-roboto hover:bg-[#1A1A1A] ease transition-colors rounded-lg p-3"
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={28}
                  height={28}
                  className="rounded-lg"
                />
                <div className="flex flex-col justify-start items-start">
                  <p className="text-[14px] text-white">{item.name}</p>
                  <p className="text-[13px] text-[#999] text-left">Get</p>
                </div>
              </button>
            ))}
          </div>

          <div className="px-5 py-4 flex flex-col">
            <p className="w-full text-[#999] text-xs border-b border-[#444] pb-1 mb-2 capitalize">
              TRON
            </p>
            {tron.map((item, index) => (
              <button
                key={index}
                className="w-full flex justify-start items-center gap-3 font-roboto hover:bg-[#1A1A1A] ease transition-colors rounded-lg p-3"
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={28}
                  height={28}
                  className="rounded-lg"
                />
                <div className="flex flex-col justify-start items-start">
                  <p className="text-[14px] text-white">{item.name}</p>
                  <p className="text-[13px] text-[#999] text-left">Get</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default ConnectWalletModal;
