// export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// import { projectId } from "@/app/web3Config";

const projectId = process.env.INFURA_API_KEY;

export const rpcUrls: Record<number, string> = {
  1: `https://mainnet.infura.io/v3/${projectId}`,
  3: `https://ropsten.infura.io/v3/${projectId}`,
  4: `https://rinkeby.infura.io/v3/${projectId}`,
  5: `https://goerli.infura.io/v3/${projectId}`,
  42: `https://kovan.infura.io/v3/${projectId}`,
  137: `https://polygon-rpc.com`,
  80001: `https://rpc-mumbai.maticvigil.com`,
  56: `https://bsc-dataseed.binance.org/`, // Binance Smart Chain Mainnet
  97: `https://data-seed-prebsc-1-s1.binance.org:8545/`, // Binance Smart Chain Testnet
  43114: `https://api.avax.network/ext/bc/C/rpc`, // Avalanche C-Chain Mainnet
  43113: `https://api.avax-test.network/ext/bc/C/rpc`, // Avalanche Fuji Testnet
  250: `https://rpc.ftm.tools/`, // Fantom Opera Mainnet
  4002: `https://rpc.testnet.fantom.network/`, // Fantom Testnet
  42161: `https://arb1.arbitrum.io/rpc`, // Arbitrum One Mainnet
  421611: `https://rinkeby.arbitrum.io/rpc`, // Arbitrum Rinkeby Testnet
  10: `https://mainnet.optimism.io`, // Optimism Mainnet
  69: `https://kovan.optimism.io`, // Optimism Kovan Testnet
  1101: `https://rpc.ankr.com/polygon_zkevm`, // Polygon zkEVM Mainnet
  1442: `https://rpc.public.zkevm-test.net`, // Polygon zkEVM Testnet
  42220: `https://forno.celo.org`, // Celo Mainnet
  44787: `https://alfajores-forno.celo-testnet.org`, // Celo Alfajores Testnet
  11297108109: `https://rpc.ankr.com/palm`, // Palm Mainnet
  11297108099: `https://palm-testnet.infura.io/v3/${projectId}`, // Palm Testnet
  9001: `https://rpc.ankr.com/evmos`, // Evmos Mainnet
  9000: `https://evmos-testnet.rpc.network/`, // Evmos Testnet
  59144: `https://rpc.linea.build/`, //  Linea
  8458: `https://rpc.walletconnect.com/v1/?chainId=eip155:8453&projectId=${projectId}`, //  Base
};
