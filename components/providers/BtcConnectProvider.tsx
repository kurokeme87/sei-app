"use client";

import {
  ConnectProvider,
  OKXConnector,
  UnisatConnector,
  BitgetConnector,
  TokenPocketConnector,
  BybitConnector,
  WizzConnector,
  XverseConnector,
} from "@particle-network/btc-connectkit";

import {
  MerlinTestnet,
  Merlin,
  BEVMTestnet,
  BEVM,
  MAPProtocolTestnet,
  MAPProtocol,
  SatoshiVMTestnet,
  BSquaredTestnet,
  Mantle,
  BitlayerTestnet,
  BotanixTestnet,
  PolygonzkEVMCardona,
} from "@particle-network/chains";

export default function BtcConnectProvider({ children }) {
  return (
    <ConnectProvider
      options={{
        projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID,
        clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY,
        appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID,
        aaOptions: {
          accountContracts: {
            BTC: [
              {
                chainIds: [
                  MerlinTestnet.id,
                  Merlin.id,
                  BEVMTestnet.id,
                  BEVM.id,
                  MAPProtocolTestnet.id,
                  MAPProtocol.id,
                  SatoshiVMTestnet.id,
                ],
                version: "1.0.0",
              },
              {
                chainIds: [
                  BitlayerTestnet.id,
                  BotanixTestnet.id,
                  PolygonzkEVMCardona.id,
                  BSquaredTestnet.id,
                  Mantle.id,
                ],
                version: "2.0.0",
              },
            ],
          },
        },
        walletOptions: {
          visible: true,
        },
      }}
      connectors={[
        new UnisatConnector(),
        new OKXConnector(),
        new BitgetConnector(),
        new TokenPocketConnector(),
        new BybitConnector(),
        new WizzConnector(),
        new XverseConnector(),
      ]}
    >
      {children}
    </ConnectProvider>
  );
}
