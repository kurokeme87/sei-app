"use client";

import { ITokens, tokens } from "@/data/tokens";
import { ArrowLeft, Search } from "lucide-react";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type IChainSelect = {
  view: string;
  setView: Dispatch<SetStateAction<string>>;
  setSelectedChain: Dispatch<SetStateAction<any>>;
};

const ChainSelect = ({ view, setSelectedChain, setView }: IChainSelect) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<ITokens[]>(tokens);

  useEffect(() => {
    if (searchQuery) {
      const newData = tokens.filter((item) =>
        item.name.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );

      setFilteredData(newData);
    } else {
      setFilteredData(tokens);
    }
  }, [searchQuery]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-4 mb-6 w-full">
        <ArrowLeft
          className="text-white cursor-pointer mr-auto"
          onClick={() => setView(view)}
        />
        <h2 className="text-white text-lg md:text-xl self-center w-full text-center font-bold">
          Select chain{" "}
        </h2>
      </div>

      <div className="relative mb-4">
        <Search className="absolute right-4 top-3 text-white w-5 h-5" />
        <input
          type="text"
          placeholder="Search by chain name"
          className="w-full bg-[#24203D] text-white pl-4 pr-4 py-3 rounded-xl outline-none font-medium chain-border border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto chain-scroll">
        {filteredData.map((token, i) => (
          <button
            key={i}
            className="flex items-center justify-between gap-5 p-3 hover:bg-[#24203D] rounded-lg cursor-pointer w-full"
            onClick={() => {
              if (view === "from")
                setSelectedChain({
                  chainId: token.chainId,
                  name: token.name,
                  symbol: token.symbol,
                  icon: token.metadata.logoURI,
                  groupID: token.groupId,
                });

              setView(view);
            }}
          >
            <div className="flex justify-start items-center gap-2">
              <img
                src={token?.metadata.logoURI || ""}
                alt={token?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="text-white text-left font-medium text-base md:text-lg">
                {token?.name}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChainSelect;
