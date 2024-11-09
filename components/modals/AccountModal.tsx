"use client";

import { useAccount } from "wagmi";
import Image from "next/image";
import { useRef } from "react";
import { useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { BiPlus } from "react-icons/bi";
import { shortenAddressSmall } from "../../app/utils";
import { disconnect, getAccount } from "@wagmi/core";
import { config } from "../../app/web3Config";
import { toast } from "react-toastify";

const AccountModal = ({ open, setOpen }) => {
  const { address, isConnected, connector } = useAccount();
  const modalRef = useRef(null);
  const { connector: connectr } = getAccount(config);

  const togglOpen = () => setOpen(!open);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDisconnect = async () => {
    try {
      if (isConnected) {
        await disconnect(config, { connector: connectr }).then((res) => {
          setOpen(false);
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="relative">
      {open ? (
        <div className="fixed inset-0 bg-[#00000080] z-50 backdrop-blur-sm"></div>
      ) : null}

      {/* Dropdown conntent */}
      <div
        ref={modalRef}
        className={`fixed top-[40%] left-1/2 flex-col w-full sm:max-w-[425px] bg-[#0F192F] z-[999] p-4 gap-4 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform ${
          open
            ? "translate-y-0 opacity-100 flex"
            : "translate-y-[100%] opacity-0"
        } -translate-x-1/2 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <p className="text-[#FEFFFE] w-full font-normal text-lg text-center">
            Wallets
          </p>

          <button
            onClick={togglOpen}
            className="rounded-full bg-[#162546] p-1 border border-[#1C2759]"
          >
            <GrClose size={12} color="white" />
          </button>
        </div>

        <div className="w-full border border-[#1C2759] rounded-md py-4 px-3 bg-[#111D36] flex justify-between items-center">
          <div className="flex justify-start items-center gap-3">
            <Image
              src={connector?.icon}
              width={28}
              height={28}
              alt="connector image"
              className="rounded-full"
            />
            <p className="font-normal text-white text-sm">
              {shortenAddressSmall(address)}
            </p>
          </div>
          <button
            onClick={handleDisconnect}
            className="hover:opacity-60 text-[#ABB5D1] text-xs"
          >
            Disconnect
          </button>
        </div>

        <button className="w-full flex justify-end items-center gap-3 text-[#ABB5D1]">
          <BiPlus />
          <p className="text-sm">Link a new wallet</p>
        </button>
      </div>
    </div>
  );
};

export default AccountModal;
