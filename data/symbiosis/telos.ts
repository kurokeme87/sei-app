import { ITokens } from "../networks";

export const telosTokens: ITokens[] = [
  {
    chainId: 40,
    address: "0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E",
    symbol: "WTLOS",
    name: "Wrapped TLOS",
    coingeckoId: "telos",
    cmcId: 4660,
    logoURI:
      "https://raw.githubusercontent.com/telosnetwork/token-list/main/logos/wtlos.png",
    decimals: 18,
    tags: ["telosevm"],
    issuer: "Telos",
    issuer_link: "https://telos.net/",
  },
  {
    chainId: 41,
    address: "0xaE85Bf723A9e74d6c663dd226996AC1b8d075AA9",
    symbol: "WTLOS",
    name: "Wrapped TLOS",
    coingeckoId: "telos",
    cmcId: 4660,
    logoURI:
      "https://raw.githubusercontent.com/telosnetwork/token-list/main/logos/wtlos.png",
    decimals: 18,
    tags: ["telosevm"],
    issuer: "Telos",
    issuer_link: "https://telos.net/",
  },
  {
    chainId: 41,
    address: "0xe1aFB545B5701D884a674d90b31927BBd0fcA380",
    symbol: "USDT",
    name: "Tether USD (testnet)",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/elkfinance/tokens/main/logos/avax/0xc7198437980c041c805A1EDcbA50c1Ce5db95118/logo.png",
    decimals: 6,
    tags: [],
  },
  {
    chainId: 41,
    address: "0xD159C4E586421a507907faD705e067bfB350dc07",
    symbol: "FIAT",
    name: "Inflationary Asset (DEX Demo)",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/telosnetwork/token-list/main/logos/0xD159C4E586421a507907faD705e067bfB350dc07.png",
    decimals: 4,
    tags: ["telosevm"],
    issuer: "Telos",
  },
  {
    chainId: 41,
    address: "0xd9151F839a9d8D280C0a3a694C82b6865BbCa099",
    symbol: "CAKE",
    name: "PancakeSwap (DEX Demo)",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/telosnetwork/token-list/main/logos/0xd9151F839a9d8D280C0a3a694C82b6865BbCa099.png",
    decimals: 18,
    tags: ["telosevm"],
    issuer: "Telos",
    issuer_link: "https://telos.net/",
  },
  {
    chainId: 40,
    address: "0xB4B01216a5Bc8F1C8A33CD990A1239030E60C905",
    symbol: "STLOS",
    name: "Staked TLOS",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/telosnetwork/token-list/main/logos/stlos.png",
    decimals: 18,
    tags: ["telosevm"],
    issuer: "Telos",
    issuer_link: "https://telos.net/",
  },
  {
    chainId: 41,
    address: "0xa9991E4daA44922D00a78B6D986cDf628d46C4DD",
    symbol: "STLOS",
    name: "Staked TLOS",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/telosnetwork/token-list/main/logos/stlos.png",
    decimals: 18,
    tags: ["telosevm"],
    issuer: "Telos",
    issuer_link: "https://telos.net/",
  },
  {
    chainId: 40,
    address: "0x7627b27594bc71e6Ab0fCE755aE8931EB1E12DAC",
    symbol: "BTC.b",
    issuer: "LayerZero",
    issuer_link: "https://layerzero.network/",
    name: "Bitcoin",
    coingeckoId: "bitcoin",
    cmcId: 1,
    logoURI:
      "https://raw.githubusercontent.com/telosnetwork/token-list/main/logos/BTC.b.png",
    decimals: 8,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xA0fB8cd450c8Fd3a11901876cD5f17eB47C6bc50",
    symbol: "ETH",
    issuer: "LayerZero",
    issuer_link: "https://layerzero.network/",
    name: "Ethereum",
    coingeckoId: "ethereum",
    cmcId: 1027,
    logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0x8D97Cea50351Fb4329d591682b148D43a0C3611b",
    symbol: "USDC",
    issuer: "LayerZero",
    issuer_link: "https://layerzero.network/",
    name: "USD Coin",
    coingeckoId: "usd-coin",
    cmcId: 3408,
    decimals: 6,
    logoURI:
      "https://ipfs.telos.net/ipfs/QmXfzKRvjZz3u5JRgC4v5mGVbm9ahrUiB4DgzHBsnWbTMM",
    tags: ["stablecoin", "telosevm"],
  },
  {
    chainId: 40,
    address: "0x975Ed13fa16857E83e7C493C7741D556eaaD4A3f",
    symbol: "USDT",
    issuer: "LayerZero",
    issuer_link: "https://layerzero.network/",
    name: "Tether Stable Coin",
    coingeckoId: "tether",
    cmcId: 825,
    logoURI:
      "https://raw.githubusercontent.com/elkfinance/tokens/main/logos/avax/0xc7198437980c041c805A1EDcbA50c1Ce5db95118/logo.png",
    decimals: 6,
    tags: ["stablecoin", "telosevm"],
  },
  {
    chainId: 40,
    address: "0x26Ed0F16e777C94A6FE798F9E20298034930Bae8",
    symbol: "BNB",
    issuer: "LayerZero",
    issuer_link: "https://layerzero.network/",
    name: "Binance Coin",
    coingeckoId: "binancecoin",
    cmcId: 1839,
    logoURI:
      "https://raw.githubusercontent.com/elkfinance/tokens/main/logos/ftm/0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454/logo.png",
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0x922d641a426dcffaef11680e5358f34d97d112e1",
    symbol: "SUSHI",
    name: "Sushi",
    coingeckoId: "sushi",
    cmcId: 6758,
    logoURI: "https://cryptologos.cc/logos/sushiswap-sushi-logo.png",
    decimals: 18,
    tags: [],
  },
  {
    chainId: 40,
    address: "0x9A271E3748F59222f5581BaE2540dAa5806b3F77",
    symbol: "ZAP",
    name: "Zappy",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/zappy-finance/zappy-tokenlists/main/logos/0x9A271E3748F59222f5581BaE2540dAa5806b3F77/logo.png",
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xd2504a02fABd7E546e41aD39597c377cA8B0E1Df",
    symbol: "CHARM",
    name: "Omnidex",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://gateway.pinata.cloud/ipfs/QmUEJGwPMGBV154hcV8kp65a9TDM6XHJHTz5EFdfW3nDiq",
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0x730d2Fa7dC7642E041bcE231E85b39e9bF4a6a64",
    symbol: "KARMA",
    name: "Charm Dojo",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/telosnetwork/token-list/main/logos/0x730d2Fa7dC7642E041bcE231E85b39e9bF4a6a64.svg",
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xc6BC7A8dfA0f57Fe7746Ac434c01cD39679b372c",
    logoURI:
      "https://raw.githubusercontent.com/elkfinance/tokens/main/logos/telos/0xc6BC7A8dfA0f57Fe7746Ac434c01cD39679b372c/logo.png",
    symbol: "DOUGE",
    name: "DougeCoin",
    coingeckoId: false,
    cmcId: false,
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xE5dE07ec385B1BD55f6bB02c01860547be9D7C0B",
    symbol: "PIG",
    logoURI:
      "https://gateway.ipfs.io/ipfs/QmPThPaz3kjWaLjDAZKP8frpzaVm5Rvi5wCcUbag8QhgRL",
    name: "Big Pig",
    coingeckoId: false,
    cmcId: false,
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xEC0a873cdBE667E5bD68AF47932c948f872032d6",
    symbol: "GATe",
    logoURI: "https://gat.network/gat-logo-200x200.png",
    name: "Game Ace Token Extended",
    coingeckoId: false,
    cmcId: false,
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0x11fbfdf906d32753fa2a083dbd4fb25c1094c6c4",
    symbol: "APISH",
    logoURI:
      "https://raw.githubusercontent.com/telosnetwork/token-list/main/logos/0x11fbfdf906d32753fa2a083dbd4fb25c1094c6c4.png",
    name: "APISH ME",
    coingeckoId: false,
    cmcId: false,
    decimals: 9,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C",
    symbol: "ELK",
    logoURI:
      "https://raw.githubusercontent.com/elkfinance/tokens/main/logos/telos/0xeEeEEb57642040bE42185f49C52F7E9B38f8eeeE/logo.png",
    name: "ELK",
    issuer: "Elk Finance",
    issuer_link: "https://elk.finance/",
    coingeckoId: "elk-finance",
    cmcId: 10095,
    decimals: 18,
    tags: [],
  },
  {
    chainId: 40,
    address: "0xeEeEEb57642040bE42185f49C52F7E9B38f8eeeE",
    symbol: "ELK",
    logoURI:
      "https://raw.githubusercontent.com/elkfinance/tokens/main/logos/telos/0xeEeEEb57642040bE42185f49C52F7E9B38f8eeeE/logo.png",
    name: "ELK",
    issuer: "Elk Finance",
    issuer_link: "https://elk.finance/",
    coingeckoId: "elk-finance",
    cmcId: 10095,
    decimals: 18,
    tags: [],
  },
  {
    chainId: 40,
    address: "0xCC47EB13916a76e262b0EE48A71e3c7953091e7a",
    symbol: "SWAP",
    logoURI:
      "https://raw.githubusercontent.com/evm20/tokens/main/swaptoken.svg",
    name: "SWAP",
    coingeckoId: false,
    cmcId: false,
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xa84df7aFbcbCC1106834a5feD9453bd1219B1fb5",
    symbol: "Arc",
    name: "Archly Arc v1",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/ArchlyFi/token-list/main/logos/arc-logo.png",
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xE56c325a68b489812081E8A7b60b4017fd2AD280",
    symbol: "PE",
    name: "Positron",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/OmniDexFinance/tokenLogo/master/0xE56c325a68b489812081E8A7b60b4017fd2AD280.png",
    decimals: 4,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0x7e1cfe10949A6086A28C38aA4A43fDeAB34f198A",
    symbol: "DECO",
    name: "Destiny Coin",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://api.dstor.cloud/ipfs/QmVx1uSPTW7UQWGbz3ba5Nf7DPVyieEdRnQGHogo7t9Pw6",
    decimals: 4,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xE35b6D08050fef8E2bA2b1ED9C8f966a2346A500",
    symbol: "WAG",
    name: "WagyuSwap Token",
    coingeckoId: "wagyuswap",
    cmcId: 11354,
    logoURI:
      "https://raw.githubusercontent.com/wagyuswapapp/assets/master/blockchains/telos/assets/0xe35b6d08050fef8e2ba2b1ed9c8f966a2346a500/logo.png",
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xac45ede2098bc989dfe0798b4630872006e24c3f",
    symbol: "SLUSH",
    name: "Swapsicle SLUSH",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/swapsicledex/swapsicle-token-list/master/logos/telos/0xaC45EDe2098bc989Dfe0798B4630872006e24c3f/logo.png",
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xaae65b3b41f7c372c729b59b08ca93d53e9b79b3",
    symbol: "ICE",
    name: "Swapsicle ICE",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/swapsicledex/swapsicle-token-list/master/logos/telos/0xaae65b3b41f7c372c729b59b08ca93d53e9b79b3/logo.svg",
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xfB319EA5DDEd8cFe8Bcf9c720ed380b98874Bf63",
    symbol: "RBN",
    name: "Robinos",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/telosnetwork/token-list/main/logos/0xfB319EA5DDEd8cFe8Bcf9c720ed380b98874Bf63.png",
    decimals: 6,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0x2f15F85a6c346C0a2514Af70075259e503E7137B",
    symbol: "DMMY",
    logoURI:
      "https://raw.githubusercontent.com/telosnetwork/token-list/master/logos/dmmy.svg",
    name: "dummy☻DAO",
    coingeckoId: false,
    cmcId: false,
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xBA7DC28e0E33685ae4Ee2430BC4e418DbEa532FF",
    symbol: "FORT",
    name: "Fortis Coin (Legacy)",
    coingeckoId: false,
    cmcId: false,
    logoURI: "https://app.fortisfinance.io/Fortis.png",
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xd0208c3BE89002f62e42141d4542b15F45FB48aB",
    symbol: "FORT",
    name: "Fortis Coin",
    coingeckoId: false,
    cmcId: false,
    logoURI: "https://fortisnetwork.io/logos/White.svg",
    decimals: 18,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0x7097Ee02465FB494841740B1a2b63c21Eed655E7",
    symbol: "BANANA",
    name: "Banana",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/telosnetwork/token-list/master/logos/banana.png",
    decimals: 4,
    tags: ["telosevm"],
  },
  {
    chainId: 40,
    address: "0xe8876189A80B2079D8C0a7867e46c50361D972c1",
    symbol: "Arc",
    name: "Archly Arc v2",
    coingeckoId: false,
    cmcId: false,
    logoURI:
      "https://raw.githubusercontent.com/ArchlyFi/token-list/main/logos/arc-logo.png",
    decimals: 18,
    tags: ["telosevm"],
  },
];
