"use client";
// This component will be used to display a list of tokens in the modal and will optimize the rendering of the list of tokens.

import { FixedSizeList as List } from "react-window";
import Balance from "../global/Balance";
import Image from "next/image";
import { ITokens } from "@/data/networks";
import React from "react";

type TokenListProps = {
  tokens: ITokens[];
  onSelect: (network: any, token: any) => void;
  selectedNetwork: any;
  // handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
};

const TokenList = ({
  tokens,
  onSelect,
  selectedNetwork,
}: // handleScroll,
TokenListProps) => {
  const Row = ({ index, style }) => {
    // let data = tokens;
    // tokens.sort((a, b) => Number(b?.balance) - Number(a?.balance));
    let token = tokens[index];
    return (
      <button
        key={index}
        style={style}
        className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-lg transition-colors border-t"
        onClick={() => onSelect(selectedNetwork!, token)}
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
          <Balance
            chainId={selectedNetwork?.id || token.chainId}
            token={token?.address}
            key={index}
          />
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
