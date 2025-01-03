"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useAccount } from "wagmi";
import SelectNetwork from "./SelectNetwork.dropdown";
import { shortenAddressSmall } from "@/app/utils";
import AccountDropdown from "./AccountDropdown";
import useSymbiosis from "@/hooks/useSymbiosis";
import { IoClose } from "react-icons/io5";
import TransactionNav from "./TransactionNav";

const SymbiosisNav = () => {
  const { isConnected, address } = useAccount();
  const { setIsConnectWalletOpen } = useSymbiosis();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#E9E9E9]">
      <div className="w-full mx-auto p-4">
        <div className="">
          <div className="flex justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${
                  isOpen
                    ? "z-[999] text-white fixed right-2 sm:left-2 top-7"
                    : "text-black z-0"
                } `}
              >
                {isOpen ? (
                  <IoClose color="white" size={23} />
                ) : (
                  <svg
                    fill="none"
                    height="28"
                    viewBox="0 0 28 28"
                    width="28"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      clipRule="evenodd"
                      fill="currentColor"
                      fill-rule="evenodd"
                    >
                      <path d="m1.59502 19.5-.59502-.625v-1.25l.59502-.625h6.84276l.59793.625h.30122l.5595-.625h6.59837l.5766.625v1.25l-.5766.625h-6.59837l-.5595-.625h-.30122l-.59793.625zm15.47638-1.875v1.25h.3347l.6217.625h7.3316l.6406-.625v-1.25l-.6406-.625h-7.3316l-.6217.625z"></path>
                      <path d="m25.405 12.5.595-.625v-1.25l-.595-.625h-6.8428l-.5979.625h-.3012l-.5595-.625h-6.5984l-.57661.625v1.25l.57661.625h6.5984l.5595-.625h.3012l.5979.625zm-15.47644-1.875v1.25h-.33469l-.62167.625h-7.33156l-.640644-.625v-1.25l.640644-.625h7.33156l.62167.625z"></path>
                    </g>
                  </svg>
                )}
              </button>
              <TransactionNav />
            </div>

            <div className="lg:flex hidden items-center gap-8 text-base sm:text-lg">
              <a href="/symbiosis" className="font-medium transition-colors">
                Swap
              </a>
              <a
                target="_blank"
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
            {isConnected ? (
              <ConnectedButtonsGroup />
            ) : (
              <button
                onClick={() => setIsConnectWalletOpen(true)}
                className="bg-black text-white text-sm md:px-5 p-2 md:py-3.5 rounded-xl hover:bg-gray-900 transition-colors flex gap-1.5 items-center"
              >
                Connect <span className="md:block hidden">wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export const ConnectedButtonsGroup = () => {
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

export default SymbiosisNav;
