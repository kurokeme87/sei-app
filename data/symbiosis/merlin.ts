import { ITokens } from "../networks";
import { TokenSymbol } from "./TokenSymbol";
import { ChainId } from "./chainId";

const baseURL = "https://izumi-finance.oss-ap-southeast-1.aliyuncs.com/tokens/";

export const merlinTokens: ITokens[] = [
  {
    name: "Bitcoin",
    symbol: TokenSymbol.BTC,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "btc.png",
    address: "0xF6D226f9Dc15d9bB51182815b320D3fBE324e1bA", //WBTC
    decimals: 18,
  },
  {
    name: "Wrapped BTC",
    symbol: TokenSymbol.WBTC,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "btc.png",
    address: "0xF6D226f9Dc15d9bB51182815b320D3fBE324e1bA",
    decimals: 18,
  },
  {
    name: "Merlin's Seal BTC",
    symbol: TokenSymbol.MBTC,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "mbtc.svg",
    address: "0xb880fd278198bd590252621d4cd071b1842e9bcd",
    decimals: 18,
  },
  {
    name: "Solv BTC",
    symbol: TokenSymbol.SOLVBTC,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "solvbtc.png",
    address: "0x41D9036454BE47d3745A823C4aaCD0e29cFB0f71",
    decimals: 18,
  },
  {
    name: "uniBTC",
    symbol: TokenSymbol.UNIBTC,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "unibtc.png",
    address: "0x93919784C523f39CACaa98Ee0a9d96c3F32b593e",
    decimals: 8,
  },
  {
    name: "iZUMi Bond USD",
    symbol: TokenSymbol.IUSD,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "iusd.png",
    address: "0x0A3BB08b3a15A19b4De82F8AcFc862606FB69A2D",
    decimals: 18,
  },
  {
    name: "MERL Token",
    symbol: TokenSymbol.MERL,
    chainId: ChainId.Merlin,
    address: "0x5c46bFF4B38dc1EAE09C5BAc65872a1D8bc87378",
    decimals: 18,
    logoURI: baseURL + "merl.png",
  },
  {
    name: "MerlinSwap Token",
    symbol: TokenSymbol.MP,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "mp.png",
    address: "0xbd40c74cb5cf9f9252B3298230Cb916d80430bBa",
    decimals: 18,
  },
  {
    name: "HUHU CAT",
    symbol: TokenSymbol.HUHU,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "huhu.png",
    address: "0x7a677e59dC2C8a42d6aF3a62748c5595034A008b",
    decimals: 18,
  },
  {
    name: "Bridged BRC20 VOYA",
    symbol: TokenSymbol.VOYA,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "voya.png",
    address: "0x480e158395cc5b41e5584347c495584ca2caf78d",
    decimals: 18,
  },
  {
    name: "Merlin's Seal USDC",
    symbol: TokenSymbol.MUSDC,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "musdc.svg",

    address: "0x6b4ecada640f1b30dbdb68f77821a03a5f282ebe",
    decimals: 6,
  },
  {
    name: "Merlin's Seal USDT",
    symbol: TokenSymbol.MUSDT,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "musdt.svg",

    address: "0x967aec3276b63c5e2262da9641db9dbebb07dc0d",
    decimals: 6,
  },
  {
    name: "SolvBTC Ethena",
    symbol: TokenSymbol.SOLVBTCENA,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "solvbtcena.png",

    address: "0x88c618b2396c1a11a6aabd1bf89228a08462f2d2",
    decimals: 18,
  },
  {
    name: "Party Token",
    symbol: TokenSymbol.PARTY,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "party.png",

    address: "0x4D9882a3BB13cc086367D0aE964367e6B7ea246f",
    decimals: 18,
  },
  {
    name: "Bridged BRC20 sats",
    symbol: TokenSymbol.MSATS,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "msats.png",

    address: "0x4DCb91Cc19AaDFE5a6672781EB09abAd00C19E4c",
    decimals: 18,
  },
  {
    name: "Bridged BRC20 rats",
    symbol: TokenSymbol.MRATS,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "mrats.png",

    address: "0x69181A1f082ea83A152621e4FA527C936abFa501",
    decimals: 18,
  },
  {
    name: "Bridged BRC20 ordi",
    symbol: TokenSymbol.MORDI,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "mordi.png",

    address: "0x0726523Eba12EdaD467c55a962842Ef358865559",
    decimals: 18,
  },
  {
    name: "Bridged BRC20 xmonk",
    symbol: TokenSymbol.XMONK,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "xmonk.png",

    address: "0x7460c3dfaD7dFcDB366d52707De3026fc4C4aa3b",
    decimals: 18,
  },
  {
    name: "Bridged BRC20 RUFI",
    symbol: TokenSymbol.RUFI,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "rufi.svg",

    address: "0x9bd60d6FC99843207B8149f9190438C1F81BDdcD",
    decimals: 18,
  },
  {
    name: "Bridged BRC20 MNER",
    symbol: TokenSymbol.MNER,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "mner.png",

    address: "0x27622B326Ff3ffa7dc10AE291800c3073b55AA39",
    decimals: 18,
  },
  {
    name: "Escrow MerlinSwap Token",
    symbol: TokenSymbol.ESMP,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "esmp.png",

    address: "0x7126bd63713a7212792b08fa2c39d39190a4cf5b",
    decimals: 18,
  },
  {
    name: "Bridged BRC20 sats",
    symbol: TokenSymbol.SATS,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "sats.png",

    address: "0x4dbe39D987665d0CB9F921B50B2673346b87cAfA",
    decimals: 18,
  },
  {
    name: "Bridged BRC20 ordi",
    symbol: TokenSymbol.ORDI,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "ordi.png",

    address: "0x7dcb50b2180BC896Da1200D2726a88AF5D2cBB5A",
    decimals: 18,
  },
  {
    name: "Bridged BRC20 rats",
    symbol: TokenSymbol.RATS,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "rats.png",

    address: "0x1411626970e70f5b5d3351E339B58F61BDC68073",
    decimals: 18,
  },
  {
    name: "Bridged BRC20 rcsv",
    symbol: TokenSymbol.RCSV,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "rcsv.png",

    address: "0x4a7aa0d04b36cd5cecaac9828de84f70346b840d",
    decimals: 18,
  },
  {
    name: "Bridged BRC20 BTCs",
    symbol: TokenSymbol.BTCS,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "btcs.png",

    address: "0x24C1BD5c41D0b0813730B5895e9F343FB8477BEA",
    decimals: 18,
  },
  {
    name: "Bridged Runes THE•BITMAP•TOKEN",
    symbol: TokenSymbol.BITMAP,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "bitmap.png",

    address: "0x7b0400231Cddf8a7ACa78D8c0483890cd0c6fFD6",
    decimals: 18,
  },
  {
    name: "Bridged Runes THIS•SONG•ABOUT•NFT",
    symbol: TokenSymbol.NFT,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "nftmerlin.png",

    address: "0xfe61fd35773C11Ab5e0738e6374837670341befc",
    decimals: 18,
  },
  {
    name: "Bridged Runes DOG•GO•TO•THE•MOON",
    symbol: TokenSymbol.DOG,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "dogtothemoon.png",

    address: "0x32A4b8b10222F85301874837F27F4c416117B811",
    decimals: 5,
  },
  {
    name: "Bridged Runes NUSD•NUSD•NUSD•NUSD",
    symbol: TokenSymbol.NUSD,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "nusd.png",

    address: "0x3addc04734ac82e6a03947187d400DdcD1995546",
    decimals: 0,
  },
  {
    name: "Bridged Runes UNCOMMON•GOODS",
    symbol: TokenSymbol.GOODS,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "goods.png",

    address: "0xA2B1f801F67850a536969be0e620aE87b0dA0a2A",
    decimals: 0,
  },
  {
    name: "Bridged Runes RUNE•FINANCIAL",
    symbol: TokenSymbol.RUFIRUNE,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "rufi.svg",

    address: "0x48E6AcA1B480dc98E2CaC560B10c47CB35eE838c",
    decimals: 18,
  },
  {
    name: "Bridged Runes LOBO•THE•WOLF•PUP",
    symbol: TokenSymbol.WOLF,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "lobothewolfpup.png",

    address: "0x9458eA21932515dd0E82543891068F065B88A98a",
    decimals: 8,
  },
  {
    name: "Bridged Runes BAMK•OF•NAKAMOTO•DOLLAR",
    symbol: TokenSymbol.BAMK,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "bamk.png",

    address: "0xE6b1aDb4d097898106Fd6829cCfaa5C9f7117Bca",
    decimals: 8,
  },
  {
    name: "Bridged Runes RUNES•X•BITCOIN",
    symbol: TokenSymbol.XBITCOIN,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "runesxbitcoin.png",

    address: "0x803e4c37f5867dbdcf7f717ce2c09a94e5800ae0",
    decimals: 0,
  },
  {
    name: "BITUSD Token",
    symbol: TokenSymbol.BITUSD,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "bitusd.png",

    address: "0xC2EB7Ea813e10a46a01628df848299Fb3312B0cE",
    decimals: 18,
  },
  {
    name: "Jeff Token",
    symbol: TokenSymbol.JEFF,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "jeff.png",

    address: "0xd79f579d7e34782465863a6f837b2692bda7b989",
    decimals: 18,
  },
  {
    name: "Merlinstarter Token",
    symbol: TokenSymbol.MSTAR,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "mstar.png",

    address: "0x09401c470a76Ec07512EEDDEF5477BE74bac2338",
    decimals: 18,
  },
  {
    name: "MAGE Token",
    symbol: TokenSymbol.MAGE,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "mage.png",

    address: "0x825e2cfBb71a92e09Ef73D9e96d15cE2e0f63E9F",
    decimals: 18,
  },
  {
    name: "MDBL Token",
    symbol: TokenSymbol.MDBL,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "mdbl.png",

    address: "0x8Aed42735027aa6d97023D8196B084eCFbA701af",
    decimals: 18,
  },
  {
    name: "RMNER Token",
    symbol: TokenSymbol.RMNER,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "rmner.png",

    address: "0x4fd67c2d9e8c4fdd9c66954bafe124ca50fc1819",
    decimals: 18,
  },
  {
    name: "Bridged prc-20 pols",
    symbol: TokenSymbol.POLS,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "pols.png",

    address: "0x4c67addF3AF13e84f5F4e4E54e8cF5D40AB2A36D",
    decimals: 18,
  },
  {
    name: "Bridged bsc-20 bnbs",
    symbol: TokenSymbol.BNBS,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "bnbs.png",

    address: "0x33c70a08D0D427eE916576a7594b50d7F8f3FbE1",
    decimals: 18,
  },
  {
    name: "Influpia Token",
    symbol: TokenSymbol.ING,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "ing.svg",

    address: "0x07884346a65F95276C2b0E56b17165b191ab2C49",
    decimals: 18,
  },
  // {
  //     name: "DragonBall Token",
  //     symbol: TokenSymbol.DRAGONBALL,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'dragonball.png',
  //
  //
  //             address: '0x8de7eea34a72059324dbbed7f2f49fb2190abd56',
  //             decimals: 18,
  //
  //
  // },

  {
    name: "Elixir Token",
    symbol: TokenSymbol.ELXR,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "elxr.png",

    address: "0xa49fc6e5bbb77622b96bf242fee4028b8b61ffa0",
    decimals: 18,
  },
  // {
  //     name: "DRAGON Token",
  //     symbol: TokenSymbol.DRAGON,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'dragonmerlin.png',
  //
  //
  //             address: '0x1dd67628db8661186de74a3adc6e3f44def5709e',
  //             decimals: 18,
  //
  //
  // },
  // {
  //     name: "King Arthur Token",
  //     symbol: TokenSymbol.ART,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'art.png',
  //
  //
  //             address: '0xdbbc61004663f0116dd5ae5751436c722b7168e6',
  //             decimals: 18,
  //
  //
  // },
  // {
  //     name: "MRC404 Token",
  //     symbol: TokenSymbol.MRC404,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'mrc404.png',
  //
  //
  //             address: '0x6df1b05ac85007bcd4f25aca7ab505415b3d51dc',
  //             decimals: 18,
  //
  //
  // },
  // {
  //     name: "RAT404 Token",
  //     symbol: TokenSymbol.RAT404,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'rat404.png',
  //
  //
  //             address: '0xbf108e20fd47995b2b1a316db76c1c145e5bdeac',
  //             decimals: 18,
  //
  //
  // },
  // {
  //     name: "BIUU Token",
  //     symbol: TokenSymbol.BIUU,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'biuu.png',
  //
  //
  //             address: '0x3cFD33fD6f670ebBf63434D4b09DcA6D403aEFea',
  //             decimals: 18,
  //
  //
  // },
  // {
  //     name: "Wizard Token",
  //     symbol: TokenSymbol.WIZARD,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'wizard.png',
  //
  //
  //             address: '0x2503d56065a1369d7270dc2038c16a113699454d',
  //             decimals: 18,
  //
  //
  // },
  // {
  //     name: "Merlin Pad Token",
  //     symbol: TokenSymbol.MERLINPAD,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'merlinpad.png',
  //
  //
  //             address: '0x5782d6FdDFE62cb1650FE42582Ef8E37EAEA03E2',
  //             decimals: 18,
  //
  //
  // },
  // {
  //     name: "Merlin Meme Token (Meme)",
  //     symbol: TokenSymbol.MERLINMEME,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'merlinmeme.png',
  //
  //
  //             address: '0x402b2e84CB09b08e18Bd47636594Afb789401ddc',
  //             decimals: 18,
  //
  //
  // },
  {
    name: "The Grand VOYA Sailor",
    symbol: TokenSymbol.SAILOR,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "sailor.png",

    address: "0xe380a2d2477799fff336a2937ea00a29a84a22c9",
    decimals: 18,
  },
  // {
  //     name: "SPELL Token",
  //     symbol: TokenSymbol.SPELL,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'spell.png',
  //
  //
  //             address: '0xcd88e36a9ce94e4c36f08b0b8086a80639e11e7a',
  //             decimals: 18,
  //
  //
  // },
  {
    name: "Merlin Ball Token",
    symbol: TokenSymbol.BALL,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "ball.png",

    address: "0xF18781109992b12580A646ed0392a6Fc50318209",
    decimals: 18,
  },
  // {
  //     name: "Merlin Box Token",
  //     symbol: TokenSymbol.MERLINBOX,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'merlinbox.png',
  //
  //
  //             address: '0x63c2e663a6cfb0f5568c84a1c8134acbe1b88bec',
  //             decimals: 18,
  //
  //
  // },
  // {
  //     name: "Merlin Land Token",
  //     symbol: TokenSymbol.MERLINLAND,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'merlinland.png',
  //
  //
  //             address: '0xf0db39a5e37eb2df2d2b968f3fc8e5d7a9969dea',
  //             decimals: 18,
  //
  //
  // },
  {
    name: "Owl Token",
    symbol: TokenSymbol.OWL,
    chainId: ChainId.Merlin,
    logoURI: baseURL + "owl.png",

    address: "0x62e99191071fc1c5947cf1e21aa95708dcc51adb",
    decimals: 18,
  },
  // {
  //     name: "恭喜发财好运来",
  //     symbol: TokenSymbol.GXFC,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'gxfc.png',
  //
  //
  //             address: '0x01B1DD8DAB8e8f61891c8367f9e622F4b6313cf8',
  //             decimals: 9,
  //
  //
  // },
  // {
  //     name: "Drak Token",
  //     symbol: TokenSymbol.DRAK,
  //     chainId: ChainId.Merlin,
  //     logoURI: baseURL + 'drak.png',
  //
  //
  //             address: '0xc69a8ef7da38fb6bf035c38ea4a0a5e0a529378d',
  //             decimals: 18,
  //
  //
  // },
];
