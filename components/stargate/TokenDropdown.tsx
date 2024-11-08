"use client";

import { tokens } from "@/data/tokens";
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

type IToken = {
  chainId: number | string;
  name: string;
  image: string;
  chain?: string;
};

interface IProps {
  setSetelectedToken?: Dispatch<SetStateAction<IToken>>;
  setTokenAddresses?: Dispatch<SetStateAction<string[]>>;
  selectedToken: IToken;
  selectedNetworkId?: number | string;
}

export const TokenDropdown: React.FC<IProps> = ({
  setSetelectedToken,
  selectedToken,
  selectedNetworkId,
  setTokenAddresses,
}): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isConnected, chainId } = useAccount();

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
          Token:
        </p>
        {selectedToken.name ? (
          ""
        ) : (
          <p className="text-white font-medium">All</p>
        )}

        {selectedToken.image ? (
          <Image
            src={selectedToken?.image}
            width={15}
            height={15}
            alt={selectedToken.name}
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
            setSetelectedToken({
              chainId: "",
              image: "",
              name: "",
              chain: null,
            });
            setTokenAddresses([]);
          }}
          className="hover:bg-[#1A1A1A] text-white py-2 px-3 w-full text-left text-xs"
        >
          All
        </button>
        {tokens
          .filter((itm) =>
            selectedNetworkId &&
            itm?.addresses &&
            selectedNetworkId in itm?.addresses
              ? itm?.addresses[selectedNetworkId]
              : itm
          )
          .map((item, index) => (
            <button
              onClick={() => {
                setOpen(false);
                setTokenAddresses((prev) => {
                  if (
                    selectedNetworkId &&
                    item?.addresses &&
                    selectedNetworkId in item?.addresses
                  ) {
                    return [item.addresses?.[selectedNetworkId]];
                  } else {
                    if (item.addresses?.[chainId]) {
                      return [item.addresses?.[chainId]];
                    }
                  }
                });
                setSetelectedToken({
                  chainId: item.chainId,
                  image: item.metadata.logoURI,
                  name: item.name,
                  chain: selectedNetworkId
                    ? item.addresses?.[selectedNetworkId]
                    : item.addresses?.[item.chainId],
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

export default TokenDropdown;
