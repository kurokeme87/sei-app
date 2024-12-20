import { ITokens } from "../networks";

export const baseTokens: ITokens[] = [
  {
    chainId: 8453,
    name: "Ether",
    address: "0x0000000000000000000000000000000000000000", // Native ETH, not an ERC-20 contract
    logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    symbol: "ETH",
    decimals: 18,
    chainURI: "https://basescan.org",
  },
  {
    chainId: 1,
    address: "0xbe9895146f7af43049ca1c1ae358b0541ea49704",
    name: "Coinbase Wrapped Staked ETH",
    symbol: "CBETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/27008/thumb/cbeth.png?1709186989",
  },
  {
    chainId: 1,
    address: "0x0c37bcf456bc661c14d596683325623076d7e283",
    name: "Aeron",
    symbol: "ARNX",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/1124/thumb/ARNX-token-logo-256x256.png?1696502218",
  },
  {
    chainId: 1,
    address: "0x67c5870b4a41d4ebef24d2456547a03f1f3e094b",
    name: "GoodDollar",
    symbol: "G",
    decimals: 2,
    logoURI:
      "https://assets.coingecko.com/coins/images/14782/thumb/G__Coin_%281%29.png?1696514451",
  },
  {
    chainId: 1,
    address: "0x467719ad09025fcc6cf6f8311755809d45a5e5f3",
    name: "Axelar",
    symbol: "AXL",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/27277/thumb/V-65_xQ1_400x400.jpeg?1696526329",
  },
  {
    chainId: 1,
    address: "0x986ee2b944c42d017f52af21c4c69b84dbea35d8",
    name: "BitMart",
    symbol: "BMX",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/5236/thumb/bitmart-token.png?1696505741",
  },
  {
    chainId: 1,
    address: "0xca7013ba4bf76bcdc3ffc71735896682644f47c2",
    name: "Degen",
    symbol: "DGN",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/31606/thumb/Degen.png?1696530422",
  },
  {
    chainId: 1,
    address: "0xbf5495efe5db9ce00f80364c8b423567e58d2110",
    name: "Renzo Restaked ETH",
    symbol: "EZETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/34753/thumb/eth_renzo_logo_%281%29.png?1705956747",
  },
  {
    chainId: 1,
    address: "0x77fba179c79de5b7653f68b5039af940ada60ce0",
    name: "Ampleforth Governance",
    symbol: "FORTH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/14917/thumb/photo_2021-04-22_00.00.03.jpeg?1696514579",
  },
  {
    chainId: 1,
    address: "0xc8871267e07408b89aa5aecc58adca5e574557f8",
    name: "Instadapp USDC",
    symbol: "IUSDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/25820/thumb/iUSDC_100x100.png?1696524905",
  },
  {
    chainId: 1,
    address: "0x9ad37205d608b8b219e6a2573f922094cec5c200",
    name: "iZUMi Finance",
    symbol: "IZI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/21791/thumb/izumi-logo-symbol.png?1696521144",
  },
  {
    chainId: 1,
    address: "0x24d73bca2bd9c3a61e99dfc7cb86d3c379ebded7",
    name: "Micro AI",
    symbol: "MAI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/32811/thumb/mai.png?1699537844",
  },
  {
    chainId: 1,
    address: "0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3",
    name: "Magic Internet Money",
    symbol: "MIM",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/16786/thumb/mimlogopng.png?1696516358",
  },
  {
    chainId: 1,
    address: "0xf134519cbe2042b06ee7ce20df51d09b55559896",
    name: "Mochi",
    symbol: "MOCHI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/28981/thumb/mochi-logo.png?1696527954",
  },
  {
    chainId: 1,
    address: "0x516e2758b044433371076a48127b8cfa7b0bdb43",
    name: "Smudge Lord",
    symbol: "SMUDGE",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/30268/thumb/logo-A.png?1696529175",
  },
  {
    chainId: 1,
    address: "0x77a90b04d64189d4d09508612c09219bc6816bdc",
    name: "Toshi Tools",
    symbol: "TOSHI",
    decimals: 9,
    logoURI:
      "https://assets.coingecko.com/coins/images/28959/thumb/toshi_logo_200_by_200.png?1696527932",
  },
  {
    chainId: 1,
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/thumb/usdc.png?1696506694",
  },
  {
    chainId: 1,
    address: "0x59d9356e565ab3a36dd77763fc0d87feaf85508c",
    name: "Mountain Protocol USD",
    symbol: "USDM",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/31719/thumb/usdm.png?1696530540",
  },
  {
    chainId: 1,
    address: "0x8baef8c9568c21b1a2b2fd048f8b4da835691fd0",
    name: "USD ZEE",
    symbol: "USDZ",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/24876/thumb/003.png?1696524035",
  },
  {
    chainId: 1,
    address: "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0",
    name: "Wrapped stETH",
    symbol: "WSTETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/18834/thumb/wstETH.png?1696518295",
  },
  {
    chainId: 1,
    address: "0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3",
    name: "Origin Ether",
    symbol: "OETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/29733/thumb/OETH.png?1696528663",
  },
];
