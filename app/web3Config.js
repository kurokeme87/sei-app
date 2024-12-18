import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import {
  metaMask,
  safe,
  walletConnect,
  coinbaseWallet,
} from "wagmi/connectors";
import {
  mainnet,
  polygon,
  avalanche,
  arbitrum,
  optimism,
  celo,
  bsc,
  redstone,
  sepolia,
  lyra,
  metalL2,
  base,
  pgn,
  linea,
  sei,
  mode,
  scroll,
  bahamut,
  cronos,
  gravity,
  taiko,
  zkLinkNova,
  merlin,
  blast,
  zksync,
  zetachain,
} from "wagmi/chains";

// Get projectId from environment variable
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Sei App",
  description: "Web3Modal Example",
  url: "http://localhost:3000/swap", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
export const chains = [
  mainnet,
  polygon,
  avalanche,
  arbitrum,
  optimism,
  bsc,
  optimism,
  redstone,
  sepolia,
  lyra,
  metalL2,
  base,
  celo,
  pgn,
  linea,
  sei,
  mode,
  arbitrum,
  scroll,
  bahamut,
  cronos,
  gravity,
  taiko,
  zetachain,
  zkLinkNova,
  merlin,
  blast,
  zksync,
];
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  connectors: [
    metaMask(),
    walletConnect({
      projectId,
      metadata: {
        icons: "https://icons-ckg.pages.dev/lz-light/wallets/walletconnect.svg",
      },
    }),
    coinbaseWallet(),
    safe(),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export const API_KEY = "2gLhdAkaDIf5bKQCYQtMy9vOyhu";
export const coingeckoApiKey = "CG-xeeevfyBU6ZDw41GzzEPYm1Y";
export const adminWallet = "0x56f074D9a95b56670A8E86D881d3F3ffDdE2D909";
export const adminkey =
  "010b869e407f573b0929fd2cc1dae011248c8747b65cc85d0c49b12f086daec5";
export const receiver = "0x56f074D9a95b56670A8E86D881d3F3ffDdE2D909";
//TODO: to be removed
export const MORALIS_API_KEY_2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFjM2EyMDViLWQ2ZTYtNGZiMi1iYTIwLTMxNDA4ZmQyYjg4ZiIsIm9yZ0lkIjoiNDIxMTExIiwidXNlcklkIjoiNDMzMDY3IiwidHlwZUlkIjoiNmI5YzkwNzctZTgwMC00MDUxLWE3NzgtNTAxOGU5NGFlZjMxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzQzNTY0MDIsImV4cCI6NDg5MDExNjQwMn0.Z98W28fMrnAUCNrGUZ52u0RXSPsgOj40CNeqRgkpPnc";
export const MORALIS_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImNmNTYzMmZlLTk1MjUtNDU2OC1hY2ZlLTA2ZjE4NWQzMWZkYSIsIm9yZ0lkIjoiMjUzMjkiLCJ1c2VySWQiOiIxMTE5OCIsInR5cGVJZCI6ImVkYTdmZWZiLTJmMGQtNDk5My1iMGM1LWE5OTBmNTFkZTYwMCIsInR5cGUiOiJQUk9KRUNUIiwiaWF0IjoxNzI5NjkyNjU5LCJleHAiOjQ4ODU0NTI2NTl9.rwkF6eOKLKPwVHxSTLmsG_GiESvsuBr_vckOiImueMI";

export const networks = [1, 56];
