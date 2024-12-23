import { rpcUrls } from "@/data/rpcUrls";
import { ethers } from "ethers";

interface GetBalanceParams {
  token?: string;
  chainId: number;
  address: string;
}

const getBalance = async ({ token, chainId, address }: GetBalanceParams) => {
  try {
    // Define the RPC URL for the specified chainId

    const rpcUrl = rpcUrls[chainId];
    if (!rpcUrl)
      throw new Error(`RPC URL not configured for chainId ${chainId}`);

    // Create a provider using ethers.js
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    let balance;

    if (!token || token === "0x0000000000000000000000000000000000000000") {
      // Fetch native token balance
      balance = await provider.getBalance(address);
    } else {
      // Fetch ERC-20 token balance
      const erc20Abi = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
      ];
      const tokenContract = new ethers.Contract(token, erc20Abi, provider);

      const rawBalance = await tokenContract.balanceOf(address);
      const decimals = await tokenContract.decimals();

      balance = ethers.utils.formatUnits(rawBalance, decimals);
    }

    return {
      data: balance.toString(),
      refetch: () => getBalance({ token, chainId, address }),
      error: null,
      isError: false,
      isLoading: false,
      isSuccess: true,
    };
  } catch (error) {
    return {
      data: null,
      refetch: null,
      error,
      isError: true,
      isLoading: false,
      isSuccess: false,
    };
  }
};

export default getBalance;
