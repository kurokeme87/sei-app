import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import axios from "axios";
import Image from "next/image";
import { BsInfoCircleFill } from "react-icons/bs";
import { network } from "@/data/networks";
import { shortenAddressSmall } from "@/app/utils";
import { FaPowerOff } from "react-icons/fa6";
import { BiLinkExternal } from "react-icons/bi";
import { PiNotepadFill } from "react-icons/pi";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import CustomConnectButton from "../global/CustomConnectButton";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImNmNTYzMmZlLTk1MjUtNDU2OC1hY2ZlLTA2ZjE4NWQzMWZkYSIsIm9yZ0lkIjoiMjUzMjkiLCJ1c2VySWQiOiIxMTE5OCIsInR5cGVJZCI6ImVkYTdmZWZiLTJmMGQtNDk5My1iMGM1LWE5OTBmNTFkZTYwMCIsInR5cGUiOiJQUk9KRUNUIiwiaWF0IjoxNzI5NjkyNjU5LCJleHAiOjQ4ODU0NTI2NTl9.rwkF6eOKLKPwVHxSTLmsG_GiESvsuBr_vckOiImueMI";
// Moralis.start({ apiKey: API_KEY });

interface TokenBalance {
  token_address: string;
  symbol: string;
  name: string;
  logo: string;
  thumbnail: string;
  decimals: number;
  balance: string;
  possible_spam: boolean;
  verified_contract: boolean;
  total_supply: number | null;
  total_supply_formatted: number | null;
  percentage_relative_to_total_supply: number | null;
  security_score: number;
  balance_formatted: string;
  usd_price: number;
  usd_price_24hr_percent_change: number;
  usd_price_24hr_usd_change: number;
  usd_value: number;
  usd_value_24hr_usd_change: number;
  native_token: boolean;
  portfolio_percentage: number;
}

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const WalletBalances: React.FC<IProps> = ({ setOpen }) => {
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const { address, connector, chain, chainId } = useAccount();
  const { disconnectAsync } = useDisconnect();

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        if (!address) return;

        // Fetch token balances for the wallet address
        const response = await axios.get(
          `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );

        // console.log(response?.data?.result, "response");
        const tokenBalances =
          (response?.data?.result as unknown as TokenBalance[]) || [];

        // Calculate the total USD value of all tokens
        const totalValue = tokenBalances.reduce((acc, token) => {
          const tokenBalance = parseFloat(token.balance) / 10 ** token.decimals;
          const usdValue = tokenBalance * token.usd_price;
          return acc + usdValue;
        }, 0);

        setBalances(tokenBalances);
        setTotalBalance(totalValue);
      } catch (error) {
        console.error("Error fetching token balances:", error);
      }
    };

    fetchBalances();
  }, [address]);

  const handleDisconnect = async () => {
    await disconnectAsync().then(() => {
      setOpen(false);
    });
  };

  return (
    <div className="space-y-4 h-full">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={() => setOpen(false)}
          className="hover:bg-[#47435C] rounded-full p-1.5"
        >
          <IoMdClose size={24} />
        </button>
        <CustomConnectButton
          connect={
            <button className="font-bold hover:bg-[#47435C] ease transition-all px-4 py-2.5 rounded-full text-sm bg-[#1B1831]">
              Connect another wallet
            </button>
          }
        />
      </div>
      <button
        className="w-full rounded-xl bg-[#24203D] ease transition-all flex justify-between gap-4 items-center px-3 py-2.5 text-white"
        type="button"
      >
        <div className="relative">
          {connector?.icon ? (
            <Image
              src={connector?.icon}
              width={28}
              height={28}
              alt={chain?.name}
            />
          ) : null}
          <Image
            src={
              network.find((item) => item?.chainId === chainId)?.metadata
                ?.logoURI
            }
            alt={chain?.name}
            width={15}
            height={15}
            className="z-40 absolute -bottom-2 -right-3"
          />
        </div>
        <button className="font-bold font-inter hover:bg-[#47435C] ease transition-all px-2 py-1 rounded-full text-base md:text-lg">
          {shortenAddressSmall(address)}
        </button>

        <div className="flex justify-start items-center gap-2">
          <button className="rounded-full p-2 bg-[#3F2C67] hover:bg-[#492F76] ease transition-all">
            <Link href="https://seitrace.com/" target="_blank">
              <BiLinkExternal size={14} />
            </Link>
          </button>
          <button className="rounded-full p-2 bg-[#3F2C67] hover:bg-[#492F76] ease transition-all">
            <PiNotepadFill size={14} />
          </button>
          <button
            onClick={handleDisconnect}
            className="rounded-full p-2 bg-[#3F2C67] hover:bg-[#492F76] ease transition-all"
          >
            <FaPowerOff size={14} />
          </button>
        </div>
      </button>

      <div className="rounded-2xl bg-[#24203D] p-4">
        <p className="font-medium text-sm flex items-center gap-3">
          Total balance <BsInfoCircleFill color="#929093" />
        </p>
        <p className="mt-4 font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl">
          ${totalBalance.toFixed(2)}
        </p>
      </div>
      <ul className="space-y-3 my-4">
        {balances.map((token, index) => (
          <li
            role="button"
            key={index}
            className="flex justify-between items-center rounded-2xl bg-[#24203D] p-4 hover:bg-[#2C2844] ease transition-all duration-300"
          >
            <div className="flex justify-start items-center gap-3 flex-nowrap">
              <Image src={token.logo} alt={token.name} height={41} width={41} />
              <div>
                <p className="font-bold text-lg">{token.symbol}</p>
                <p className="text-[#FFFFFFBF] font-medium text-sm">
                  {token.name}
                </p>
              </div>
            </div>
            <div>
              <p className="font-bold text-lg">
                {(parseFloat(token.balance) / 10 ** token.decimals).toFixed(4)}{" "}
              </p>

              <p className="text-[#FFFFFFBF] font-medium text-sm">
                $
                {(
                  (parseFloat(token.balance) / 10 ** token.decimals) *
                  token.usd_price
                ).toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletBalances;
