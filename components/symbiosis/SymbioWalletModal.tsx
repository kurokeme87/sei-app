"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import coinbase_icon from "../../public/stargate/coinbase.svg";
import wallet_icon from "../../public/stargate/walletconnect.svg";
import useSymbiosis from "@/hooks/useSymbiosis";
import { config } from "@/app/web3Config";
import { disconnect } from "@wagmi/core";
import {
  useBTCProvider,
  useConnectModal,
} from "@particle-network/btc-connectkit";
import tronlinkIcon from "../../public/images/tronlink.png";
import { Wallet, WalletInfo, WalletInfoInjected } from "@tonconnect/sdk";

import useTronWallet from "@/hooks/useTronWallet";
import { atom, useRecoilState } from "recoil";
import { isDesktop, isMobile, openLink } from "@/lib/utils";
import { useTonConnect } from "@/hooks/useTonConnect";
import Modal from "../modals/Modal";
import QRCode from "react-qr-code";
import { useTonWalletConnectionError } from "@/hooks/useTonWalletConnectionError";
import { toast } from "react-toastify";
import { useTonConnectUI, TonConnect } from "@tonconnect/ui-react";

enum WalletGroup {
  EVM = "EVM",
  TRON = "TRON",
  TON = "TON",
  SOL = "SOL",
}

export type WalletsListQueryResult = {
  walletsList: WalletInfo[]; // Array of wallets
  embeddedWallet: WalletInfoInjected | undefined; // Either an injected wallet or undefined
};

export const walletDataState = atom<{
  walletsList: WalletInfo[] | null;
  embeddedWallet: WalletInfoInjected | null;
}>({
  key: "walletsList",
  default: {
    walletsList: null,
    embeddedWallet: null,
  },
});

const SymbioWalletModal = () => {
  const { tonConnect, wallet, addReturnStrategy, walletsList } =
    useTonConnect();
  const { adapter, tronAccount, disconnectTronLink } = useTronWallet();
  const { openConnectModal, disconnect: disconnectBtc } = useConnectModal();
  const walletGroup: string[] = ["EVM", "TRON", "TON", "SOL"];
  const [active, setActive] = useState<WalletGroup>(WalletGroup.EVM);
  const { isConnected, chainId, connector } = useAccount();
  const dropdownRef = useRef(null);
  const { connectAsync, connectors } = useConnect();
  const { isConnectWalletOpen, setIsConnectWalletOpen } = useSymbiosis();
  const { accounts } = useBTCProvider();
  const [modalUniversalLink, setModalUniversalLink] = useState("");
  const [openTonModal, setOpenTonModal] = useState(false);
  const [walletData, setWalletData] = useRecoilState(walletDataState);
  const [tonConnectUI, setOptions] = useTonConnectUI();
  // const walletsList = useRecoilValueLoadable(walletData);
  // console.log("wallet connected", wallet);

  const onConnectErrorCallback = useCallback(() => {
    setModalUniversalLink("");
    toast.error("Connection was rejected", {
      // description: 'Please approve connection to the dApp in your wallet.',
    });
  }, []);

  const handleConnectTonModal = useCallback(async () => {
    tonConnectUI.openModal();

    if (!walletsList.walletsList) return;

    if (!isDesktop() && walletsList.embeddedWallet) {
      tonConnect.connect({
        jsBridgeKey: walletsList.embeddedWallet?.jsBridgeKey,
      });
      setIsConnectWalletOpen(false);
      return;
    }

    const tonkeeperConnectionSource = {
      universalLink: "https://app.tonkeeper.com/ton-connect",
      bridgeUrl: "https://bridge.tonapi.io/bridge",
    };
    // const tonkeeperConnectionSource = {
    //   universalLink: walletsList.walletsList[1]?.universalLink || "",
    //   bridgeUrl: walletsList.walletsList[1]?.bridgeUrl || "",
    // };

    const universalLink = tonConnect.connect(tonkeeperConnectionSource);

    if (isMobile()) {
      openLink(addReturnStrategy(universalLink, "none"), "_blank");
      setIsConnectWalletOpen(false);
    } else {
      setModalUniversalLink(universalLink);
      setIsConnectWalletOpen(false);
      setOpenTonModal(true);
    }
  }, [
    walletData,
    tonConnect,
    setIsConnectWalletOpen,
    addReturnStrategy,
    walletsList,
  ]);

  const handleConnectTronModal = () => {
    adapter.connect();
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsConnectWalletOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDisconnect = async () => {
    try {
      if (isConnected) {
        await disconnect(config, { connector });
      }
      if (accounts.length > 0) {
        disconnectBtc();
      }
      if (tronAccount) {
        disconnectTronLink();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log("wallet", wallet);

  // useEffect(() => {
  //   if (modalUniversalLink) {
  //     setModalUniversalLink("");
  //   }
  // }, [modalUniversalLink, wallet]);

  // useEffect(() => {
  //   if (walletsListQuery) {
  //     walletsListQuery
  //       .then((data) => {
  //         setWalletData({
  //           walletsList: data.walletsList,
  //           embeddedWallet: data.embeddedWallet,
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching wallet data:", error);
  //       });
  //   }
  // }, [walletsListQuery, setWalletData]);

  useTonWalletConnectionError(onConnectErrorCallback);

  if (!isConnectWalletOpen && isConnected) return <></>;

  return (
    <div className="">
      <Modal
        setOpen={setOpenTonModal}
        open={!!modalUniversalLink || openTonModal}
        onClose={() => {
          setModalUniversalLink("");
          setOpenTonModal(false);
        }}
      >
        <div className="p-2 font-inter">
          <h1 className="text-lg mb-10 font-semibold">Connect to Tonkeeper</h1>
          <QRCode
            size={256}
            style={{ height: "260px", maxWidth: "100%", width: "100%" }}
            value={modalUniversalLink}
            viewBox={`0 0 256 256`}
          />
        </div>
      </Modal>

      {/* Drawer */}

      <div
        className={`${
          isConnectWalletOpen ? "block" : "hidden"
        } bg-black opacity-50 absolute inset-0 z-50`}
      ></div>

      <div
        ref={dropdownRef}
        className={`${
          isConnectWalletOpen
            ? "translate-y-0 z-[999]"
            : "translate-y-[1000px] -z-[999] opacity-0"
        } w-screen max-w-[505px] fixed top-[10%] bottom-[10%] left-[50%] -translate-x-[50%] ease-in-out transition-transform z-[10000] bg-white overflow-y-auto rounded-3xl`}
      >
        <div className="w-full px-5 md:px-10 pt-8 pb-4 bg-white">
          <div className="w-full flex justify-between items-center">
            <p className="font-medium font-faGrotesk text-xl md:text-3xl">
              Connect a wallet
            </p>

            <button
              onClick={() => setIsConnectWalletOpen(false)}
              className="text-[#999] hover:text-white ease transition-all p-2 bg-[#ECECEC] rounded-xl"
            >
              <IoMdClose size={24} />
            </button>
          </div>
        </div>

        <div className="px-4 md:px-10">
          <div className="w-full grid grid-cols-4 gap-2 bg-[#F4F4F4] rounded-lg p-1">
            {walletGroup.map((item, index) => (
              <button
                onClick={() => setActive(item as WalletGroup)}
                key={index}
                className={`${active === item ? "bg-white" : "bg-[#F4F4F4]"}
                    w-full flex justify-center items-center gap-2 text-black hover:bg-white ease transition-colors rounded-lg px-3 py-2`}
              >
                <p className="text-[14px]">{item}</p>
                {isConnected && item === "EVM"}
              </button>
            ))}
          </div>
        </div>

        {active === "EVM" ? (
          <div className="w-full relative">
            {isConnected || accounts.length > 0 ? (
              <div className="absolute inset-0 z-50 bg-white opacity-90 flex justify-center items-center">
                <div className="px-4 md:px-16 mt-20 flex justify-center items-center w-full flex-col">
                  <p className="text-center">
                    You are already connected to a EVM wallet. To use different
                    wallet, please disconnect first.
                  </p>

                  <button
                    onClick={handleDisconnect}
                    className="bg-black text-white hover:bg-white rounded-xl px-4 py-1.5 mt-2 hover:text-black"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : null}
            <div className="px-5 py-3 grid w-full grid-cols-2 sm:grid-cols-3">
              {connectors
                .filter((itm) => itm.name !== "Injected")
                .map((item, index) => (
                  <button
                    onClick={() => {
                      connectAsync({ connector: item, chainId });
                      setIsConnectWalletOpen(false);
                    }}
                    key={index}
                    className="w-full border border-gray-50 hover:bg-gray-100 flex flex-col justify-center items-center gap-3 font-roboto ease transition-colors rounded-lg px-3 py-4"
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
                    <p className="text-xs">{item.name}</p>
                  </button>
                ))}

              <button
                onClick={() => {
                  openConnectModal();
                  setIsConnectWalletOpen(false);
                }}
                className="w-full border border-gray-50 hover:bg-gray-100 flex flex-col justify-center items-center gap-3 font-roboto ease transition-colors rounded-lg px-3 py-4"
              >
                <Image
                  src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                  alt="OKX icon"
                  width={28}
                  height={28}
                  className="rounded-lg"
                />
                <p className="text-xs">Bitcoin</p>
              </button>
            </div>
          </div>
        ) : null}

        {active === "SOL" ? (
          <div className="px-5 py-3 grid w-full grid-cols-2 sm:grid-cols-3">
            {connectors
              .filter(
                (item) =>
                  item.name.toLowerCase().includes("phantom") ||
                  item.name.toLowerCase().includes("solfare")
              )
              .map((item, index) => (
                <button
                  onClick={() => {
                    connectAsync({ connector: item, chainId });
                    setIsConnectWalletOpen(false);
                  }}
                  key={index}
                  className="w-full border border-gray-50 hover:bg-gray-100 flex flex-col justify-center items-center gap-3 font-roboto ease transition-colors rounded-lg px-3 py-4"
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
                  <p className="text-xs">{item.name}</p>
                </button>
              ))}
          </div>
        ) : null}

        {active === "TON" ? (
          <div className="px-5 py-3 grid w-full grid-cols-2 sm:grid-cols-3">
            <button
              onClick={handleConnectTonModal}
              className="w-full border border-gray-50 hover:bg-gray-100 flex flex-col justify-center items-center gap-3 font-roboto ease transition-colors rounded-lg px-3 py-4"
            >
              <Image
                src="https://cryptologos.cc/logos/toncoin-ton-logo.svg?v=040"
                alt="TON"
                width={28}
                height={28}
                className="rounded-lg"
              />
              <p className="text-xs">TON</p>
            </button>
          </div>
        ) : null}
        {active === "TRON" ? (
          <div className="px-5 py-3 grid w-full grid-cols-2 sm:grid-cols-3">
            <button
              // disabled={readyState === "Found" ? false : true}
              onClick={handleConnectTronModal}
              className="w-full border border-gray-50 hover:bg-gray-100 flex flex-col justify-center items-center gap-3 font-roboto ease transition-colors rounded-lg px-3 py-4 disabled:opacity-75"
            >
              <Image
                src={tronlinkIcon}
                alt="TRON Link"
                width={28}
                height={28}
                className="rounded-lg"
              />
              <p className="text-xs">TronLink</p>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SymbioWalletModal;
