export interface ITokens {
  groupId?: string;
  chainId?: number;
  address?: string;
  symbol?: string;
  name?: string;
  decimals?: number;
  vmType?: string;
  metadata?: {
    logoURI?: string;
    verified?: boolean;
    isNative?: boolean;
    rpcUrls?: string[];
    blockExplorerUrls?: string[];
  };
  addresses?: any;
}

export const tokens: ITokens[] = [
  {
    groupId: "arbitrum",
    chainId: 42161,
    address: "0x0000000000000000000000000000000000000000", // Replace with specific Arbitrum token address if applicable
    symbol: "ETH",
    name: "Arbitrum",
    decimals: 18,
    vmType: "evm",
    metadata: {
      logoURI:
        "https://icons-ckg.pages.dev/stargate-light/networks/arbitrum.svg",
      verified: true,
      isNative: true,
      rpcUrls: ["https://arb1.arbitrum.io/rpc"],
      blockExplorerUrls: ["https://arbiscan.io"],
    },
    addresses: {
      "1": "", // No native Arbitrum token on Ethereum Mainnet
      "10": "", // No native Arbitrum token on Optimism
      "137": "", // No native Arbitrum token on Polygon Mainnet
      "80001": "", // No native Arbitrum token on Mumbai Testnet
      "42161": "0x0000000000000000000000000000000000000000", // Replace with native ETH address on Arbitrum
    },
  },

  {
    groupId: "eth",
    chainId: 1,
    address: "",
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    vmType: "evm",
    metadata: {
      logoURI:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
      verified: true,
      isNative: true,
    },
  },
  // Optimism
  {
    groupId: "optimism",
    chainId: 10,
    address: "0xb2EA9527bF05bC3b73320a1ec18bd4F2Fe88d952",
    symbol: "ETH",
    name: "Optimism",
    decimals: 18,
    vmType: "evm",
    metadata: {
      logoURI:
        "https://icons-ckg.pages.dev/stargate-light/networks/optimism.svg",
      verified: true,
      isNative: true,
      rpcUrls: ["https://teloscan.io"],
      blockExplorerUrls: ["https://mainnet.optimism.io"],
    },
    addresses: {
      1: "", // No native Optimism token on Ethereum Mainnet
      10: "", // Optimism (Native ETH)
      137: "", // No native Optimism token on Polygon Mainnet
      80001: "", // No native Optimism token on Mumbai Testnet
      42161: "", // No native Optimism token on Arbitrum
    },
  },
  {
    groupId: "usdc",
    chainId: 10,
    address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607", // USDC on Optimism
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    vmType: "evm",
    metadata: {
      logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg",
      verified: true,
      isNative: false,
      rpcUrls: ["https://mainnet.optimism.io"],
      blockExplorerUrls: ["https://optimistic.etherscan.io"],
    },
    addresses: {
      1: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // Ethereum Mainnet
      10: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607", // Optimism
      137: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // Polygon Mainnet
      80001: "0xd35CCeEAD182dcee0F148EbaC9447DA2c4D449c4", // Mumbai Testnet
      42161: "0xFF970A61A04b1Ca14834A43f5de4533ebDDB5CC8", // Arbitrum
    },
  },

  // Base Monad
  {
    groupId: "base",
    chainId: 8453,
    address: "0x44971ABF0251958492FeE97dA3e5C5adA88B9185",
    symbol: "BASE",
    name: "Base",
    decimals: 18,
    vmType: "evm",
    metadata: {
      logoURI: "https://assets.relay.link/icons/8453/light.png",
      verified: false,
      isNative: true,
      rpcUrls: ["https://base-rpc.publicnode.com"],
      blockExplorerUrls: ["https://basescan.org"],
    },
  },

  {
    groupId: "linea",
    chainId: 59144,
    address: "0x4F959C9968c54170b43CC0Ec09DEce5B66E12da6",
    symbol: "LAB",
    name: "Linea",
    decimals: 18,
    vmType: "evm",
    metadata: {
      logoURI: "https://l2beat.com/icons/linea.png",
      verified: true,
      isNative: true,
    },
  },

  {
    groupId: "polygon",
    chainId: 137,
    address: "0x455e53cbb86018ac2b8092fdcd39d8444affc3f6",
    symbol: "MATIC",
    name: "Polygon",
    decimals: 18,
    vmType: "evm",
    metadata: {
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
      verified: true,
      isNative: true,
    },
    addresses: {
      1: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0", // Ethereum Mainnet
      10: "0x3e5c6bf06ef92fcfd9718bb6f3cf122f2eaff57b", // Optimism
      137: "0x0000000000000000000000000000000000001010", // Polygon Mainnet
      80001: "0x9c3c9283d3e44854697cd22d3faa240cfb032889", // Mumbai Testnet
      42161: "0x3a4aE3F51be57C30b1D188C8f19cbF07dF3D4A41", // Arbitrum
    },
  },
  {
    groupId: "dai",
    chainId: 10,
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", // DAI on Optimism
    symbol: "DAI",
    name: "Dai Stablecoin",
    decimals: 18,
    vmType: "evm",
    metadata: {
      logoURI: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg",
      verified: true,
      isNative: false,
      rpcUrls: ["https://mainnet.optimism.io"],
      blockExplorerUrls: ["https://optimistic.etherscan.io"],
    },
    addresses: {
      1: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // Ethereum Mainnet
      10: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", // Optimism
      137: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", // Polygon Mainnet
      80001: "", // No DAI on Mumbai Testnet
      42161: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1", // Arbitrum
    },
  },
  {
    groupId: "avalanche",
    chainId: 10,
    address: "", // No native AVAX on Optimism
    symbol: "AVAX",
    name: "Avalanche",
    decimals: 18,
    vmType: "evm",
    metadata: {
      logoURI: "https://cryptologos.cc/logos/avalanche-avax-logo.svg",
      verified: true,
      isNative: false,
      rpcUrls: ["https://mainnet.optimism.io"],
      blockExplorerUrls: ["https://optimistic.etherscan.io"],
    },
    addresses: {
      1: "", // No native AVAX on Ethereum Mainnet
      10: "", // No native AVAX on Optimism
      137: "", // No native AVAX on Polygon Mainnet
      80001: "", // No native AVAX on Mumbai Testnet
      43114: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", // Avalanche Mainnet
    },
  },
  {
    groupId: "bnb",
    chainId: 10,
    address: "", // No native BNB on Optimism
    symbol: "BNB",
    name: "Binance Coin",
    decimals: 18,
    vmType: "evm",
    metadata: {
      logoURI: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg",
      verified: true,
      isNative: false,
      rpcUrls: ["https://mainnet.optimism.io"],
      blockExplorerUrls: ["https://optimistic.etherscan.io"],
    },
    addresses: {
      1: "", // No native BNB on Ethereum Mainnet
      10: "", // No native BNB on Optimism
      56: "0xb8c77482e45f1f44de1745f52c74426c631bdd52", // Binance Smart Chain
      137: "", // No native BNB on Polygon Mainnet
      80001: "", // No native BNB on Mumbai Testnet
    },
  },
];
