import { ITokens } from "../networks";

export const taikoTokens: ITokens[] = [
  {
    address: "0x07d83526730c7438048D55A4fc0b850e2aaB6f0b",
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    logoURI: "https://wallet.foxnb.net/tokens/cryptologos/USDC.webp",
  },
  {
    address: "0x19e26B0638bf63aa9fa4d14c6baF8D52eBE86C5C",
    name: "Bridged USDC (Stargate)",
    symbol: "USDC.e",
    decimals: 6,
    logoURI:
      "https://izumi-finance.oss-ap-southeast-1.aliyuncs.com/tokens/usdcstar.png",
  },
  {
    address: "0xA51894664A773981C6C112C43ce576f315d5b1B6",
    name: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
    logoURI:
      "https://izumi-finance.oss-ap-southeast-1.aliyuncs.com/tokens/WETH.png",
  },
  {
    address: "0xA9d23408b9bA935c230493c40C73824Df71A0975",
    name: "TAIKO Token",
    symbol: "TAIKO",
    decimals: 18,
    logoURI:
      "https://izumi-finance.oss-ap-southeast-1.aliyuncs.com/tokens/taiko.png",
  },
  {
    address: "0x2D9E1dA77F086c50f93db46E554974B71536a9Ee",
    name: "MAGA Token",
    symbol: "MAGA",
    decimals: 18,
    logoURI:
      "https://izumi-finance.oss-ap-southeast-1.aliyuncs.com/tokens/maga.png",
    priceSource: "cmc:maga-ethereum",
  },
  {
    address: "0x9c2dc7377717603eB92b2655c5f2E7997a4945BD",
    name: "Tether USD (Stargate)",
    symbol: "USDT",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/foxwallet/tokenlist/main/img/USDT.webp",
    tag: "default",
  },
  {
    address: "0x2DEF195713CF4a606B49D07E520e22C17899a736",
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/foxwallet/tokenlist/main/img/USDT.webp",
  },
  {
    address: "0xa2fba3fde6c9e7386716b577e1258577cb9b5bf7",
    name: "iZUMi Token",
    symbol: "iZi",
    decimals: 18,
    logoURI:
      "https://izumi-finance.oss-ap-southeast-1.aliyuncs.com/tokens/izumi.svg",
  },
  {
    address: "0x5217c8f3b7fb8b6501c8ff2a4c09b14b4b08c9f9",
    name: "Affine ultraETHs 2.0",
    symbol: "ultraETHs",
    decimals: 18,
    logoURI:
      "https://izumi-finance.oss-ap-southeast-1.aliyuncs.com/tokens/ultraeths.png",
  },
  {
    address: "0xf7fb2df9280eb0a76427dc3b34761db8b1441a49",
    name: "Merlin BTC",
    symbol: "M-BTC",
    decimals: 18,
    logoURI:
      "https://izumi-finance.oss-ap-southeast-1.aliyuncs.com/tokens/mbtc.svg",
  },
  {
    address: "0x93919784c523f39cacaa98ee0a9d96c3f32b593e",
    name: "uniBTC",
    symbol: "uniBTC",
    decimals: 8,
    logoURI:
      "https://izumi-finance.oss-ap-southeast-1.aliyuncs.com/tokens/unibtc.png",
  },
];
