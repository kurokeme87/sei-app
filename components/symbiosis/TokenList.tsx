"use client";
// This component will be used to display a list of tokens in the modal and will optimize the rendering of the list of tokens.

import { FixedSizeList as List } from "react-window";
import Balance from "../global/Balance";
import Image from "next/image";
import { ITokens } from "@/data/networks";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useBTCProvider } from "@particle-network/btc-connectkit";
import axios from "axios";
import useGetTronBalance from "@/hooks/useGetTronBalance";

type TokenListProps = {
  tokens: ITokens[];
  onSelect: (network: any, token: any) => void;
  selectedNetwork: any;
  setTokenPrice: Dispatch<SetStateAction<string | number>>;
  callback: () => void;
  // handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
};

const TokenList = ({
  tokens,
  onSelect,
  selectedNetwork,
  setTokenPrice,
  callback,
}: TokenListProps) => {
  const Row = ({ index, style }) => {
    const { accounts } = useBTCProvider();
    let token = tokens[index];
    const [btcBalance, setBtcBalance] = useState<any>(0);

    const getTronBalance = async (): Promise<string | number> => {
      const tronBalance = await useGetTronBalance(token.address);
      console.log("tronBalance", tronBalance);
      return (tronBalance as any) || "";
    };

    useEffect(() => {
      const getBtcBalance = async () => {
        if (token.name !== "Bitcoin") return;

        try {
          const response = await axios.get(
            `https://blockchain.info/balance?active=${accounts[0]}`
          );
          if (response.data) {
            // Extracting and formatting the information
            for (const address in response.data) {
              const { final_balance, n_tx, total_received } =
                response.data[address];
              setBtcBalance((final_balance / 1e8).toFixed(8));
              console.log(
                `- Final Balance: ${(final_balance / 1e8).toFixed(8)} BTC`
              );
              // console.log(
              //   `- Total Received: ${(total_received / 1e8).toFixed(8)} BTC`
              // );
            }
            console.log("btc response", response);
          } else {
            console.log("btc not found", response);
          }
        } catch (err) {}
      };

      getBtcBalance();
    }, [token.name]);

    return (
      <button
        key={index}
        style={style}
        className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-lg transition-colors border-t"
        onClick={() => {
          onSelect(selectedNetwork!, token);
          setTokenPrice(0);
          callback();
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={token.logoURI}
              width={30}
              height={30}
              alt={token.symbol || " "}
              className="rounded-full"
              loading="lazy"
            />
            {selectedNetwork?.icon ? (
              <Image
                src={selectedNetwork?.icon || token?.icon}
                width={17}
                height={17}
                alt={selectedNetwork?.name || token?.address}
                className="rounded-full absolute -top-1 -right-2 border-2 border-gray-50 w-[14px] h-[14px]"
                loading="lazy"
              />
            ) : null}
          </div>
          <span className="font-mono text-sm md:text-base font-medium">
            {token.symbol}
          </span>
        </div>
        <span className="font-mono text-sm md:text-base flex justify-start items-center gap-2">
          {token.name === "Bitcoin" ? (
            `${btcBalance} ${token.symbol}`
          ) : token.name === "Tron" ? (
            <span>{getTronBalance()}</span>
          ) : (
            <Balance
              chainId={selectedNetwork?.id || token.chainId}
              token={token?.address}
              key={index}
            />
          )}
          {/* {+token?.balance > 0 ? Number(token?.balance).toFixed(6) : 0} */}
          <span>'''</span>
        </span>
      </button>
    );
  };

  const MemoizedRow = React.memo(Row);

  return (
    <div style={{ height: 500, overflow: "auto" }}>
      <List
        height={500}
        itemCount={tokens.length}
        itemSize={50} // Increase to accommodate variable content
        width="100%"
      >
        {MemoizedRow}
      </List>
    </div>
  );
};

export default TokenList;
