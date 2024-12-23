import { ITokens } from "../networks";

export const bitcoinTokens: ITokens[] = [
  // {
  //   address:
  //     "42ed2e06688759d306d6f67ba20709af05121b19885e7366bf5c4301399d359di0",
  //   name: "Pizza",
  //   symbol: "PIZZA",
  //   decimals: 18,
  //   logoURI:
  //     "https://raw.githubusercontent.com/foxwallet/tokenlist/main/img/PIZZA.webp",
  //   type: "BRC20",
  // },
  {
    address: "N/A", // Bitcoin does not use smart contract addresses
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8,
    type: "COIN", // Using "COIN" to indicate it's the native currency
    logoURI: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
];
