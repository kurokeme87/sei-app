"use client";

import { network } from "@/data/networks";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAccount } from "wagmi";

type INetwork = {
  chainId: number | string;
  name: string;
  image: string;
  chain?: string;
};

interface IProps {
  setSetelectedNetwork?: Dispatch<SetStateAction<INetwork>>;
  selectedNetwork: INetwork;
  setTokenAddresses?: Dispatch<SetStateAction<string[]>>;
}

export const NetworkDropdown: React.FC<IProps> = ({
  setSetelectedNetwork,
  selectedNetwork,
  setTokenAddresses,
}): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const { isConnected } = useAccount();
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
    <div className={`${open ? "" : "overflow-hidden"} relative`}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`${
          open
            ? "border-[#50BEAF] bg-[#323232]"
            : "border-[#333] hover:border-[#555]"
        } rounded-lg bg-[#1A1A1A] text-xs border flex justify-between relative gap-2 items-center px-2 py-1 flex-nowrap ease transition-colors group`}
        type="button"
      >
        <p
          className={`${
            open ? "text-white" : "text-[#999]"
          } font-medium group-hover:text-white`}
        >
          Network:
        </p>
        {selectedNetwork.name ? (
          ""
        ) : (
          <p className="text-white font-medium">All</p>
        )}

        {selectedNetwork.image ? (
          <Image
            src={selectedNetwork?.image}
            width={15}
            height={15}
            alt={selectedNetwork.name}
          />
        ) : null}
        <ChevronDown
          className={`${
            open ? "rotate-180 text-[#50BEAF]" : "text-[#999]"
          } ease transition-all duration-300`}
          size={15}
        />
      </button>

      {/* Drawer */}

      <div
        ref={dropdownRef}
        className={`${
          open
            ? "translate-y-0 opacity-100 z-[999]"
            : "-translate-y-4 opacity-0 -z-50"
        } w-56 border border-[#333] absolute top-8 left-0-0 ease transition-all bg-[#232323] rounded-lg overflow-hidden text-[10px]`}
      >
        <button
          onClick={() => {
            setOpen(false);
            setSetelectedNetwork({
              chainId: "",
              image: "",
              name: "",
              chain: "",
            });
            setTokenAddresses([]);
          }}
          className="hover:bg-[#1A1A1A] text-white py-2 px-3 w-full text-left text-xs"
        >
          All
        </button>
        {network.map((item, index) => (
          <button
            onClick={() => {
              setOpen(false);
              setTokenAddresses([]);
              setSetelectedNetwork({
                chainId: item.chainId,
                image: item.metadata.logoURI,
                name: item.name,
                chain: item.groupID,
              });
            }}
            key={index}
            className="hover:bg-[#1A1A1A] text-white py-2 px-3 w-full flex justify-start items-center"
          >
            <div className="flex justify-start items-center gap-2">
              <Image
                src={item.metadata.logoURI}
                alt={item.name}
                width={15}
                height={15}
              />
              <p className="text-xs">{item.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
