"use client";

import { useAccount } from "wagmi";
import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { toast } from "react-toastify";
import { network } from "../../data/networks";
import { IoMdClose } from "react-icons/io";

const SelectNetwork = () => {
  const dropdowRef = useRef(null);

  const [open, setOpen] = useState(false);
  const { chainId, chain } = useAccount();

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

  const handleSwitchChain = async ({
    chainId,
    chainName,
    rpcUrls,
    blockExplorerUrls,
    symbol,
    decimals,
  }) => {
    try {
      // First, try switching to the network
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      toast.success("Network changed successfully!");
    } catch (err) {
      if (err.code === 4902) {
        // Error code 4902 means the network is not added; try adding it
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${chainId.toString(16)}`, // Convert to hex
                chainName,
                rpcUrls,
                nativeCurrency: {
                  name: "ETH",
                  symbol: symbol || "ETH",
                  decimals: decimals,
                },
                blockExplorerUrls,
              },
            ],
          });
          setOpen(false);
          toast.success("Network added successfully!");
        } catch (addError) {
          if (addError.code === 4001) {
            toast.info("Network addition request was rejected.");
          } else {
            toast.error("Failed to add network.");
          }
        }
      } else {
        // Handle other errors, like user rejecting the request
        toast.error(err.message || "Failed to switch network.");
      }
    }
  };

  //   if (!network.find((itm) => itm.chainId === chainId)) return;

  return (
    <div className="relative">
      <button
        className={`${
          open ? "z-[999]" : "z-0"
        } flex justify-between relative items-center gap-4 bg-black rounded-xl p-3 min-w-32 w-max text-white ease transition-all group`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex justify-start items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white hidden group-hover:flex text-black justify-center items-center">
            <BsChevronDown size={13} className="group-hover:hidden block" />
            <IoMdClose size={13} className="group-hover:block hidden" />
          </div>
          <img
            src={
              network.find((itm) => itm.chainId === chainId).metadata.logoURI
            }
            width={27}
            height={27}
            alt="network"
            className="rounded-full group-hover:hidden block"
          />
          <p className="group-hover:hidden block">
            {chain?.name || "Linea Mainnet"}
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
        ? "pointer-events-auto translate-y-0 opacity-100 visible"
        : "opacity-0 translate-y-1 invisible"
    } z-50 justify-start items-center w-72 p-2 h-full min-h-[600px] overflow-y-auto transition-transform duration-300 ease-in-out absolute top-12  bg-white text-black shadow-md rounded-md`}
      >
        <div className="flex flex-col gap-2">
          {network
            .sort((a: any, b: any) => a.name - b.name)
            .map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  handleSwitchChain({
                    chainId: item.chainId,
                    blockExplorerUrls: item.metadata.blockExplorerUrls,
                    chainName: item.name,
                    rpcUrls: item.metadata.rpcUrls,
                    symbol: item.symbol,
                    decimals: item.decimals,
                  })
                }
                className={`${
                  item?.chainId === chainId
                    ? "bg-black text-white hover:text-black"
                    : "text-black"
                } flex justify-between items-center hover:bg-gray-100 ease-in-out transition-all w-full p-3 rounded-lg`}
              >
                <div className="flex justify-start items-center gap-2">
                  <img
                    src={item.metadata.logoURI}
                    width={30}
                    height={30}
                    alt={item.name}
                  />
                  <p className="">{item.name}</p>
                </div>
                {item?.chainId === chainId ? (
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
