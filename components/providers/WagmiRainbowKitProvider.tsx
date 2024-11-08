"use client";

import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { config, projectId } from "../../app/web3Config";
import "@rainbow-me/rainbowkit/styles.css";

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeMode: "dark",
});

const queryClient = new QueryClient();

function WagmiRainbowKitProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme()}
          appInfo={{
            disclaimer: ({ Text, Link }) => (
              <Text>
                By connecting your wallet, you agree to the
                <Link href="https://termsofservice.xyz">
                  Terms of Service
                </Link>{" "}
                and acknowledge you have read and understand the protocol
                <Link href="https://disclaimer.xyz">Disclaimer</Link>
              </Text>
            ),
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default WagmiRainbowKitProvider;
