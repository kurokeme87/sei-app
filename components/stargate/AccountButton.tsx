"use client";

import { shortenAddressSmall } from "@/app/utils";
// import { network } from "@/data/networks";
import Image from "next/image";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
// import effigy from "../../public/images/default_effigy.svg";
import avatar from "../../public/images/default_effigy.svg";
import { IoMdClose } from "react-icons/io";
import { MdWbSunny } from "react-icons/md";
import { TbSwitch3 } from "react-icons/tb";
import { RxExit } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import Assets from "./Assets";

export const AccountButton = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(1);
  const { address, connector, chain, isConnected, chainId } = useAccount();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { disconnectAsync } = useDisconnect();

  const handleClickOutside = (event) => {
    if (dropdownRef && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDisconnect = async () => {
    await disconnectAsync().then(() => {
      setOpen(false);
    });
  };

  if (!isConnected) return <></>;
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="rounded-3xl bg-[#1A1A1A] border border-[#333] hover:border-[#555] flex justify-between relative gap-2 items-center p-3 text-white flex-nowrap ease transition-colors"
        type="button"
      >
        {connector?.icon ? (
          <Image
            src={connector?.icon}
            width={13}
            height={13}
            alt={chain?.name}
          />
        ) : null}
        <p className="font-medium text-sm">{shortenAddressSmall(address)}</p>
        <Image
          src={avatar}
          alt="avatar"
          width={23}
          height={23}
          className="rounded-full"
        />
      </button>

      {/* Drawer */}

      <div
        ref={dropdownRef}
        className={`${
          open ? "translate-x-0" : "translate-x-[1000px]"
        } w-screen max-w-[416px] text-white fixed flex flex-col top-3 right-3 bottom-3 ease-in-out transition-transform duration-300 z-[9909] bg-[#232323] overflow-y-auto rounded-xl`}
      >
        <div className="bg-[#323232] px-5 pt-5 font-faGrotesk w-full">
          <div className="flex justify-between items-center w-full">
            <p className="font-semibold text-xl text-white">My Wallets</p>

            <div className="flex justify-start items-center gap-4">
              <MdWbSunny
                size={24}
                className="hover:text-white text-[#999] cursor-pointer ease transition-all"
              />
              <TbSwitch3
                size={24}
                className="hover:text-white text-[#999] cursor-pointer ease transition-all"
              />
              <p className="text-[#999]">|</p>
              <button
                onClick={() => setOpen(false)}
                className="hover:text-white text-[#999] cursor-pointer ease transition-all"
              >
                <IoMdClose size={24} />
              </button>
            </div>
          </div>

          <div className="p-3 rounded-lg flex justify-between items-center w-full bg-[#232323] mt-4">
            <div className="flex justify-start items-center gap-1.5">
              {connector?.icon ? (
                <Image
                  src={connector?.icon}
                  width={25}
                  height={25}
                  alt={chain?.name}
                />
              ) : null}
              <p className="text-white text-sm">
                {shortenAddressSmall(address)}
              </p>
            </div>
            <div className="flex justify-start items-center text-[#999] gap-3">
              <p className="text-xs">EVM</p>
              <button onClick={handleDisconnect}>
                <RxExit size={13} />
              </button>
              <button className="p-1.5 rounded-md border border-[#333] text-[#50BEAF]">
                <IoMdAdd />
              </button>
            </div>
          </div>

          <div className="w-full flex justify-start items-center gap-3 mt-6 text-[14px]">
            <button
              onClick={() => setActive(1)}
              className={`${
                active === 1
                  ? "text-white border-[#50BEAF]"
                  : "border-transparent hover:text-white text-[#999]"
              } border-b pb-3 font-bold ease transition-all duration-300`}
            >
              Assets
            </button>
            <button
              onClick={() => setActive(2)}
              className={`${
                active === 2
                  ? "text-white border-[#50BEAF]"
                  : "border-transparent hover:text-white text-[#999]"
              } border-b pb-3 font-bold ease transition-all duration-300`}
            >
              Transactions
            </button>
          </div>
        </div>
        <div className="p-5 w-full">
          {active === 1 ? <Assets /> : null}
          {active === 2 ? <Assets /> : null}
        </div>
      </div>
    </div>
  );
};
