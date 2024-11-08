"use client";

import { useState } from "react";
import { NetworkDropdown } from "./Dropdown";
import WalletBalances from "./WalletBalances";
import TokenDropdown from "./TokenDropdown";

const Assets = () => {
  const [selectedNetwork, setSetelectedNetwork] = useState({
    chainId: "",
    name: "",
    image: "",
  });
  const [selectedToken, setSetelectedToken] = useState({
    chainId: "",
    name: "",
    image: "",
  });
  const [tokenAddresses, setTokenAddresses] = useState([]);

  const handleReset = () => {
    setSetelectedNetwork({ chainId: "", name: "", image: "" });
    setSetelectedToken({ chainId: "", image: "", name: "" });
    setTokenAddresses([]);
  };
  // console.log(selectedToken, "selectedToken");

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-3">
          <TokenDropdown
            setTokenAddresses={setTokenAddresses}
            selectedNetworkId={selectedNetwork.chainId}
            selectedToken={selectedToken}
            setSetelectedToken={setSetelectedToken}
          />
          <NetworkDropdown
            selectedNetwork={selectedNetwork}
            setSetelectedNetwork={setSetelectedNetwork}
            setTokenAddresses={setTokenAddresses}
          />
        </div>
        <button
          onClick={handleReset}
          className="underline text-xs font-medium text-[#999]"
        >
          Reset
        </button>
      </div>

      <WalletBalances
        tokenAddresses={tokenAddresses}
        selectedNetwork={selectedNetwork}
      />
    </div>
  );
};

export default Assets;
