import { ITokens } from "../networks";

export const arbitrumNovaTokens: ITokens[] = [
  {
    address: "0x750ba8b76187092B0D1E87E28daaf484d1b5273b",
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/ArchlyFi/token-list/main/logos/USDC.png",
  },
  {
    address: "0x1d05e4e72cD994cdF976181CfB0707345763564d",
    name: "Wrapped BTC",
    symbol: "WBTC",
    decimals: 8,
    logoURI:
      "https://raw.githubusercontent.com/ArchlyFi/token-list/main/logos/WBTC.png",

    coingeckoId: "wrapped-bitcoin",
  },
  {
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    name: "Dai",
    symbol: "DAI",
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/ArchlyFi/token-list/main/logos/DAI.png",

    coingeckoId: "dai",
  },
  {
    address: "0xf823C3cD3CeBE0a1fA952ba88Dc9EEf8e0Bf46AD",
    name: "Arbitrum",
    symbol: "ARB",
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/ArchlyFi/token-list/main/logos/ARB.png",

    coingeckoId: "arbitrum",
  },
];
