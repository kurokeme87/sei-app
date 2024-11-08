export const network = [
  {
    groupID: "arbitrum",
    chainId: 421613,
    address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
    symbol: "ETH",
    name: "Arbitrum",
    decimals: 18,
    vmType: "evm",
    metadata: {
      logoURI: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=035",
      verified: true,
      isNative: true,
    },
  },

  // Movement MEVM
  // {
  //   groupID: "MEVM",
  //   chainId: 987654,
  //   address: "0x0000000000000000000000000000000000000000",
  //   symbol: "MEVM",
  //   name: "Movement MEVM",
  //   decimals: 18,
  //   vmType: "evm",
  //   metadata: {
  //     logoURI: "https://cryptologos.cc/logos/coinmetro-token-xcm-logo.png",
  //     verified: false,
  //     isNative: true,
  //   },
  // },

  {
    groupID: "eth",
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
    groupID: "optimism",
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
  },

  // Mantle
  // {
  //   groupID: "MNT",
  //   chainId: 5000,
  //   address: "0x0000000000000000000000000000000000000000",
  //   symbol: "MNT",
  //   name: "Mantle",
  //   decimals: 18,
  //   vmType: "evm",
  //   metadata: {
  //     logoURI: "https://cryptologos.cc/logos/mantle-mnt-logo.svg?v=035",
  //     verified: false,
  //     isNative: true,
  //   },
  // },

  // Base Monad
  {
    groupID: "base",
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

  // Polygon zkEVM
  // {
  //   groupID: "ZKEVM",
  //   chainId: 1101,
  //   address: "0x0000000000000000000000000000000000000000",
  //   symbol: "ETH",
  //   name: "Polygon zkEVM Ether",
  //   decimals: 18,
  //   vmType: "evm",
  //   metadata: {
  //     logoURI: "https://assets.relay.link/icons/1101/light.png",
  //     verified: true,
  //     isNative: true,
  //   },
  // },
  // {
  //   groupID: "SCROLL",
  //   chainId: 534351,
  //   address: "0x0000000000000000000000000000000000000000",
  //   symbol: "SCR",
  //   name: "Scroll",
  //   decimals: 18,
  //   vmType: "evm",
  //   metadata: {
  //     logoURI:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTtMWmmj_x1TEQJtBpOzkarPSZdIxZ23K-8w&s",
  //     verified: true,
  //     isNative: true,
  //   },
  // },
  {
    groupID: "avax",
    chainId: 43114,
    address: "0x0000000000000000000000000000000000000000",
    symbol: "AVAX",
    name: "Avalanche",
    decimals: 18,
    vmType: "evm",
    metadata: {
      logoURI: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=035",
      verified: true,
      isNative: true,
    },
  },

  // {
  //   groupID: "GRAV",
  //   chainId: 1625,
  //   address: "0x0000000000000000000000000000000000000000",
  //   symbol: "G",
  //   name: "Gravity",
  //   decimals: 18,
  //   vmType: "evm",
  //   metadata: {
  //     logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/32120.png",
  //     verified: true,
  //     isNative: true,
  //     blockExplorerUrls: ["https://explorer.gravity.xyz"],
  //     rpcUrls: ["https://rpc.gravity.xyz"],
  //   },
  // },
  // {
  //   groupID: "KAVA",
  //   chainId: 2222,
  //   address: "0x0000000000000000000000000000000000000000",
  //   symbol: "KAVA",
  //   name: "Kava",
  //   decimals: 18,
  //   vmType: "evm",
  //   metadata: {
  //     logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/4846.png",
  //     verified: true,
  //     isNative: true,
  //   },
  // },
  {
    groupID: "linea",
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
  // {
  //   groupID: "MANTA",
  //   chainId: 169,
  //   address: "0x0000000000000000000000000000000000000000",
  //   symbol: "MANTA",
  //   name: "Manta",
  //   decimals: 18,
  //   vmType: "evm",
  //   metadata: {
  //     logoURI:
  //       "https://s2.coinmarketcap.com/static/img/coins/128x128/13631.png",
  //     verified: true,
  //     isNative: true,
  //   },
  // },
  // {
  //   groupID: "MANTLE",
  //   chainId: 5000,
  //   address: "0x0000000000000000000000000000000000000000",
  //   symbol: "MNTL",
  //   name: "Mantle",
  //   decimals: 18,
  //   vmType: "evm",
  //   metadata: {
  //     logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/27075.png",
  //     verified: true,
  //     isNative: true,
  //     rpcUrl: ["https://rpc.ankr.com/mantle"],
  //     blockExplorerUrls: ["https://explorer.mantle.xyz"],
  //   },
  // },
  //

  // {
  //   groupID: "TAIKO",
  //   chainId: 167000,
  //   address: "0x0000000000000000000000000000000000000000",
  //   symbol: "TAIKO",
  //   name: "Taiko",
  //   decimals: 18,
  //   vmType: "evm",
  //   metadata: {
  //     logoURI:
  //       "https://taikoscan.io/assets/taiko/images/svg/logos/chain-light.svg?v=24.5.4.0",
  //     verified: true,
  //     isNative: true,
  //     rpcUrls: ["https://rpc.mainnet.taiko.xyz"],
  //     blockExplorerUrls: ["https://taikoscan.io"],
  //   },
  // },

  {
    groupID: "polygon",
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
  },
];
