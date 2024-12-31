"use client";

import { useAccount, useSwitchChain } from "wagmi";
import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { symbiosis_chains } from "../../data/networks";
import { IoMdClose } from "react-icons/io";
import { truncateText } from "@/lib/utils";

const SelectNetwork = () => {
  const dropdowRef = useRef(null);

  const [open, setOpen] = useState(false);
  const { chainId, chain, connector } = useAccount();
  const { switchChain } = useSwitchChain();

  const handleClickOutside = (event: any) => {
    if (dropdowRef.current && !dropdowRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        className={`${
          open ? "z-90" : ""
        } flex justify-between relative items-center gap-4 bg-black rounded-xl p-3 min-w-32 w-40 text-white ease transition-all group`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex justify-start items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white hidden group-hover:flex text-black justify-center items-center">
            <BsChevronDown size={13} className="group-hover:hidden block" />
            <IoMdClose size={13} className="group-hover:block hidden" />
          </div>
          <img
            src={symbiosis_chains.find((itm) => itm.id === chainId).icon}
            width={27}
            height={27}
            alt="network"
            className="rounded-full group-hover:hidden block"
          />
          <p className="group-hover:hidden block">
            {truncateText(chain?.name, 8)}
          </p>
          <p className="group-hover:block hidden">Change</p>
        </div>
      </button>

      {/* Dropdown conntent */}
      <div
        ref={dropdowRef}
        className={`
    ${
      open
        ? "pointer-events-auto translate-y-0 opacity-100 visible z-50"
        : "opacity-0 translate-y-1 invisible"
    } justify-start items-center w-72 p-2 h-full min-h-[600px] overflow-y-auto transition-transform duration-300 ease-in-out absolute top-12  bg-white text-black shadow-md rounded-md`}
      >
        <div className="flex flex-col gap-2">
          {symbiosis_chains
            .sort((a: any, b: any) => a.name - b.name)
            .map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  switchChain({ chainId: Number(item.id), connector });
                  setOpen(false);
                }}
                className={`${
                  item?.id === chainId
                    ? "bg-black text-white hover:text-black"
                    : "text-black"
                } flex justify-between items-center hover:bg-gray-100 ease-in-out transition-all w-full p-3 rounded-lg`}
              >
                <div className="flex justify-start items-center gap-2">
                  <img
                    src={item.icon}
                    width={30}
                    height={30}
                    alt={item.name}
                    loading="lazy"
                  />
                  <p className="">{item.name}</p>
                </div>
                {item?.id === chainId ? (
                  <p className="text-[#75fb6e]">Current</p>
                ) : null}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SelectNetwork;
