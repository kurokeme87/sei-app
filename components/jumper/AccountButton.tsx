"use client";

import { shortenAddressSmall } from "@/app/utils";
import { network } from "@/data/networks";
import Image from "next/image";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import effigy from "../../public/images/default_effigy.svg";
import xp from "../../public/images/xp.svg";
import WalletBalances from "./BalanceDrawer";

export const AccountButton = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const { address, connector, chain, isConnected, chainId } = useAccount();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event) => {
    if (dropdownRef && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isConnected) return <></>;
  return (
    <div className="relative">
      <span className="absolute px-1.5 py-1 rounded-3xl text-white -top-2 -right-2 z-40 bg-[#653BA3] font-bold text-xs">
        new
      </span>
      <button
        onClick={() => setOpen(true)}
        className="rounded-3xl bg-[#3F2F5E] hover:bg-[#453363] ease transition-all flex justify-between relative gap-4 items-center px-3 py-2.5 text-white"
        type="button"
      >
        <div className="relative">
          {connector?.icon ? (
            <Image
              src={connector?.icon}
              width={24}
              height={24}
              alt={chain?.name}
            />
          ) : null}
          <Image
            src={
              network.find((item) => item.chainId === chainId)?.metadata
                ?.logoURI
            }
            alt={chain?.name}
            width={15}
            height={15}
            className="z-40 absolute -bottom-2 -right-3"
          />
        </div>
        <p className="font-bold font-inter text-base sm:text-lg">
          {shortenAddressSmall(address)}
        </p>
      </button>

      {/* Drawer */}
      <div
        className={`${
          open ? "block z-[190]" : "hidden"
        } ease transition-all inset-0 fixed bg-[#100621] opacity-85`}
      ></div>

      <div
        ref={dropdownRef}
        className={`${
          open ? "translate-x-0" : "translate-x-[1000px]"
        } w-screen max-w-[416px] text-white p-5 fixed top-0 right-0 bottom-0 ease-in-out transition-transform duration-300 z-[9909] bg-[#120F29] overflow-y-auto`}
      >
        <WalletBalances setOpen={setOpen} />
      </div>
    </div>
  );
};

export const BalanceButton = () => {
  const { isConnected } = useAccount();

  if (!isConnected) return null;
  return (
    <button className="rounded-3xl bg-[#3F2F5E] hover:bg-[#453363] ease transition-all flex justify-between relative gap-4 items-center px-3 py-2.5 text-white">
      <Image
        src={effigy}
        alt="defaul effigy"
        height={29}
        width={29}
        className="rounded-full"
      />
      <p className="font-semibold text-white">0</p>
      <Image
        src={xp}
        alt="defaul effigy"
        height={29}
        width={29}
        className="rounded-full"
      />
    </button>
  );
};
